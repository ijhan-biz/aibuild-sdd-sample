#!/usr/bin/env bash
# Start backend and frontend servers in background
# Called by devcontainer.json postStartCommand

echo "==> Starting backend (FastAPI :8000)..."
cd /workspaces/aibuild-sdd-sample
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload > /tmp/backend.log 2>&1 &

echo "==> Starting frontend (Vite :5173)..."
cd /workspaces/aibuild-sdd-sample/frontend
nohup npm run dev -- --host 0.0.0.0 > /tmp/frontend.log 2>&1 &

echo "==> Servers starting in background. Logs: /tmp/backend.log, /tmp/frontend.log"
