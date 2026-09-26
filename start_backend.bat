@echo off
echo ========================================================
echo Starting EcoSort AI Backend with Native TensorFlow (Py 3.11)...
echo ========================================================
"C:\Users\V I C T U S\AppData\Local\Programs\Python\Python311\python.exe" -m uvicorn app:app --app-dir frontend/backend --host 127.0.0.1 --port 8000 --reload
pause
