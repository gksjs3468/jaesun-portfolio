# 한재선 포트폴리오 (HAN JAE-SUN Portfolio)

풀스택 & 스마트팩토리 시스템 엔지니어 한재선의 단독 웹 포트폴리오 프로젝트입니다.  
**Vite + React 19 + TypeScript + Tailwind CSS + Framer Motion** 기반의 모던 프론트엔드 아키텍처로 구축되었으며, 실시간 스마트팩토리 시뮬레이터와 심층 아키텍처 코드 리뷰 뷰를 제공합니다.

---

## ⚡ 주요 기술 스택 & 기능

- **Frontend Core**: React 19, TypeScript, Vite 8
- **Styling**: Tailwind CSS v4, Pretendard, JetBrains Mono
- **Motion & Interactions**: Framer Motion (부드러운 스크롤 애니메이션, 3D 카드 틸트, 뷰 크로스페이드)
- **Live Simulator**: 🏭 **스마트팩토리 실시간 MES 파이프라인 시뮬레이터** (가상 라인 계측, OEE 지표 모니터링, 네트워크 장애 주입 및 SQLite 로컬 큐 안전 복구 인터랙션)
- **Contact Experience**: 인터랙티브 이메일 복사 팝업 (원클릭 클립보드 복사 + Confetti 축하 효과 + 메일 클라이언트 연동)
- **Print Optimization**: A4 규격 100% 맞춤형 이력서 인쇄 최적화 (`window.print()`)
- **Theme**: 시스템 자동 감지 및 라이트/다크 모드 완벽 지원

---

## 💻 로컬에서 실행하기

```bash
# 1. 패키지 설치
npm install

# 2. 로컬 개발 서버 실행 (초고속 HMR 지원)
npm run dev

# 3. 브라우저에서 확인
# http://localhost:5173
```

---

## 🛠️ 프로덕션 빌드 & 미리보기

```bash
# TypeScript 검증 및 Vite 프로덕션 빌드
npm run build

# 빌드 결과물(dist/) 로컬 미리보기
npm run preview
```

---

## 🚀 Vercel 100% 무료 배포 가이드

본 프로젝트는 `vercel.json`의 SPA 라우팅 및 `dist/` 빌드 설정이 완료되어 있어 **Vercel Hobby Plan에서 영구 무료로 평생 호스팅**됩니다.

### GitHub 연동 자동 배포
1. 본 저장소를 GitHub에 푸시합니다.
2. [vercel.com](https://vercel.com)에서 **Add New Project** 클릭 후 GitHub 저장소를 선택합니다.
3. Framework Preset은 **Vite**로 자동 감지되며, **[Deploy]**를 누르면 약 20초 만에 글로벌 CDN 배포가 완료됩니다.
