from fastapi import APIRouter, HTTPException

from app.models.todo import TodoCreate, TodoResponse, TodoUpdate
from app.services import todo as todo_service

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("", response_model=list[TodoResponse])
def list_todos():
    return todo_service.list_todos()


@router.get("/{todo_id}", response_model=TodoResponse)
def get_todo(todo_id: int):
    todo = todo_service.get_todo(todo_id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@router.post("", response_model=TodoResponse, status_code=201)
def create_todo(body: TodoCreate):
    return todo_service.create_todo(body)


@router.put("/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, body: TodoUpdate):
    todo = todo_service.update_todo(todo_id, body)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@router.delete("/{todo_id}", status_code=204)
def delete_todo(todo_id: int):
    if not todo_service.delete_todo(todo_id):
        raise HTTPException(status_code=404, detail="Todo not found")
