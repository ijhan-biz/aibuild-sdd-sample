import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { useTodos } from "../hooks/useTodos";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

export default function TodoApp() {
  const { todos, loading, addTodo, toggleTodo, editTodo, removeTodo } =
    useTodos();

  // AG-UI: 현재 Todo 상태를 AI에게 공유
  useCopilotReadable({
    description: "현재 할 일 목록. 각 항목에 id, title, completed가 있습니다.",
    value: todos,
  });

  // AG-UI: AI가 호출할 수 있는 액션 정의
  useCopilotAction({
    name: "addTodo",
    description: "새로운 할 일을 추가합니다.",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "할 일 제목",
        required: true,
      },
    ],
    handler: async ({ title }: { title: string }) => {
      const todo = await addTodo(title);
      return `할 일 "${todo.title}"을 추가했습니다.`;
    },
  });

  useCopilotAction({
    name: "toggleTodo",
    description: "할 일의 완료/미완료 상태를 토글합니다.",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "할 일 ID",
        required: true,
      },
    ],
    handler: async ({ id }: { id: number }) => {
      const current = todos.find((t) => t.id === id);
      if (!current) return `ID ${id}인 할 일을 찾을 수 없습니다.`;
      const updated = await toggleTodo(id, !current.completed);
      return `"${updated.title}" → ${updated.completed ? "완료" : "미완료"}`;
    },
  });

  useCopilotAction({
    name: "editTodo",
    description: "할 일의 제목을 수정합니다.",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "할 일 ID",
        required: true,
      },
      { name: "title", type: "string", description: "새 제목" },
    ],
    handler: async ({
      id,
      ...fields
    }: {
      id: number;
      title?: string;
    }) => {
      const updated = await editTodo(id, fields);
      return `"${updated.title}" 수정 완료.`;
    },
  });

  useCopilotAction({
    name: "deleteTodo",
    description: "할 일을 삭제합니다.",
    parameters: [
      {
        name: "id",
        type: "number",
        description: "삭제할 할 일 ID",
        required: true,
      },
    ],
    handler: async ({ id }: { id: number }) => {
      const target = todos.find((t) => t.id === id);
      await removeTodo(id);
      return `"${target?.title ?? id}" 삭제 완료.`;
    },
  });

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">📝 Todo App</h1>
        <p className="text-gray-500 mt-1">
          AG-UI Protocol + CopilotKit 데모
        </p>
      </header>

      <TodoForm onAdd={addTodo} />

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
