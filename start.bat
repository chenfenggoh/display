@echo off
cd /d "%~dp0"
where node >nul 2>&1
if %errorlevel%==0 (
  echo Starting with Node.js...
  node serve.js
) else (
  where python >nul 2>&1
  if %errorlevel%==0 (
    echo Starting with Python...
    python serve.py
  ) else (
    echo ERROR: Neither Node.js nor Python found.
    echo Install Node.js from https://nodejs.org
    pause
  )
)
