from __future__ import annotations

from app.data import store
from app.models.todo import TodoCreate, TodoResponse, TodoUpdate


def list_todos() -> list[TodoResponse]:
    return [TodoResponse(**t) for t in store.all_todos()]


def get_todo(todo_id: int) -> TodoResponse | None:
    raw = store.get_todo(todo_id)
    return TodoResponse(**raw) if raw else None


def create_todo(body: TodoCreate) -> TodoResponse:
    raw = store.add_todo(
        title=body.title,
        completed=body.completed,
        due_date=body.due_date,
        priority=body.priority,
    )
    return TodoResponse(**raw)


def update_todo(todo_id: int, body: TodoUpdate) -> TodoResponse | None:
    raw = store.update_todo(todo_id, **body.model_dump(exclude_unset=True))
    return TodoResponse(**raw) if raw else None


def delete_todo(todo_id: int) -> bool:
    return store.delete_todo(todo_id)
