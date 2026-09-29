import io
import os
import time
import base64
import numpy as np
from PIL import Image
from typing import Optional, Dict, List

# Suppress verbose TensorFlow C++ logging
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

import tensorflow as tf
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="EcoSort AI - Household Waste Classification API (All 4 Models Native)")

# Enable CORS for React/Vite development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLASSES = ["cardboard", "glass", "metal", "paper", "plastic", "trash"]

CLASS_GUIDELINES = {
    "cardboard": {"bin": "Blue Bin", "color": "#2563EB", "recyclable": True, "action": "Flatten box, remove adhesive tape, keep dry."},
    "glass": {"bin": "Green Bin", "color": "#059669", "recyclable": True, "action": "Rinse thoroughly, remove bottle cap, place in glass bin."},
    "metal": {"bin": "Yellow Bin", "color": "#D97706", "recyclable": True, "action": "Rinse food residues, crush cans to save volume."},
    "paper": {"bin": "Blue Bin", "color": "#3B82F6", "recyclable": True, "action": "Keep clean and dry; discard food-soiled paper in general trash."},
    "plastic": {"bin": "Orange Bin", "color": "#EA580C", "recyclable": True, "action": "Empty and rinse, check resin code (#1 PET, #2 HDPE)."},
    "trash": {"bin": "Gray Bin", "color": "#6B7280", "recyclable": False, "action": "Non-recyclable residual waste. Dispose in landfill bin."}
}

MODEL_CONFIGS = {
    "baseline_cnn": {
        "name": "Custom CNN",
        "author": "Baseline Architecture",
        "files": ["../../models/baseline_cnn.keras"],
        "tag": "Custom Baseline"
    },
    "mobilenet_v2": {
        "name": "MobileNetV2",
        "author": "Transfer Learning",
        "files": ["../../models/mobilenetv2_final.keras", "../../models/mobilenetv2.keras"],
        "tag": "Transfer Learning"
    },
    "resnet50": {
        "name": "ResNet50",
        "author": "Deep Residuals",
        "files": ["../../models/IT23293908ResNet50.keras", "../../models/resnet50.keras", "../../models/resnet50_final.keras"],
        "tag": "Deep Residuals"
    },
    "efficientnet_b0": {
        "name": "EfficientNetB0",
        "author": "Compound Scaling",
        "files": ["../../models/efficientnetb0_final.keras", "../../models/efficientnet_b0.keras"],
        "tag": "High Efficiency"
    }
}

# Cache for loaded TensorFlow Keras models
loaded_models: Dict[str, tf.keras.Model] = {}

def get_model_abs_path(rel_path: str) -> str:
    return os.path.abspath(os.path.join(os.path.dirname(__file__), rel_path))

def check_model_on_disk(rel_path: str) -> bool:
    return os.path.exists(get_model_abs_path(rel_path))

def get_active_model_file(model_id: str) -> Optional[str]:
    cfg = MODEL_CONFIGS.get(model_id)
    if not cfg:
        return None
    for f in cfg.get("files", []):
        if check_model_on_disk(f):
            return f
    return None

def is_model_trained(model_id: str) -> bool:
    return get_active_model_file(model_id) is not None

def get_or_load_tf_model(model_id: str) -> Optional[tf.keras.Model]:
    """Loads and caches TensorFlow model from disk."""
    if model_id in loaded_models:
        return loaded_models[model_id]
    
    file_rel = get_active_model_file(model_id)
    if not file_rel:
        return None
        
    abs_path = get_model_abs_path(file_rel)
    try:
        print(f"[INFO] Loading TensorFlow model: {model_id} from {abs_path}...")
        model = tf.keras.models.load_model(abs_path)
        loaded_models[model_id] = model
        print(f"[SUCCESS] TensorFlow model '{model_id}' loaded successfully.")
        return model
    except Exception as e:
        print(f"[ERROR] Failed to load TensorFlow model '{model_id}': {e}")
        return None

def preprocess_image_for_model(img_arr: np.ndarray, model_id: str) -> np.ndarray:
    """
    Preprocesses a 224x224 RGB image array for the specific model architecture.
    All 4 models (Custom CNN, MobileNetV2, ResNet50, EfficientNetB0) were trained
    with raw image_dataset_from_directory [0.0, 255.0] float32 inputs.
    """
    batch = np.expand_dims(img_arr.astype(np.float32), axis=0)
    return batch

def decode_image(data_url_or_base64: str) -> Image.Image:
    if "," in data_url_or_base64:
        data_url_or_base64 = data_url_or_base64.split(",")[1]
    image_bytes = base64.b64decode(data_url_or_base64)
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return img

class PredictRequest(BaseModel):
    image_data: str
    model_id: Optional[str] = "baseline_cnn"

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "engine": "TensorFlow Native",
        "tensorflow_version": tf.__version__,
        "classes": CLASSES
    }

@app.get("/models")
def get_models_status():
    status = {}
    for m_id, cfg in MODEL_CONFIGS.items():
        trained = is_model_trained(m_id)
        file_path = get_active_model_file(m_id)
        status[m_id] = {
            "name": cfg["name"],
            "author": cfg["author"],
            "tag": cfg["tag"],
            "trained": trained,
            "status": "Ready (TensorFlow model detected)" if trained else "Pending training",
            "file": file_path
        }
    return status

@app.post("/predict")
def predict_single(req: PredictRequest):
    start_time = time.time()
    try:
        img = decode_image(req.image_data).resize((224, 224), Image.Resampling.BILINEAR)
        img_arr = np.array(img, dtype=np.float32)

        m_id = req.model_id if req.model_id in MODEL_CONFIGS else "baseline_cnn"
        model = get_or_load_tf_model(m_id)

        if model is not None:
            processed_input = preprocess_image_for_model(img_arr, m_id)
            preds = model.predict(processed_input, verbose=0)[0]
            pred_idx = int(np.argmax(preds))
            confidence = float(round(float(preds[pred_idx]), 4))
            latency_ms = round((time.time() - start_time) * 1000, 1)
        else:
            # Fallback if model not loaded
            mean_rgb = np.mean(img_arr, axis=(0, 1))
            pred_idx = int(sum(mean_rgb) * 100) % len(CLASSES)
            confidence = 0.85
            latency_ms = 25.0

        chosen_class = CLASSES[pred_idx]

        return {
            "model_id": m_id,
            "model_name": MODEL_CONFIGS[m_id]["name"],
            "is_trained": model is not None,
            "classId": chosen_class,
            "confidence": confidence,
            "latency": f"{latency_ms}ms",
            "guideline": CLASS_GUIDELINES[chosen_class]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/predict/all")
def predict_compare_all(req: PredictRequest):
    start_time = time.time()
    try:
        img = decode_image(req.image_data).resize((224, 224), Image.Resampling.BILINEAR)
        img_arr = np.array(img, dtype=np.float32)
        
        comparison = {}
        for m_id, cfg in MODEL_CONFIGS.items():
            model = get_or_load_tf_model(m_id)

            if model is not None:
                m_start = time.time()
                processed_input = preprocess_image_for_model(img_arr, m_id)
                preds = model.predict(processed_input, verbose=0)[0]
                pred_idx = int(np.argmax(preds))
                conf = float(round(float(preds[pred_idx]), 4))
                m_lat = f"{round((time.time() - m_start) * 1000, 1)}ms"
                status_str = "Trained (TensorFlow)"
                c_name = CLASSES[pred_idx]
            else:
                mean_rgb = np.mean(img_arr, axis=(0, 1))
                pred_idx = int(sum(mean_rgb) * 100) % len(CLASSES)
                conf = 0.85
                m_lat = "25.0ms"
                status_str = "Pending weights"
                c_name = CLASSES[pred_idx]

            comparison[m_id] = {
                "name": cfg["name"],
                "author": cfg["author"],
                "classId": c_name,
                "confidence": conf,
                "is_trained": model is not None,
                "status": status_str,
                "bin": CLASS_GUIDELINES[c_name]["bin"],
                "binColor": CLASS_GUIDELINES[c_name]["color"],
                "recyclable": CLASS_GUIDELINES[c_name]["recyclable"],
                "latency": m_lat
            }

        total_latency = round((time.time() - start_time) * 1000, 1)
        return {
            "comparison": comparison,
            "total_latency": f"{total_latency}ms"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
