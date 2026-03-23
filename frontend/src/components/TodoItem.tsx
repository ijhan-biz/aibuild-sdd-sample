import type { Todo, Priority } from "../types";

interface Props {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => Promise<unknown>;
  onEdit: (id: number, fields: Record<string, string>) => Promise<unknown>;
  onDelete: (id: number) => Promise<void>;
}

const priorityBadge: Record<Priority, { label: string; className: string }> = {
  low: { label: "🟢 낮음", className: "bg-green-100 text-green-700" },
  medium: { label: "🟡 보통", className: "bg-yellow-100 text-yellow-700" },
  high: { label: "🔴 높음", className: "bg-red-100 text-red-700" },
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const badge = priorityBadge[todo.priority];

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:shadow-sm transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />

      <div className="flex-1 min-w-0">
        <p
          className={`font-medium truncate ${todo.completed ? "line-through text-gray-400" : "text-gray-900"}`}
        >
          {todo.title}
        </p>
        <div className="flex gap-2 mt-1 text-xs items-center">
          <span className="text-gray-300">#{todo.id}</span>
          <span className={`px-1.5 py-0.5 rounded font-medium ${badge.className}`}>
            {badge.label}
          </span>
          {todo.due_date && (
            <span className="text-gray-500">📅 {todo.due_date}</span>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 transition-colors p-1"
        title="삭제"
      >
        ✕
      </button>
    </div>
  );
}
