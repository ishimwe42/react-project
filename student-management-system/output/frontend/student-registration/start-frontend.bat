@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js is not installed. Install the LTS version from https://nodejs.org/ & pause & exit /b 1)
where npm >nul 2>nul || (echo npm is not available. Reinstall Node.js. & pause & exit /b 1)
if not exist node_modules (
  echo Installing project dependencies...
  call npm install
  if errorlevel 1 (echo Dependency installation failed. Check your internet connection and try npm install manually. & pause & exit /b 1)
)
if not exist .env copy .env.example .env
call npm run dev -- --host 0.0.0.0
pause
