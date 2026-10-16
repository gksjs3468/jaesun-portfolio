import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  Activity,
  Gauge,
  Bot,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PrincipleItem {
  id: string;
  num: string;
  keyword: string; // 1줄에 쏙 들어가는 대표 키워드
  shortTitle: string; // 1줄에 표시할 간결한 타이틀
  fullTitle: string;
  oneLiner: string;
  icon: React.ComponentType<{ className?: string }>;
  detail: {
    coreMindset: string;
    fieldCase: string;
    checklist: string[];
    metric: string;
  };
}

export const PrinciplesSection: React.FC = () => {
  // 5개 중 현재 선택된 원칙 (기본값: 첫 번째)
  const [selectedId, setSelectedId] = useState<string>('principle-1');

  const principles: PrincipleItem[] = [
    {
      id: 'principle-1',
      num: '01',
      keyword: '무결성 보존',
      shortTitle: '부작용 없는 변경',
      fullTitle: '부작용 없는 안전한 변경 (Zero Side-Effects)',
      oneLiner: '새로운 기능을 더하거나 수정할 때, 기존 정상 기능에 부작용(Side-effect) 0%를 보장합니다.',
      icon: ShieldCheck,
      detail: {
        coreMindset:
          '기존 레거시와 정상 동작 중인 인접 모듈의 무결성을 최우선으로 존중합니다. 변경 범위를 해결하려는 문제 단위로 엄격히 통제하여, 서비스 중단이나 사이드 이펙트 없는 안전한 릴리즈를 실천합니다.',
        fieldCase:
          'i-MOS 솔루션의 복잡한 16개 차트 KPI 레포트 및 다중 탭 리팩토링 시, 기존 공통 모듈 파손 없이 카드뷰 파이프라인만 분리 교체하여 무장애 배포 달성.',
        checklist: [
          '변경 전 정상 동작 테스트 케이스 및 재현 환경 확보',
          '문제를 해결하는 최소 단위 코드만 정밀 커밋 & 롤백 안전장치 수립',
          '인접 의존성 영향도 사전 검증 후 프로덕션 반영'
        ],
        metric: '기존 운영 기능 영향도 0건 • 사이드 이펙트 제로'
      }
    },
    {
      id: 'principle-2',
      num: '02',
      keyword: '실용적 단순성',
      shortTitle: '실용적 단순성',
      fullTitle: '단순성이 최고의 미덕 (Simplicity First)',
      oneLiner: '불필요한 과잉 추상화를 배제하고, 동료가 30초 안에 읽을 수 있는 명료한 코드를 작성합니다.',
      icon: Zap,
      detail: {
        coreMindset:
          '단 한 번 쓰일 패턴에 불필요한 레이어를 중첩하지 않고, 새벽 장애 시에도 누구든 30초 안에 디버깅 가능한 직관적 구조를 만듭니다.',
        fieldCase:
          '조광페인트 생산 파트 POP 태블릿 화면 구축 시, 복잡한 전역 스토어 대신 직관적 상태 머신을 적용하여 현장 오작동 분석 시간 70% 단축.',
        checklist: [
          '성급한 추상화보다 현재 문제에 맞는 직관적 코드 선택',
          '함수당 단일 책임 원칙 & 자기설명적 네이밍 지향',
          '200줄 복잡 패턴보다 50줄의 명료하고 명시적인 구조 채택'
        ],
        metric: '신규 개발자 온보딩 및 코드 리뷰 시간 50% 단축'
      }
    },
    {
      id: 'principle-3',
      num: '03',
      keyword: '장애 선제 방어',
      shortTitle: '내결함성 아키텍처',
      fullTitle: '내결함성 방어 아키텍처 (Fail-Safe Architecture)',
      oneLiner: '현장 센서, 공장 네트워크는 언제든 끊어질 수 있음을 기본 전제로 둡니다.',
      icon: Activity,
      detail: {
        coreMindset:
          '네트워크 단절, 장비 전원 꺼짐, 외부 I/O 지연을 기본 상태로 가정하고 모든 입출력에 재시도와 로컬 격리 버퍼를 둡니다.',
        fieldCase:
          '8pin-print-agent 독립 구현 시, 로컬 SQLite 임시 큐와 지수 백오프 자동 재전송 루틴을 구축하여 현장 네트워크 단절 시에도 인쇄 누락 0건 달성.',
        checklist: [
          '모든 외부 호출에 타임아웃 및 서킷 브레이커 적용',
          '장애 시 로컬 디스크/SQLite 큐에 안전 보관 후 자동 싱크',
          '트랜잭션 ACID 보장 및 멱등성(Idempotency) 설계'
        ],
        metric: '통신 장애 상황에서도 데이터 유실율 0.00% 달성'
      }
    },
    {
      id: 'principle-4',
      num: '04',
      keyword: '정량적 검증',
      shortTitle: '실측 기반 튜닝',
      fullTitle: '실측 기반 성능 튜닝 (Metric-Driven Engineering)',
      oneLiner: '추측으로 튜닝하지 않고, 실제 실행 계획(Explain Plan)과 I/O 수치로 입증합니다.',
      icon: Gauge,
      detail: {
        coreMindset:
          '주관적 감각을 배제하고 프로파일러, 슬로우 쿼리 로그, Explain Plan과 블록 I/O 지표로 전후 성능 차이를 정량 입증합니다.',
        fieldCase:
          'SKT T-world 웹 문자 발송 시스템(MPOMR) 운영 중, 수천만 건 이력 테이블 Full Scan 제거 및 인덱스 재설계로 4.2초 쿼리를 0.08초로 98% 단축.',
        checklist: [
          '개선 전 벤치마크/프로파일링 기준선 측정',
          '데이터베이스 쿼리 실행 계획(Cost & Buffers) 정밀 분석',
          '운영 배포 후 실시간 모니터링 메트릭으로 개선 정량 검증'
        ],
        metric: '핵심 발송 이력 쿼리 응답 속도 4.2초 → 0.08초 (98% 개선)'
      }
    },
    {
      id: 'principle-5',
      num: '05',
      keyword: 'AI 생산성',
      shortTitle: '인간 주도 AI',
      fullTitle: '인간 주도 AI 오케스트레이션 (Human-in-the-Loop AI)',
      oneLiner: '설계와 테스트는 인간이 통제하고, 구현은 멀티 LLM으로 가속합니다.',
      icon: Bot,
      detail: {
        coreMindset:
          '도메인 규칙과 인터페이스 명세를 먼저 수립한 후, 멀티 LLM을 적재적소 분업화하고 반드시 로컬 컴파일과 단위 테스트로 직접 검증합니다.',
        fieldCase:
          '전사 n8n 자동화 파이프라인 및 복잡한 정규식 모듈 작성 시, AI로 1차 초안 생성 후 엣지 케이스 테스트를 직접 주입해 개발 사이클 3배 가속.',
        checklist: [
          'AI 프롬프트 전 명확한 아키텍처 및 타입 인터페이스 선행 정의',
          '생성된 코드의 시간/공간 복잡도 및 보안 취약점 전수 검토',
          '테스트 케이스를 통과하기 전까지는 절대 프로덕션에 병합하지 않음'
        ],
        metric: '개발 사이클 속도 3배 가속 + 프로덕션 버그 0건 유지'
      }
    }
  ];

  const currentPrinciple = principles.find(p => p.id === selectedId) || principles[0];
  const CurrentIcon = currentPrinciple.icon;

  return (
    <section id="principles" className="relative scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg sm:text-xl font-black text-[var(--text-heading)]">
            엔지니어링 철학 & 실무 개발 원칙
          </h2>
          <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            05 / PRINCIPLES
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)] font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Reliability • Craftsmanship • Simplicity</span>
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-3.5 leading-relaxed">
        6년간 스마트팩토리 및 통신사 실무에서 체득한 5가지 핵심 원칙입니다.
        <span className="text-[var(--accent)] font-semibold ml-1">상단의 단어 탭을 클릭하면 해당 철학의 실무 사례와 검증 수칙이 즉시 표시됩니다.</span>
      </p>

      {/* 1줄 단어 탭 바 (Horizontal 1-Line Keyword Buttons) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 mb-3.5">
        {principles.map((item) => {
          const isSelected = selectedId === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center gap-1 group relative overflow-hidden ${
                isSelected
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm scale-[1.01]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-border)] hover:bg-[var(--bg-muted)] text-[var(--text-heading)]'
              }`}
            >
              {/* Top Badge: Number & Icon */}
              <div className="flex items-center gap-1">
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[var(--accent)]'}`} />
                <span className={`font-mono text-[11px] font-black ${isSelected ? 'text-white/90' : 'text-[var(--accent)]'}`}>
                  {item.num}
                </span>
              </div>

              {/* Core Word / Short Title (한눈에 꽂히는 단어) */}
              <span className={`text-xs sm:text-sm font-black leading-tight ${isSelected ? 'text-white' : 'text-[var(--text-heading)]'}`}>
                {item.shortTitle}
              </span>

              {/* Sub Keyword Pill */}
              <span
                className={`text-[9px] font-semibold px-1.5 py-0.2 rounded ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'
                }`}
              >
                {item.keyword}
              </span>
            </button>
          );
        })}
      </div>

      {/* 단어 탭을 눌렀을 때 부드럽게 전환되는 상세 카드 뷰 (Detail Card View) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPrinciple.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="editorial-card p-5 sm:p-6 rounded-2xl border border-[var(--accent-border)] bg-[var(--bg-card)] shadow-sm"
        >
          {/* Card Top Title & Slogan */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-[var(--border-subtle)]">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[var(--accent)] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <CurrentIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-xs font-bold text-[var(--accent)]">
                    PRINCIPLE {currentPrinciple.num}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded status-badge font-bold">
                    {currentPrinciple.keyword}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-black text-[var(--text-heading)]">
                  {currentPrinciple.fullTitle}
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg inline-block">
                {currentPrinciple.detail.metric}
              </span>
            </div>
          </div>

          {/* Core One-Liner Quote */}
          <div className="my-3.5 p-3 sm:p-3.5 rounded-xl bg-[var(--accent-subtle)] border border-[var(--accent-border)]">
            <p className="text-xs sm:text-sm md:text-base font-bold text-[var(--text-heading)] leading-snug flex items-center gap-1.5">
              <span className="text-[var(--accent)] font-mono text-base sm:text-lg">“</span>
              <span>{currentPrinciple.oneLiner}</span>
              <span className="text-[var(--accent)] font-mono text-base sm:text-lg">”</span>
            </p>
          </div>

          {/* Details 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 text-xs sm:text-sm">
            {/* Left: 철학 배경 & 실무 적용 사례 (7 cols) */}
            <div className="md:col-span-7 space-y-3">
              <div>
                <h4 className="font-bold text-[var(--text-heading)] mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>엔지니어링 철학 배경</span>
                </h4>
                <p className="text-[var(--text-body)] leading-relaxed bg-[var(--bg-muted)]/50 p-3 sm:p-3.5 rounded-xl border border-[var(--border-subtle)]">
                  {currentPrinciple.detail.coreMindset}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[var(--text-heading)] mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-500" />
                  <span>실무 프로젝트 적용 사례</span>
                </h4>
                <p className="text-[var(--text-body)] leading-relaxed bg-[var(--bg-muted)]/50 p-3 sm:p-3.5 rounded-xl border border-[var(--border-subtle)] font-medium">
                  {currentPrinciple.detail.fieldCase}
                </p>
              </div>
            </div>

            {/* Right: 실천 수칙 & 체크리스트 (5 cols) */}
            <div className="md:col-span-5 flex flex-col justify-between gap-3">
              <div>
                <h4 className="font-bold text-[var(--text-heading)] mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>실천 수칙 (Standard Operating Procedure)</span>
                </h4>
                <ul className="space-y-2 bg-[var(--bg-muted)]/50 p-3 sm:p-3.5 rounded-xl border border-[var(--border-subtle)]">
                  {currentPrinciple.detail.checklist.map((check, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[var(--text-body)]">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span className="leading-snug">{check}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Proven Result Box */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <div className="text-[9px] uppercase font-mono font-bold text-[var(--text-muted)]">
                    VERIFIED RESULT
                  </div>
                  <div className="text-xs sm:text-sm font-black text-[var(--text-heading)] mt-0.5">
                    {currentPrinciple.detail.metric}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
