# NexaDriveMotors Server Startup Script
# This keeps the server running in a new window

Write-Host "🚀 Starting NexaDriveMotors Server..." -ForegroundColor Green
Write-Host ""

# Navigate to server directory
Set-Location -Path "$PSScriptRoot\server"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Start the server
Write-Host "✅ Server starting at http://localhost:3000" -ForegroundColor Green
Write-Host "📊 Admin password: admin123" -ForegroundColor Cyan
Write-Host "🌐 Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
Write-Host "-------------------------------------------" -ForegroundColor Gray
Write-Host ""

node server.js

# Keep window open if server stops
Write-Host ""
Write-Host "❌ Server stopped" -ForegroundColor Red
pause
