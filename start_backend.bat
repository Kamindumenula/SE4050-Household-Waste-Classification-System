@echo off
echo ========================================================
echo Starting EcoSort AI Backend
echo ========================================================

if exist "venv\Scripts\python.exe" goto use_venv
if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" goto use_local_py311
if exist "C:\Users\V I C T U S\AppData\Local\Programs\Python\Python311\python.exe" goto use_victus

py -3.11 --version >nul 2>&1
if %ERRORLEVEL% equ 0 goto use_py_launcher

python -c "import uvicorn" >nul 2>&1
if %ERRORLEVEL% equ 0 goto use_python

echo [ERROR] No Python with uvicorn was found.
echo Please run: pip install -r requirements.txt
pause
goto :eof

:use_local_py311
echo Starting backend with Python 3.11
"%LOCALAPPDATA%\Programs\Python\Python311\python.exe" -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
goto :eof

:use_victus
echo Starting backend with Python 3.11
"C:\Users\V I C T U S\AppData\Local\Programs\Python\Python311\python.exe" -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
goto :eof

:use_venv
echo Starting backend with virtual environment
"venv\Scripts\python.exe" -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
goto :eof

:use_py_launcher
echo Starting backend with py launcher
py -3.11 -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
goto :eof

:use_python
echo Starting backend with system python
python -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
goto :eof
