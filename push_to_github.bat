@echo off
echo ========================================================
echo Pushing AI Quiz Arena to GitHub: gohilslok19-pixel/QuizeArena
echo ========================================================

cd /d "%~dp0"

echo [1/5] Initializing Git repository...
git init

echo [2/5] Staging files...
git add .

echo [3/5] Committing changes...
git commit -m "feat: complete production AI Quiz Arena with Google AdSense integration"

echo [4/5] Setting main branch and remote origin...
git branch -M main
git remote remove origin >nul 2>&1
git remote add origin https://github.com/gohilslok19-pixel/QuizeArena.git

echo [5/5] Pushing to GitHub...
git push -u origin main

echo ========================================================
echo Done! If push was rejected due to existing files on remote, run:
echo   git push -u origin main --force
echo ========================================================
pause
