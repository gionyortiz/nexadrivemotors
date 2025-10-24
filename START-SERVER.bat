@echo off
echo Starting NexaDriveMotors Server...
echo.
cd /d "%~dp0server"
node server.js
pause
