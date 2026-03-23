# `.github/` 디렉터리로 제어할 수 있는 GitHub 기능 정리

> `.github/` 디렉터리에 특정 파일을 배치하면 GitHub가 자동으로 인식하여 기능을 활성화합니다.

---

## 1. 이슈 & PR 템플릿

| 경로 | 용도 |
|------|------|
| `.github/ISSUE_TEMPLATE/*.yml` | 이슈 폼 템플릿 (YAML 기반, 입력 필드 강제) |
| `.github/ISSUE_TEMPLATE/*.md` | 이슈 마크다운 템플릿 (자유 형식) |
| `.github/ISSUE_TEMPLATE/config.yml` | 템플릿 선택 화면 커스터마이징, 빈 이슈 허용/차단 |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR 본문 기본 템플릿 |
| `.github/PULL_REQUEST_TEMPLATE/*.md` | 복수 PR 템플릿 (`?template=name.md`로 선택) |

### 예시: `config.yml`
```yaml
blank_issues_enabled: false
contact_links:
  - name: 질문은 Discussions에서
    url: https://github.com/org/repo/discussions
    about: 버그가 아닌 질문은 여기에 남겨주세요.
```

---

## 2. GitHub Actions (CI/CD)

| 경로 | 용도 |
|------|------|
| `.github/workflows/*.yml` | 워크플로우 정의 (CI, CD, 자동화) |
| `.github/actions/` | 커스텀 composite / JavaScript / Docker 액션 |

### 예시: PR 시 자동 테스트
```yaml
name: CI
on:
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

---

## 3. Copilot & AI 설정

| 경로 | 용도 |
|------|------|
| `.github/copilot-instructions.md` | Copilot 행동 강령 (코드 생성 규칙, 양식 강제) |
| `.github/copilot/` | Copilot 에이전트 모드 설정 (MCP 서버 등) |

### 핵심
- `copilot-instructions.md`는 Copilot Workspace가 Plan/Tasks를 생성할 때 자동으로 참조
- 코드 컨벤션, 금지 사항, 프로젝트 구조 등을 명시하면 AI 출력 품질이 향상

---

## 4. 코드 품질 & 보안

| 경로 | 용도 |
|------|------|
| `.github/CODEOWNERS` | 파일/디렉터리별 PR 리뷰어 자동 지정 |
| `.github/dependabot.yml` | Dependabot 의존성 자동 업데이트 설정 |
| `.github/SECURITY.md` | 보안 취약점 보고 정책 (Security Advisory 탭에 표시) |

### 예시: `CODEOWNERS`
```
# 백엔드 변경 시 자동 리뷰 요청
app/models/     @backend-team
app/routers/    @backend-team

# 프론트엔드
frontend/src/   @frontend-team

# 인프라 설정
.github/        @devops-team
```

### 예시: `dependabot.yml`
```yaml
version: 2
updates:
  - package-ecosystem: pip
    directory: "/"
    schedule:
      interval: weekly
  - package-ecosystem: npm
    directory: "/frontend"
    schedule:
      interval: weekly
```

---

## 5. 릴리스 관리

| 경로 | 용도 |
|------|------|
| `.github/release.yml` | 자동 릴리스 노트 카테고리 설정 |

### 예시: `release.yml`
```yaml
changelog:
  categories:
    - title: "🚀 New Features"
      labels: [enhancement]
    - title: "🐛 Bug Fixes"
      labels: [bug]
    - title: "📝 Documentation"
      labels: [documentation]
    - title: "Other Changes"
      labels: ["*"]
```

---

## 6. 커뮤니티 & 프로젝트 관리

| 경로 | 용도 |
|------|------|
| `.github/CONTRIBUTING.md` | 기여 가이드라인 (PR 생성 시 링크 표시) |
| `.github/CODE_OF_CONDUCT.md` | 행동 강령 |
| `.github/SUPPORT.md` | 지원 채널 안내 (이슈 생성 시 표시) |
| `.github/FUNDING.yml` | 스폰서 버튼 설정 (GitHub Sponsors, Open Collective 등) |
| `.github/DISCUSSION_TEMPLATE/*.yml` | Discussions 카테고리별 폼 템플릿 |

### 예시: `FUNDING.yml`
```yaml
github: [username]
open_collective: project-name
custom: ["https://www.buymeacoffee.com/username"]
```

---

## 7. 봇 & 자동 라벨링

| 경로 | 용도 | 필요 워크플로우 |
|------|------|----------------|
| `.github/labeler.yml` | PR 변경 파일 기반 라벨 자동 부착 | `actions/labeler` |
| `.github/stale.yml` | 오래된 이슈/PR 자동 닫기 | `actions/stale` |

### 예시: `labeler.yml`
```yaml
backend:
  - changed-files:
      - any-glob-to-any-file: "app/**"
frontend:
  - changed-files:
      - any-glob-to-any-file: "frontend/**"
github-config:
  - changed-files:
      - any-glob-to-any-file: ".github/**"
```

---

## 8. 기타

| 경로 | 용도 |
|------|------|
| `.github/renovate.json` | Renovate 의존성 관리 (Dependabot 대안) |
| `.github/semantic.yml` | Semantic Pull Requests 앱 설정 |
| `.github/settings.yml` | probot/settings로 리포 설정 자동화 (브랜치 보호 등) |

---

## 이 프로젝트에서 사용 중인 항목

| 파일 | 상태 |
|------|------|
| `.github/ISSUE_TEMPLATE/sdd-feature.yml` | ✅ SDD 이슈 템플릿 |
| `.github/copilot-instructions.md` | ✅ Copilot 행동 강령 |
| `.github/CODEOWNERS` | ✅ 자동 리뷰어 지정 |
| `.github/workflows/ci.yml` | ✅ 백엔드 API + 프론트엔드 빌드 CI |
| `.github/release.yml` | ✅ 릴리스 노트 자동 분류 |
