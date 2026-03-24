import { useTodos } from "../hooks/useTodos";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import type { Priority } from "../types";

export default function TodoApp() {
  const { todos, loading, addTodo, toggleTodo, editTodo, removeTodo } =
    useTodos();

  const handleAdd = (title: string, due_date?: string | null, priority?: Priority) =>
    addTodo(title, due_date, priority);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">📝 Todo App</h1>
        <p className="text-gray-500 mt-1">
          SDD Workflow Demo
        </p>
      </header>

      <TodoForm onAdd={handleAdd} />

      {loading ? (
        <p className="text-center text-gray-400 py-8">로딩 중...</p>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={removeTodo}
        />
      )}
    </div>
  );
}
