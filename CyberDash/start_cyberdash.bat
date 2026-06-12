@echo off
title CyberDash - Network Monitor System
color 0A
mode con: cols=100 lines=30

echo ==========================================================
echo [SYS] INITIATING CYBERDASH NETWORK PROTOCOLS...
echo ==========================================================
echo.
echo [1/3] Verifying Python Environment...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH!
    pause
    exit /b
)

echo [2/3] Initializing Data Acquisition Backend (FastAPI)...
start "CyberDash API Backend" cmd /k "python backend.py"

echo [3/3] Initializing Matrix Frontend Interface (React)...
timeout /t 3 /nobreak >nul
start "CyberDash Frontend" cmd /c "npm run dev"

echo.
echo ==========================================================
echo [SUCCESS] CYBERDASH IS ONLINE.
echo [LINK] Frontend Interface: http://localhost:5173
echo [LINK] Backend API: http://localhost:8000/api/network/stats
echo ==========================================================
echo.
echo Press any key to shutdown the local orchestrator...
pause >nul
