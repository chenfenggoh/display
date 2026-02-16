#!/bin/bash
# NTU Smart Display launcher — double-click to start
cd "$(dirname "$0")"

if command -v node &>/dev/null; then
  echo "Starting with Node.js..."
  node serve.js
elif command -v python3 &>/dev/null; then
  echo "Starting with Python 3..."
  python3 serve.py
else
  echo "ERROR: Neither Node.js nor Python 3 found."
  echo "Install Node.js from https://nodejs.org or Python from https://python.org"
  read -p "Press Enter to close..."
fi
