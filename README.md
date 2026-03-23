# Todo App — SDD Workflow Demo

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ijhan-biz/aibuild-sdd-sample?quickstart=1)

GitHub Copilot의 **Spec-Driven Development (SDD)** 워크플로우를 시연하기 위한 샘플 프로젝트입니다.

- **백엔드**: Python 3.9+ / FastAPI / Uvicorn (인메모리 저장소)
- **프론트엔드**: React + Vite + TailwindCSS
- **목적**: Issue → Copilot Workspace → Plan/Tasks → PR 자동 파이프라인 데모

## Quick Start

### GitHub Codespaces (권장)

위의 **"Open in GitHub Codespaces"** 버튼을 클릭하면:
1. Python 3.11 + Node 20 환경이 자동 구성됩니다
2. 백엔드(FastAPI :8000) + 프론트엔드(Vite :5173)가 자동 실행됩니다
3. 브라우저에서 프론트엔드 UI가 자동으로 열립니다

### 로컬 실행

#### 백엔드

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

- API: http://localhost:8000/todos
- Swagger UI: http://localhost:8000/docs
- Health: http://localhost:8000/health

### 프론트엔드

```bash
cd frontend
npm install
npm run dev
```

- UI: http://localhost:5173

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/todos` | 전체 Todo 목록 조회 |
| GET | `/todos/{id}` | 특정 Todo 조회 |
| POST | `/todos` | 새 Todo 생성 |
| PUT | `/todos/{id}` | Todo 수정 |
| DELETE | `/todos/{id}` | Todo 삭제 |
| GET | `/health` | 헬스 체크 |

## Todo 모델 (현재)

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | int | 자동 생성 |
| `title` | string | 할 일 제목 |
| `completed` | bool | 완료 여부 (기본: false) |

> **데모 시나리오**: 여기에 `due_date`, `priority` 필드를 추가하는 이슈를 Copilot Workspace로 처리합니다.

## Project Structure

```
app/
├── main.py              # FastAPI 앱 + CORS + CopilotKit 런타임
├── routers/todo.py      # API 라우트 (CRUD)
├── models/todo.py       # Pydantic 모델 (TodoCreate, TodoUpdate, TodoResponse)
├── services/todo.py     # 비즈니스 로직
└── data/store.py        # 인메모리 데이터 저장소

frontend/
├── src/
│   ├── App.tsx          # 루트 컴포넌트
│   ├── components/      # TodoApp, TodoForm, TodoList, TodoItem
│   ├── hooks/useTodos.ts # Todo CRUD 커스텀 훅
│   ├── api.ts           # 백엔드 API 호출
│   └── types.ts         # TypeScript 타입 정의
├── vite.config.ts       # Vite 설정 (프록시 포함)
└── tailwind.config.js   # Tailwind 설정
```

## SDD Demo

데모 관련 파일:
- `.github/ISSUE_TEMPLATE/sdd-feature.yml` — 스펙킷 양식의 이슈 템플릿
- `.github/copilot-instructions.md` — Copilot 행동 강령
- `demo/sample-issue.md` — 데모용 이슈 내용
- `demo/DEMO-SCRIPT.md` — 발표자 데모 대본

데모 시나리오: **"Todo에 마감일(due_date) + 우선순위(priority) 필드를 추가해 주세요"**
→ 이 이슈를 Copilot Workspace에서 열면, AI가 Plan/Tasks를 자동 생성하고 구현까지 수행합니다.
