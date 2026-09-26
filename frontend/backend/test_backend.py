import io
import base64
from PIL import Image
from app import health_check, get_models_status, predict_single, predict_compare_all, PredictRequest, MODEL_CONFIGS

def create_sample_base64_image():
    img = Image.new("RGB", (224, 224), color=(60, 180, 75))
    buf = io.BytesIO()
    img.save(buf, format="JPEG")
    b64_str = base64.b64encode(buf.getvalue()).decode("utf-8")
    return f"data:image/jpeg;base64,{b64_str}"

def test_health():
    data = health_check()
    assert data["status"] == "healthy"
    assert len(data["classes"]) == 6
    print("[PASS] test_health passed:", data)

def test_models():
    data = get_models_status()
    assert "baseline_cnn" in data
    assert "mobilenet_v2" in data
    print("[PASS] test_models passed:")
    for k, v in data.items():
        print(f"   * {v['name']}: {v['status']}")

def test_predict_single():
    req = PredictRequest(
        image_data=create_sample_base64_image(),
        model_id="baseline_cnn"
    )
    data = predict_single(req)
    assert "classId" in data
    assert "confidence" in data
    assert "guideline" in data
    print("[PASS] test_predict_single passed:", data["model_name"], "->", data["classId"], f"({data['confidence']*100:.1f}%)")

def test_predict_compare_all():
    req = PredictRequest(
        image_data=create_sample_base64_image(),
        model_id="all"
    )
    data = predict_compare_all(req)
    assert "comparison" in data
    assert len(data["comparison"]) == 4
    print("[PASS] test_predict_compare_all passed (4 models compared):")
    for m_id, comp in data["comparison"].items():
        print(f"   * {comp['name']}: {comp['classId']} ({comp['confidence']*100:.1f}%) | {comp['bin']}")

if __name__ == "__main__":
    print("--- Running Direct Backend API Verification Tests ---")
    test_health()
    test_models()
    test_predict_single()
    test_predict_compare_all()
    print("\n[SUCCESS] ALL BACKEND TESTS PASSED SUCCESSFULLY!")
