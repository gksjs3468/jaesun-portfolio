import React from 'react';

export const PrinciplesSection: React.FC = () => {
  return (
    <section id="principles" className="relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg sm:text-xl font-black text-[var(--text-heading)]">
            엔지니어링 철학 & 실무 개발 원칙
          </h2>
          <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            05 / PRINCIPLES
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)] font-semibold">Reliability • Craftsmanship • Simplicity</span>
      </div>
      <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
        단순한 코드 구현을 넘어, 6년간 스마트팩토리 및 통신사 실무에서 체득한 <strong>소프트웨어 신뢰성(Reliability)과 장인정신</strong>의 5가지 핵심 원칙입니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Principle 1 */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="w-7 h-7 rounded-lg accent-pill font-bold text-xs flex items-center justify-center shrink-0 font-mono shadow-xs">01</span>
              <span className="text-[11px] status-badge px-2 py-0.5 rounded font-semibold">무결성 보존</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-1.5">수술적 최소 변경 (Surgical Changes)</h3>
            <p className="text-xs text-[var(--text-body)] leading-relaxed">
              기존 레거시 코드와 인접 모듈의 무결성을 존중합니다. 변경 범위를 해결하려는 문제 단위로 정밀하게 격리하여, <strong>기존 서비스에 영향을 미치지 않는 안전한 릴리즈</strong>를 실천합니다.
            </p>
          </div>
          <div className="mt-3.5 pt-2.5 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            실천: 원인 명확화 후 1회성 정밀 커밋 & 영향도 제로화
          </div>
        </div>

        {/* Principle 2 */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="w-7 h-7 rounded-lg accent-pill font-bold text-xs flex items-center justify-center shrink-0 font-mono shadow-xs">02</span>
              <span className="text-[11px] status-badge px-2 py-0.5 rounded font-semibold">오버엔지니어링 배제</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-1.5">실용적 단순성 (Simplicity First)</h3>
            <p className="text-xs text-[var(--text-body)] leading-relaxed">
              단 한 번 쓰일 코드에 불필요한 과잉 추상화(Over-engineering)를 배제합니다. <strong>현장 엔지니어와 동료가 30초 안에 로직을 직관적으로 이해하고 디버깅</strong>할 수 있는 가장 명쾌한 해법을 선택합니다.
            </p>
          </div>
          <div className="mt-3.5 pt-2.5 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            실천: 200줄 복잡한 로직보다 50줄의 명료한 구조 지향
          </div>
        </div>

        {/* Principle 3 */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="w-7 h-7 rounded-lg accent-pill font-bold text-xs flex items-center justify-center shrink-0 font-mono shadow-xs">03</span>
              <span className="text-[11px] status-badge px-2 py-0.5 rounded font-semibold">장애 선제 방어</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-1.5">내결함성 아키텍처 (Fail-Safe Architecture)</h3>
            <p className="text-xs text-[var(--text-body)] leading-relaxed">
              현장 센서, 공장 네트워크, 프린터 인터페이스는 언제든 끊어질 수 있음을 기본 전제로 둡니다. <strong>로컬 SQLite 큐잉, 트랜잭션 롤백, 지수 백오프 자동 재전송</strong>으로 데이터 유실 0%를 보장합니다.
            </p>
          </div>
          <div className="mt-3.5 pt-2.5 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            실천: 조광페인트 MES 상태머신 & 8pin 엣지 큐 설계
          </div>
        </div>

        {/* Principle 4 */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="w-7 h-7 rounded-lg accent-pill font-bold text-xs flex items-center justify-center shrink-0 font-mono shadow-xs">04</span>
              <span className="text-[11px] status-badge px-2 py-0.5 rounded font-semibold">정량적 검증</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-1.5">실측 기반 성능 튜닝 (Metric-Driven)</h3>
            <p className="text-xs text-[var(--text-body)] leading-relaxed">
              추측으로 튜닝하지 않고, 실제 실행 계획(Explain Plan)과 블록 I/O 수치를 기반으로 병목을 해결합니다. <strong>Oracle 대용량 쿼리 응답 시간을 4.2초에서 0.08초로 98% 단축</strong>한 실측 중심의 엔지니어링을 지향합니다.
            </p>
          </div>
          <div className="mt-3.5 pt-2.5 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            실천: Full Scan 제거, 복합 인덱스 및 파티셔닝 최적화
          </div>
        </div>

        {/* Principle 5 */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] border-l-3 border-l-[var(--accent)] bg-[var(--accent-subtle)]/30 flex flex-col justify-between md:col-span-2 lg:col-span-2 hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="w-7 h-7 rounded-lg accent-pill font-bold text-xs flex items-center justify-center shrink-0 font-mono shadow-xs">05</span>
              <span className="text-[11px] status-badge px-2 py-0.5 rounded font-semibold">AI 생산성 극대화</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-1.5">인간 주도 멀티 LLM 오케스트레이션 (Human-in-the-Loop AI)</h3>
            <p className="text-xs text-[var(--text-body)] leading-relaxed">
              AI를 맹목적으로 복사하지 않고, <strong>개발자가 철저한 설계 기준과 단위 테스트 시나리오를 먼저 수립한 뒤 Claude, Gemini, ChatGPT의 강점을 분업화</strong>합니다. 완성된 코드는 항상 로컬 컴파일과 실환경 테스트를 거쳐야만 프로덕션에 진입합니다.
            </p>
          </div>
          <div className="mt-3.5 pt-2.5 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] flex flex-wrap items-center justify-between gap-2">
            <span>실천: "테스트가 통과하기 전에는 완료(Done)라 말하지 않는다"</span>
            <span className="accent-text font-bold">생산성 3배 + 무결성 100% 동시 달성</span>
          </div>
        </div>
      </div>
    </section>
  );
};
