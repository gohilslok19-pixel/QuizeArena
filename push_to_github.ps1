Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "Pushing AI Quiz Arena to GitHub: gohilslok19-pixel/QuizeArena" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

Set-Location -Path $PSScriptRoot

Write-Host "[1/5] Initializing Git repository..." -ForegroundColor Yellow
git init

Write-Host "[2/5] Staging files..." -ForegroundColor Yellow
git add .

Write-Host "[3/5] Committing changes..." -ForegroundColor Yellow
git commit -m "feat: complete production AI Quiz Arena with Google AdSense integration"

Write-Host "[4/5] Configuring branch and remote origin..." -ForegroundColor Yellow
git branch -M main
try { git remote remove origin 2>$null } catch {}
git remote add origin https://github.com/gohilslok19-pixel/QuizeArena.git

Write-Host "[5/5] Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nIf the push was rejected due to existing files on remote, run:" -ForegroundColor Red
    Write-Host "git push -u origin main --force" -ForegroundColor White
} else {
    Write-Host "`nSuccessfully pushed to https://github.com/gohilslok19-pixel/QuizeArena" -ForegroundColor Green
}
