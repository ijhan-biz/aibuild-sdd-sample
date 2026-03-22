# 데모용 이슈: Todo에 마감일 + 우선순위 필드 추가

> 이 내용을 GitHub Issue로 등록한 뒤, "Open in Copilot Workspace" 버튼으로 데모를 진행합니다.
> 아래 내용은 `.github/ISSUE_TEMPLATE/sdd-feature.yml` 양식에 맞춰 작성되었습니다.

---

**Issue Title**: `[Feature]: Todo에 마감일(due_date)과 우선순위(priority) 필드 추가`

**Labels**: `enhancement`, `sdd`

---

### 기능 요약 (Feature Summary)

Todo 항목에 마감일(`due_date`)과 우선순위(`priority`) 필드를 추가하여, 사용자가 할 일의 긴급도와 기한을 관리할 수 있도록 합니다.

### 사용자 스토리 (User Story)

As a Todo API 사용자,
I want 각 Todo에 마감일과 우선순위를 설정할 수 있기를,
so that 할 일의 긴급도를 파악하고 기한 내에 효율적으로 작업을 완료할 수 있다.

### 수용 기준 (Acceptance Criteria)

- [ ] `POST /todos` 요청 시 `due_date` (ISO 8601 형식, 예: `2026-04-01`) 필드를 **선택적으로** 전달할 수 있다.
- [ ] `POST /todos` 요청 시 `priority` (`low` | `medium` | `high`) 필드를 **선택적으로** 전달할 수 있다.
- [ ] 두 필드 모두 기본값을 가진다: `due_date`는 `null`, `priority`는 `medium`.
- [ ] `GET /todos` 및 `GET /todos/{id}` 응답에 `due_date`, `priority` 필드가 포함된다.
- [ ] `PUT /todos/{id}`로 `due_date`, `priority`를 수정할 수 있다.
- [ ] 기존 필드(`title`, `completed`)만으로도 Todo 생성이 가능하다 (**하위 호환 유지**).
- [ ] Swagger UI(`/docs`)에서 새 필드의 타입과 기본값이 정상적으로 표시된다.

### 기술적 제약조건 (Technical Constraints)

- 기존 API의 하위 호환성(backward compatibility)을 **반드시 유지**해야 합니다.
- `priority`는 Python `Literal["low", "medium", "high"]` 또는 `Enum`으로 타입을 제한합니다.
- `due_date`는 `datetime.date | None` 타입을 사용합니다.
- Pydantic v2 모델(`BaseModel`, `model_dump()`)을 사용합니다.
- 인메모리 저장소 구조를 유지합니다 (외부 DB 도입 금지).
- `from __future__ import annotations`를 사용합니다.

### 영향 범위 (Scope)

- `app/models/todo.py` — `TodoCreate`, `TodoUpdate`, `TodoResponse` 모델에 `due_date`, `priority` 필드 추가
- `app/data/store.py` — `add_todo()`, `update_todo()`에 새 필드 반영
- `app/services/todo.py` — 서비스 로직에 새 필드 전달
- `app/routers/todo.py` — 라우트 변경 필요 시 (response_model은 이미 설정됨)

### 추가 컨텍스트

이 이슈는 SDD(Spec-Driven Development) 워크플로우 데모를 위한 샘플 시나리오입니다.
Copilot Workspace가 이 이슈를 읽고 자동으로 Plan/Tasks를 생성하는 과정을 시연합니다.
