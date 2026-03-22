from fastapi import FastAPI

from app.routers import todo

app = FastAPI(
    title="Todo API",
    description="Simple Todo REST API — SDD workflow demo",
    version="0.1.0",
)

app.include_router(todo.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
