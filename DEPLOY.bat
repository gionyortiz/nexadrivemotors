@echo off
echo ========================================
echo   NexaDriveMotors - Quick Deploy
echo ========================================
echo.
echo Choose your deployment option:
echo.
echo 1. Deploy to Netlify (Easiest - Free)
echo 2. Deploy to Vercel (Full-Stack - Free)
echo 3. Deploy to GitHub Pages (Static - Free)
echo 4. Just open deployment guide
echo 5. Start local server for testing
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto netlify
if "%choice%"=="2" goto vercel
if "%choice%"=="3" goto github
if "%choice%"=="4" goto guide
if "%choice%"=="5" goto local

:netlify
echo.
echo Opening Netlify Drop...
echo Drag and drop your nexamotors folder to deploy!
start https://app.netlify.com/drop
pause
goto end

:vercel
echo.
echo Installing Vercel CLI...
call npm install -g vercel
echo.
echo Deploying to Vercel...
call vercel
pause
goto end

:github
echo.
echo Opening deployment guide for GitHub Pages setup...
start DEPLOYMENT-GUIDE.md
pause
goto end

:guide
echo.
echo Opening deployment guide...
start DEPLOYMENT-GUIDE.md
pause
goto end

:local
echo.
echo Starting local server...
echo Server will run at http://localhost:3000
echo.
cd server
start powershell -NoExit -Command "node server.js"
timeout /t 3
start http://localhost:3000
goto end

:end
echo.
echo Done!
pause
