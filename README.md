# Todo API — SDD Workflow Demo

GitHub Copilot의 **Spec-Driven Development (SDD)** 워크플로우를 시연하기 위한 샘플 프로젝트입니다.

- **스택**: Python 3.11+ / FastAPI / Uvicorn
- **데이터**: 인메모리 저장소 (DB 없음)
- **목적**: Issue → Copilot Workspace → Plan/Tasks → PR 자동 파이프라인 데모

## Quick Start

```bash
# 의존성 설치
pip install -r requirements.txt

# 서버 실행
uvicorn app.main:app --reload

# 또는
python -m app.main
```

서버가 실행되면:
- API: http://localhost:8000/todos
- Swagger UI: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/todos` | 전체 Todo 목록 조회 |
| GET | `/todos/{id}` | 특정 Todo 조회 |
| POST | `/todos` | 새 Todo 생성 |
| PUT | `/todos/{id}` | Todo 수정 |
| DELETE | `/todos/{id}` | Todo 삭제 |
| GET | `/health` | 헬스 체크 |

## Project Structure

```
app/
├── main.py              # FastAPI 앱 엔트리포인트
├── routers/todo.py      # API 라우트 정의
├── models/todo.py       # Pydantic 모델 (TodoCreate, TodoUpdate, TodoResponse)
├── services/todo.py     # 비즈니스 로직
└── data/store.py        # 인메모리 데이터 저장소
```

## SDD Demo

데모 관련 파일:
- `.github/ISSUE_TEMPLATE/sdd-feature.yml` — 스펙킷 양식의 이슈 템플릿
- `.github/copilot-instructions.md` — Copilot 행동 강령
- `demo/sample-issue.md` — 데모용 이슈 내용
- `demo/DEMO-SCRIPT.md` — 발표자 데모 대본

데모 시나리오: **"Todo에 마감일(due_date) + 우선순위(priority) 필드를 추가해 주세요"**
→ 이 이슈를 Copilot Workspace로 열면, AI가 Plan/Tasks를 자동 생성하고 구현까지 수행합니다.
