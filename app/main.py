import os
import re

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from copilotkit import CopilotKitRemoteEndpoint

from app.routers import todo

app = FastAPI(
    title="Todo API",
    description="Simple Todo REST API — SDD workflow demo",
    version="0.1.0",
    redirect_slashes=False,
)

# CORS — localhost + Codespaces (*.app.github.dev)
ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
codespace_name = os.environ.get("CODESPACE_NAME")
if codespace_name:
    ALLOWED_ORIGINS.append(f"https://{codespace_name}-5173.app.github.dev")

CODESPACES_ORIGIN_RE = re.compile(r"^https://[a-z0-9-]+-5173\.app\.github\.dev$")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=r"https://[a-z0-9-]+-5173\.app\.github\.dev",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo.router)

# CopilotKit AG-UI runtime endpoint
sdk = CopilotKitRemoteEndpoint(actions=[])
add_fastapi_endpoint(app, sdk, "/copilotkit")


@app.api_route("/copilotkit", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
async def copilotkit_root(request: Request):
    """Handle /copilotkit without subpath — CopilotKit frontend hits this for info."""
    info = sdk.info(context={"properties": {}})
    return JSONResponse(content=info)


@app.get("/health")
def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
