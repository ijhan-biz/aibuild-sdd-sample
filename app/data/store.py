from __future__ import annotations

import datetime
from typing import Literal

_todos: list[dict] = []
_next_id: int = 1


def _reset() -> None:
    """Reset store — useful for tests."""
    global _todos, _next_id
    _todos = []
    _next_id = 1


def all_todos() -> list[dict]:
    return list(_todos)


def get_todo(todo_id: int) -> dict | None:
    return next((t for t in _todos if t["id"] == todo_id), None)


def add_todo(
    title: str,
    completed: bool = False,
    due_date: datetime.date | None = None,
    priority: Literal["low", "medium", "high"] = "medium",
) -> dict:
    global _next_id
    todo = {
        "id": _next_id,
        "title": title,
        "completed": completed,
        "due_date": due_date,
        "priority": priority,
    }
    _todos.append(todo)
    _next_id += 1
    return todo


def update_todo(todo_id: int, **fields: object) -> dict | None:
    todo = get_todo(todo_id)
    if todo is None:
        return None
    for key, value in fields.items():
        if value is not None:
            todo[key] = value
    return todo


def delete_todo(todo_id: int) -> bool:
    global _todos
    before = len(_todos)
    _todos = [t for t in _todos if t["id"] != todo_id]
    return len(_todos) < before
