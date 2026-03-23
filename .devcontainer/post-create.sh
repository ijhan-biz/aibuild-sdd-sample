#!/usr/bin/env bash
set -e

echo "==> Installing backend dependencies..."
pip install -r requirements.txt

echo "==> Installing frontend dependencies..."
cd frontend && npm install

echo "==> Setup complete!"
