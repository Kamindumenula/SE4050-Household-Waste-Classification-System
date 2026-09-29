# EcoSort AI - Household Waste Classification System

An intelligent household waste classification system built with Deep Learning and Computer Vision to classify waste into 6 categories: **cardboard, glass, metal, paper, plastic, and trash**.

---

## 1. Dataset Access & Instructions

- **Dataset Name**: Garbage Classification (TrashNet)
- **Classes (6)**: `cardboard`, `glass`, `metal`, `paper`, `plastic`, `trash` (Total 2,527 images)
- **External Dataset Source**: [Kaggle Garbage Classification Dataset](https://www.kaggle.com/datasets/asdasdasasdas/garbage-classification)
- **Local Archive**: The dataset archive is included directly in this repository at `dataset/archive.zip`.

### Extracting the Dataset:
- **Windows (PowerShell)**:
  ```powershell
  Expand-Archive -Path dataset/archive.zip -DestinationPath dataset/
  ```
- **Linux / macOS / Google Colab**:
  ```bash
  unzip -q dataset/archive.zip -d dataset/
  ```

---

## 2. Dependencies & Prerequisites

- **Python**: 3.10 or 3.11
- **Node.js**: v18+ (for frontend)
- **Git LFS**: Required for downloading large model weight files (`.keras`)

### Python Dependencies:
Install all required libraries listed in `requirements.txt`:
```bash
pip install -r requirements.txt
```

Key packages:
- `tensorflow >= 2.15.0`
- `fastapi >= 0.110.0`
- `uvicorn >= 0.28.0`
- `pillow >= 10.2.0`
- `numpy >= 1.26.0`

---

## 3. Saved Configurations & Random Seeds

To guarantee exact reproducibility across all training notebooks, evaluations, and inference runs:

- **Random Seed**: `SEED = 42` (applied to TensorFlow, NumPy, and dataset splits)
- **Input Dimensions**: `224 × 224 × 3` (RGB)
- **Dataset Split**: 80% Training (2,022 images), 20% Validation/Test (505 images), stratified with `seed=42`
- **Batch Size**: 32
- **Output Classes**: 6 (`cardboard`, `glass`, `metal`, `paper`, `plastic`, `trash`)

---

## 4. Setup & Execution Instructions

### Step 1: Clone Repository & Pull Large Model Files (Git LFS)
```bash
git clone https://github.com/Kamindumenula/SE4050-Household-Waste-Classification-System.git
cd SE4050-Household-Waste-Classification-System
git lfs install
git lfs pull
```

### Step 2: Start Backend API
```cmd
start_backend.bat
```
*Or manually via command line:*
```bash
cd backend
python -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload
```
The FastAPI server will run at `http://127.0.0.1:8000` (API docs at `http://127.0.0.1:8000/docs`).

### Step 3: Start Frontend Application
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Step 4: Running Training & Comparison Notebooks
- **In Google Colab**:
  ```python
  !git clone https://github.com/Kamindumenula/SE4050-Household-Waste-Classification-System.git
  !apt-get install -y git-lfs > /dev/null
  %cd SE4050-Household-Waste-Classification-System
  !git lfs pull
  !unzip -q dataset/archive.zip -d /content/
  ```
  Open and run any notebook:
  - `cnn/IT23237490_cnn.ipynb` (Custom CNN)
  - `mobilenetV2/IT23210660_mobilenetV2.ipynb` (MobileNetV2)
  - `resnet50/IT23293908resnet50.ipynb` (ResNet50)
  - `efficientnetB0/efficientnetB0.ipynb` (EfficientNetB0)
  - `comparisons/comparison.ipynb` (Cross-Model Evaluation)
