# EcoSort AI: Household Waste Classification System
### SE4050 – Deep Learning & Neural Networks Project

EcoSort AI is an end-to-end intelligent waste classification system developed using Deep Learning and Computer Vision. The system automatically identifies and classifies household waste into 6 standard recyclable categories from images or live camera optical feeds, providing immediate recycling guidance and disposal instructions.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Dataset Information & Access](#dataset-information--access)
3. [Model Architectures & Deliverables](#model-architectures--deliverables)
4. [Reproducibility & Hyperparameter Configurations](#reproducibility--hyperparameter-configurations)
5. [Repository Structure](#repository-structure)
6. [Prerequisites & Dependencies](#prerequisites--dependencies)
7. [Step-by-Step Setup & Execution](#step-by-step-setup--execution)
   - [Git LFS Setup](#1-clone-repository--git-lfs-pull)
   - [Backend API Setup](#2-backend-fastapi-service)
   - [Frontend Web App Setup](#3-frontend-react--vite-application)
   - [Running Jupyter Notebooks (Local / Google Colab)](#4-running-jupyter-notebooks)
8. [Benchmarking & Comparative Results](#benchmarking--comparative-results)

---

## Project Overview

Municipal and household waste segregation is critical for circular recycling and environmental sustainability. This project explores, implements, and benchmarks four distinct deep learning neural network architectures on household waste images:

1. **Custom Baseline CNN** (Trained from scratch)
2. **MobileNetV2** (Transfer Learning & Fine-Tuning)
3. **ResNet50** (Transfer Learning & Residual Bottlenecks)
4. **EfficientNetB0** (Transfer Learning & Compound Scaling)

The best-performing weights are integrated into a production-ready, full-stack application featuring a FastAPI asynchronous backend and a React + Vite dashboard with live camera scanning and a multi-model benchmark comparison engine.

---

## Dataset Information & Access

The project uses the **Garbage Classification (TrashNet)** dataset, containing photographic images of typical household waste across 6 discrete classes.

### Dataset Overview
- **Total Images**: 2,527 RGB images
- **Number of Classes**: 6
- **Class Labels**:
  - `cardboard` (403 images)
  - `glass` (501 images)
  - `metal` (410 images)
  - `paper` (594 images)
  - `plastic` (482 images)
  - `trash` (137 images)

### Dataset Access & Extraction
For full reproducibility and offline accessibility, the compressed dataset is included directly in this repository under `dataset/archive.zip`:

- **Path in repository**: `dataset/archive.zip`
- **External Dataset Source**: [Kaggle Garbage Classification Dataset](https://www.kaggle.com/datasets/asdasdasasdas/garbage-classification) (TrashNet, Gary Thung & Mindy Yang)

To extract the dataset locally:
```bash
# Windows PowerShell
Expand-Archive -Path dataset/archive.zip -DestinationPath dataset/extracted

# Linux / macOS / Google Colab
unzip -q dataset/archive.zip -d dataset/
```

---

## Model Architectures & Deliverables

| Architecture | Notebook Path | Model Artifact | Student ID / Author |
| :--- | :--- | :--- | :--- |
| **Custom Baseline CNN** | [`cnn/IT23237490_cnn.ipynb`](cnn/IT23237490_cnn.ipynb) | `models/baseline_cnn.keras` | IT23237490 |
| **MobileNetV2** | [`mobilenetV2/IT23210660_mobilenetV2.ipynb`](mobilenetV2/IT23210660_mobilenetV2.ipynb) | `models/mobilenetv2_final.keras` | IT23210660 |
| **ResNet50** | [`resnet50/IT23293908resnet50.ipynb`](resnet50/IT23293908resnet50.ipynb) | `models/IT23293908ResNet50.keras` | IT23293908 |
| **EfficientNetB0** | [`efficientnetB0/efficientnetB0.ipynb`](efficientnetB0/efficientnetB0.ipynb) | `models/efficientnetb0_final.keras` | Member Deliverable |
| **Final Comparison & Benchmark** | [`comparisons/comparison.ipynb`](comparisons/comparison.ipynb) | Metrics Table, ROC curves, CSV export | Member 4 Deliverable |

---

## Reproducibility & Hyperparameter Configurations

To ensure 100% reproducible training and evaluation runs across all notebooks and backend deployments, all experiments adhere to standardized random seeds and preprocessing pipelines:

```python
# Fixed Global Random Seed
SEED = 42
```

### Standardized Hyperparameters:
- **Input Resolution**: `224 × 224 × 3` (RGB)
- **Batch Size**: `32`
- **Dataset Split**:
  - **Training Set**: 80% (2,022 images)
  - **Validation / Test Set**: 20% (505 images), stratified with `seed=42`
- **Optimizer**: Adam (`learning_rate=1e-3` or `1e-4` during fine-tuning)
- **Loss Function**: `categorical_crossentropy` / `sparse_categorical_crossentropy`
- **Output Layer**: 6 units with `softmax` activation
- **Regularization**: Batch Normalization, Dropout (0.2 – 0.5), Data Augmentation (Random Horizontal Flip, Rotation, Zoom)

---

## Repository Structure

```text
SE4050-Household-Waste-Classification-System/
├── cnn/
│   ├── IT23237490_cnn.ipynb              # Custom CNN training & evaluation notebook
│   └── results/                          # Training curves & confusion matrices
├── mobilenetV2/
│   ├── IT23210660_mobilenetV2.ipynb      # MobileNetV2 transfer learning notebook
│   └── results/                          # Metrics & classification reports
├── resnet50/
│   ├── IT23293908resnet50.ipynb          # ResNet50 transfer learning notebook
│   └── results/                          # Evaluation outputs
├── efficientnetB0/
│   ├── efficientnetB0.ipynb              # EfficientNetB0 transfer learning notebook
│   └── results/                          # Metric plots & history logs
├── comparisons/
│   ├── comparison.ipynb                  # Member 4 cross-model benchmarking notebook
│   └── results/                          # Multi-model ROC curves, latency & comparisons
├── dataset/
│   └── archive.zip                       # Complete 6-class dataset archive (42.8 MB)
├── models/
│   ├── baseline_cnn.keras                # Trained Custom CNN weights
│   ├── mobilenetv2_final.keras           # Trained MobileNetV2 weights
│   ├── IT23293908ResNet50.keras          # Trained ResNet50 weights (Git LFS)
│   └── efficientnetb0_final.keras        # Trained EfficientNetB0 weights
├── test_samples/                         # Sample test images for each of the 6 classes
├── frontend/
│   ├── backend/
│   │   ├── app.py                        # FastAPI model serving REST API
│   │   └── test_backend.py               # Automated model inference test suite
│   ├── src/                              # React frontend (Vite)
│   │   ├── components/                   # UI components (Scanner, Uploader, Skeleton, Compare)
│   │   ├── App.jsx                       # Main application dashboard
│   │   └── wasteData.js                  # Waste categories, bin guidelines & model registry
│   ├── package.json                      # Frontend dependencies
│   └── vite.config.js                    # Vite configuration
├── start_backend.bat                     # Universal Windows launcher for backend
├── requirements.txt                      # Python environment dependencies
├── .gitattributes                        # Git LFS tracking configuration
└── README.md                             # Project documentation
```

---

## Prerequisites & Dependencies

### Hardware Requirements
- **RAM**: Minimum 8 GB (16 GB recommended)
- **Disk Space**: ~2 GB free disk space
- **GPU (Optional)**: NVIDIA GPU with CUDA support for accelerated inference (CPU inference is fully supported via standard TensorFlow).

### Software Requirements
- **Python**: `3.10.x` or `3.11.x` (recommended)
- **Node.js**: `v18.x` or higher (for frontend development)
- **Git & Git LFS**: Required to clone and pull heavy `.keras` weights (>90MB)

---

## Step-by-Step Setup & Execution

### 1. Clone Repository & Git LFS Pull

Because the repository uses **Git LFS** for large neural network weight files (such as `IT23293908ResNet50.keras`), ensure Git LFS is installed:

```bash
# Clone the repository
git clone https://github.com/Kamindumenula/SE4050-Household-Waste-Classification-System.git
cd SE4050-Household-Waste-Classification-System

# Fetch and checkout large model files via Git LFS
git lfs install
git lfs pull
```

---

### 2. Backend FastAPI Service

1. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # Linux / macOS:
   source venv/bin/activate
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Launch the API server:
   - **Using Windows Batch Script (Auto-discovery)**:
     ```cmd
     start_backend.bat
     ```
   - **Or manually with Uvicorn**:
     ```bash
     cd frontend/backend
     python -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload
     ```
   The backend API will be available at `http://127.0.0.1:8000` with Swagger docs at `http://127.0.0.1:8000/docs`.

4. Validate Model Inference:
   ```bash
   python frontend/backend/test_backend.py
   ```

---

### 3. Frontend React + Vite Application

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

#### Application Features:
- **Optical Live Scanner**: Real-time webcam viewfinder with automatic waste item capture.
- **Photo Upload**: Drag-and-drop or select photos from file explorer.
- **Model Switching**: Test and observe predictions across all 4 architectures on the fly.
- **Multi-Model Benchmark**: Runs all 4 models simultaneously on a single image and generates a consensus table comparing predictions, confidence, and inference latency.
- **Animated Skeleton Loading**: Smooth glassmorphic shimmer feedback while TensorFlow evaluates models.

---

### 4. Running Jupyter Notebooks

#### In Google Colab:
1. Open [Google Colab](https://colab.research.google.com).
2. Clone the repository and fetch Git LFS files inside Colab:
   ```bash
   !git clone https://github.com/Kamindumenula/SE4050-Household-Waste-Classification-System.git
   !apt-get install -y git-lfs > /dev/null
   %cd SE4050-Household-Waste-Classification-System
   !git lfs pull
   ```
3. Open any notebook from the navigation panel (e.g. `comparisons/comparison.ipynb` or `cnn/IT23237490_cnn.ipynb`) and run all cells sequentially.

#### Locally:
```bash
pip install jupyterlab
jupyter lab
```

---

## Benchmarking & Comparative Results

The models were evaluated under identical conditions on the unseen test split (505 images) with `seed=42`:

| Metric | Custom Baseline CNN | MobileNetV2 | ResNet50 | EfficientNetB0 |
| :--- | :---: | :---: | :---: | :---: |
| **Model Type** | From Scratch | Transfer Learning | Transfer Learning | Transfer Learning |
| **Parameters** | ~1.3M | ~2.3M | ~23.6M | ~4.1M |
| **Test Accuracy** | ~72.3% | **~88.5%** | ~84.2% | ~87.1% |
| **Macro F1-Score** | ~0.71 | **~0.88** | ~0.83 | ~0.86 |
| **Inference Latency (CPU)** | **~18 ms** | ~28 ms | ~78 ms | ~34 ms |
| **Model Size (.keras)** | **5.2 MB** | 21.8 MB | 98.2 MB | 17.1 MB |

### Summary & Takeaways:
- **MobileNetV2** achieved the best overall balance between high classification accuracy (~88.5%) and low latency (~28ms), making it ideal for edge and mobile deployments.
- **Custom CNN** provides the fastest inference (~18ms) and smallest file size (5.2 MB), serving as an effective low-resource baseline.
- **ResNet50** exhibits strong feature extraction capacity, but has higher compute overhead and weight footprint (98.2 MB).
- **EfficientNetB0** delivers near-peak accuracy (~87.1%) with an optimized parameter budget via compound scaling.
