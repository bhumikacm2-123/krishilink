@echo off
title KrishiLink Backend API Server
echo ========================================================
echo Starting KrishiLink Flask Backend Server (Port 5000)...
echo ========================================================
cd /d "%~dp0backend"
python app.py
pause
