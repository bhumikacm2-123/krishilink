@echo off
title KrishiLink Full-Stack Launcher
echo ========================================================
echo Launching KrishiLink Full-Stack Platform...
echo ========================================================
start "KrishiLink Backend" cmd /c "%~dp0start_backend.bat"
timeout /t 3 /nobreak >nul
start "KrishiLink Frontend" cmd /c "%~dp0start_frontend.bat"
echo Both services launched! Opening browser at http://localhost:3000 in 5 seconds...
timeout /t 5 /nobreak >nul
start http://localhost:3000
