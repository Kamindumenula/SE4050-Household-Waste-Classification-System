@echo off
echo ========================================================
echo Starting EcoSort AI Backend with Native TensorFlow...
echo ========================================================

:: 1. Check if virtual environment venv exists in root
if exist "venv\Scripts\python.exe" (
    echo Using project virtual environment (venv)...
    "venv\Scripts\python.exe" -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
    goto end
)

:: 2. Check if py launcher has Python 3.11 installed
py -3.11 --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python 3.11 via py launcher...
    py -3.11 -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
    goto end
)

:: 3. Check if standard python command works
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using default system python...
    python -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
    goto end
)

:: 4. Fallback to specific user installation if present
if exist "C:\Users\V I C T U S\AppData\Local\Programs\Python\Python311\python.exe" (
    "C:\Users\V I C T U S\AppData\Local\Programs\Python\Python311\python.exe" -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
    goto end
)

echo [ERROR] No suitable Python installation found.
echo Please install Python 3.10 or 3.11 and ensure it is added to your PATH.
pause

:end
