@echo off
echo ========================================================
echo Starting EcoSort AI Backend with Native TensorFlow
echo ========================================================

REM 1. Check if a virtual environment exists
if exist "venv\Scripts\python.exe" (
    echo Using project virtual environment (venv)...
    "venv\Scripts\python.exe" -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
    goto end
)

REM 2. Check if py launcher has Python 3.11
py -3.11 --version >nul 2>&1
if not errorlevel 1 (
    echo Using Python 3.11 via py launcher...
    py -3.11 -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
    goto end
)

REM 3. Check if standard Windows LocalAppData Python 3.11 exists (generic for any user)
if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" (
    echo Using Python 3.11 from local app data...
    "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
    goto end
)

REM 4. Check if default python command has uvicorn
python -c "import uvicorn" >nul 2>&1
if not errorlevel 1 (
    echo Using system python...
    python -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
    goto end
)

echo [ERROR] No suitable Python installation with uvicorn was found.
echo Please run: pip install -r requirements.txt
pause

:end
