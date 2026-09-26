# 🖥️ Frontend & Live Camera Implementation Plan

This document outlines the complete architectural design and step-by-step implementation guide for the **EcoSort AI** web application.

---

## 🌟 1. Core Objectives
1. **Live Camera Waste Scanner**:
   - Access smartphone or laptop camera using HTML5 WebRTC (`navigator.mediaDevices.getUserMedia`).
   - Provide a real-time scanning viewfinder with laser reticle animation, camera flipping (Front / Rear), snapshot shutter trigger, and optional continuous auto-scan mode (scans every 3 seconds).
2. **Alternative Image Dropzone**:
   - Allow drag-and-drop file uploads (JPG, PNG, WEBP).
   - Provide instant preset sample buttons (`Cardboard`, `Glass`, `Metal`, `Paper`, `Plastic`, `Trash`) for immediate testing without a webcam.
3. **Model Selection & Multi-Model Benchmark**:
   - Selector to switch between all 4 team models:
     - 🌟 **Custom CNN** (Member 1 - Leader)
     - ⚡ **MobileNetV2** (Member 2)
     - 🧠 **ResNet50** (Member 3)
     - 🚀 **EfficientNetB0** (Member 4)
   - **Side-by-Side Comparison Mode**: Send one captured image and display inference results, confidence scores, and latency across all 4 models simultaneously.
4. **Smart Eco-Disposal Guidance**:
   - Classify into 6 waste types: `cardboard`, `glass`, `metal`, `paper`, `plastic`, `trash`.
   - Display color-coded bin guidelines:
     - 🟦 **Blue Bin**: Clean paper, cardboard boxes (flattened, tape removed).
     - 🟩 **Green Bin**: Glass bottles, jars (rinsed, caps removed).
     - 🟨 **Yellow Bin**: Beverage cans, clean aluminum foil, food tins.
     - 🟧 **Orange Bin**: Recyclable plastic containers (#1 PET, #2 HDPE).
     - ⬛ **Gray/Black Bin**: Contaminated items, chip bags, non-recyclable trash.
   - Actionable recycling checklist and estimated decomposition times.

---

## 🏗️ 2. Frontend File Structure

```text
frontend/
├── index.html                      # Entry HTML with Inter & Outfit fonts
├── package.json                    # Vite + React + lucide-react
├── vite.config.js                  # Vite bundler config
├── public/                         # Favicons & static icons
├── src/
│   ├── main.jsx                    # React root mounter
│   ├── App.jsx                     # Main layout & state orchestration
│   ├── index.css                   # Dark-mode eco aesthetic (emerald, cyan, glassmorphism)
│   ├── wasteData.js                # Classes metadata, bin colors, and model specs
│   └── components/
│       ├── CameraScanner.jsx       # WebRTC video feed, reticle & shutter
│       ├── ImageUploader.jsx       # Drag-and-drop dropzone & sample presets
│       ├── ModelSelector.jsx       # Switch between 4 models + compare mode toggle
│       ├── ClassificationResult.jsx# Result card with bin recommendation & tips
│       └── MultiModelCompare.jsx   # 4-way side-by-side benchmark matrix
└── backend/
    ├── app.py                      # FastAPI server (/predict, /models)
    └── requirements.txt            # fastapi, uvicorn, pillow, numpy, tensorflow
```

---

## 🔌 3. Backend Inference Bridge (`backend/app.py`)

A lightweight FastAPI server running on `http://localhost:8000`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
from PIL import Image
import numpy as np
import base64, io, os

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

CLASSES = ["cardboard", "glass", "metal", "paper", "plastic", "trash"]

class PredictRequest(BaseModel):
    image_data: str # Base64 Data URL
    model_id: str = "efficientnet_b0"
    compare_all: bool = False

@app.post("/predict")
def predict(req: PredictRequest):
    # 1. Decode base64 to 224x224 RGB
    raw = req.image_data.split(",")[1] if "," in req.image_data else req.image_data
    img = Image.open(io.BytesIO(base64.b64decode(raw))).convert("RGB").resize((224, 224))
    arr = np.expand_dims(np.array(img, dtype=np.float32), axis=0)

    # 2. Load trained model from models/ or fall back if not yet saved
    model_path = f"../../models/{req.model_id}.keras"
    if os.path.exists(model_path):
        model = tf.keras.models.load_model(model_path)
        preds = model.predict(arr, verbose=0)[0]
        idx = int(np.argmax(preds))
        return {"classId": CLASSES[idx], "confidence": float(round(preds[idx], 4)), "latency": "Real Model"}
    
    # Simulation fallback until team finishes training
    return {"classId": np.random.choice(CLASSES), "confidence": 0.94, "latency": "Simulated"}
```

---

## 🚀 4. How to Launch (When Ready)

1. **Start Backend**:
   ```bash
   cd frontend/backend
   pip install -r requirements.txt
   python app.py
   ```
2. **Start Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
