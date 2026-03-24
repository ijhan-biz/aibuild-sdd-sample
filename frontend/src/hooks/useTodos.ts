import { useState, useEffect, useCallback } from "react";
import type { Todo, Priority } from "../types";
import * as api from "../api";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.fetchTodos();
      setTodos(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTodo = useCallback(
    async (title: string, due_date?: string | null, priority?: Priority) => {
      const todo = await api.createTodo({ title, due_date, priority });
      setTodos((prev) => [...prev, todo]);
      return todo;
    },
    [],
  );

  const toggleTodo = useCallback(async (id: number, completed: boolean) => {
    const updated = await api.updateTodo(id, { completed });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  const editTodo = useCallback(
    async (
      id: number,
      fields: Record<string, string | undefined>,
    ) => {
      const updated = await api.updateTodo(id, fields);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      return updated;
    },
    [],
  );

  const removeTodo = useCallback(async (id: number) => {
    await api.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { todos, loading, refresh, addTodo, toggleTodo, editTodo, removeTodo };
}
