import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <CopilotKit runtimeUrl="/copilotkit" agent="todo_agent">
      <CopilotSidebar
        defaultOpen={true}
        labels={{
          title: "Todo AI 어시스턴트",
          initial: "안녕하세요! Todo를 관리해 드릴게요. 무엇을 도와드릴까요?",
          placeholder: "예: '내일까지 보고서 작성' 추가해 줘",
        }}
      >
        <TodoApp />
      </CopilotSidebar>
    </CopilotKit>
  );
}

export default App;
