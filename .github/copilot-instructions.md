# Copilot Instructions — SDD (Spec-Driven Development) 행동 강령

이 리포지토리에서 코드를 생성하거나 수정할 때, 아래 규칙을 **반드시** 준수하세요.

---

## 1. Plan 생성 규칙

Copilot Workspace에서 Plan을 생성할 때, 반드시 다음 양식을 따를 것:

```markdown
## Plan

### 아키텍처 변경 요약
(이 이슈가 시스템 아키텍처에 미치는 영향을 1~3문장으로 요약)

### 변경 파일 목록
| 파일 경로 | 변경 유형 | 변경 내용 요약 |
|-----------|----------|---------------|
| `app/models/todo.py` | 수정 | 새 필드 추가 |
| ... | ... | ... |
```

### Plan 작성 시 주의사항
- 변경할 파일을 빠짐없이 나열할 것
- "생성(Create) / 수정(Modify) / 삭제(Delete)" 중 변경 유형을 명확히 구분할 것
- 기존 코드의 하위 호환성 영향을 반드시 언급할 것

---

## 2. Tasks 생성 규칙

Tasks는 체크리스트 형태의 작업 단위로 분할할 것:

```markdown
## Tasks

- [ ] **Task 1**: (파일명) — 구체적인 작업 내용
- [ ] **Task 2**: (파일명) — 구체적인 작업 내용
- [ ] **Task 3**: 테스트 — 변경 사항 검증
```

### Tasks 작성 시 주의사항
- 하나의 Task는 하나의 파일 변경에 대응할 것 (가능한 한)
- 각 Task는 독립적으로 검증 가능해야 함
- 마지막 Task에는 반드시 "검증/테스트" 항목을 포함할 것

---

## 3. 코드 컨벤션

### Python
- Python 3.11+ 문법 사용 (match-case, `X | Y` union type 등)
- Type hints 필수 — 모든 함수의 매개변수와 반환 타입에 어노테이션
- Pydantic v2 모델 사용 (`BaseModel`, `model_dump()`, `model_validate()`)
- `from __future__ import annotations` 사용 권장

### FastAPI
- APIRouter로 라우트를 모듈화
- response_model을 명시하여 응답 스키마 보장
- HTTPException으로 에러 처리
- 경로 매개변수에 타입 명시 (`todo_id: int`)

### 프로젝트 구조
- `app/models/` — Pydantic 모델 (데이터 스키마)
- `app/routers/` — API 라우트 정의
- `app/services/` — 비즈니스 로직
- `app/data/` — 데이터 저장소

### 금지 사항
- 외부 DB 도입 금지 (인메모리 저장소 유지)
- 글로벌 상태를 직접 수정하는 라우트 핸들러 금지 (서비스 레이어를 통할 것)
- `Any` 타입 사용 최소화
