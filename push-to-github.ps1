# PowerShell Script to Initialize and Push Project to https://github.com/tetycoon/seat-work.git
$ErrorActionPreference = "Stop"

# Ensure Git (including Portable MinGit) is in PATH
$gitLocations = @(
    "C:\Users\techt\.gemini\antigravity\brain\3774e2f9-2dbc-4d5d-b293-bea15c9d259b\scratch\mingit\cmd",
    "C:\Program Files\Git\cmd",
    "$env:LOCALAPPDATA\Programs\Git\cmd"
)
foreach ($loc in $gitLocations) {
    if ((Test-Path "$loc\git.exe") -and ($env:Path -notlike "*$loc*")) {
        $env:Path += ";$loc"
    }
}

Write-Host "Using Git: $(git --version)" -ForegroundColor Cyan

if (-not (Test-Path ".git")) {
    git init
}

git config user.name "tetycoon"
git config user.email "tetycoon@users.noreply.github.com"
git branch -M main
git add .
git diff-index --quiet HEAD 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "feat: build Service-First Chair Repair, Deep Cleaning & Corporate AMC System (Seat-Work)"
}

$remotes = git remote
if ($remotes -contains "origin") {
    git remote set-url origin https://github.com/tetycoon/seat-work.git
} else {
    git remote add origin https://github.com/tetycoon/seat-work.git
}

Write-Host "Pushing to https://github.com/tetycoon/seat-work.git (branch: main)..." -ForegroundColor Cyan
git push -u origin main
Write-Host "Successfully pushed to https://github.com/tetycoon/seat-work.git!" -ForegroundColor Green
