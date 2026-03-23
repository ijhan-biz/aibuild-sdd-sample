from __future__ import annotations

import datetime
from typing import Literal

from pydantic import BaseModel


class TodoCreate(BaseModel):
    title: str
    completed: bool = False
    due_date: datetime.date | None = None
    priority: Literal["low", "medium", "high"] = "medium"


class TodoUpdate(BaseModel):
    title: str | None = None
    completed: bool | None = None
    due_date: datetime.date | None = None
    priority: Literal["low", "medium", "high"] | None = None


class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool
    due_date: datetime.date | None = None
    priority: Literal["low", "medium", "high"] = "medium"
