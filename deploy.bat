@echo off
REM SecureFood - Windows Deployment Script
REM Run this from your Downloads\SecureFood folder

echo ============================================
echo SecureFood Dashboard - Deploy to GitHub
echo ============================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ERROR: package.json not found
    echo Please run this script from your SecureFood folder
    echo.
    pause
    exit /b 1
)

if not exist "src" (
    echo ERROR: src folder not found
    echo Please run this script from your SecureFood folder
    echo.
    pause
    exit /b 1
)

echo Found SecureFood project files
echo.

REM Check for required config files
set missing=0

if not exist ".gitignore" (
    echo Missing: .gitignore
    set missing=1
)
if not exist "tsconfig.json" (
    echo Missing: tsconfig.json
    set missing=1
)
if not exist "tsconfig.node.json" (
    echo Missing: tsconfig.node.json
    set missing=1
)
if not exist "tailwind.config.js" (
    echo Missing: tailwind.config.js
    set missing=1
)
if not exist "postcss.config.js" (
    echo Missing: postcss.config.js
    set missing=1
)
if not exist "vercel.json" (
    echo Missing: vercel.json
    set missing=1
)

if %missing%==1 (
    echo.
    echo ERROR: Missing configuration files!
    echo Please copy all files from config-files folder first.
    echo.
    pause
    exit /b 1
)

echo All configuration files present
echo.

REM Initialize git if needed
if not exist ".git" (
    echo Initializing git repository...
    git init
    echo.
)

REM Add all files
echo Adding files to git...
git add .
echo.

REM Create commit
echo Creating commit...
git commit -m "Deploy: SecureFood Dashboard - React + Vite + TypeScript"
echo.

REM Set up remote
echo Connecting to GitHub repository...
git remote remove origin 2>nul
git remote add origin https://github.com/Diggers33/SecureFood.git
git branch -M main
echo.

REM Push
echo.
echo WARNING: This will REPLACE all content in Diggers33/SecureFood
echo.
set /p confirm="Continue? (yes/no): "

if /i "%confirm%"=="yes" (
    echo.
    echo Pushing to GitHub...
    git push -u origin main --force
    echo.
    echo ============================================
    echo Successfully pushed to GitHub!
    echo ============================================
    echo.
    echo Repository: https://github.com/Diggers33/SecureFood
    echo.
    echo Next Step: Deploy to Vercel
    echo   1. Visit https://vercel.com
    echo   2. Click 'Add New Project'
    echo   3. Import 'Diggers33/SecureFood'
    echo   4. Click 'Deploy'
    echo.
    echo Your site will be live in ~2 minutes!
    echo.
) else (
    echo.
    echo Cancelled.
    echo.
    echo To push manually, run:
    echo   git push -u origin main --force
    echo.
)

pause
