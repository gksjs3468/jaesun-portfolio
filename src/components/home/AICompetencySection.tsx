import React from 'react';

export const AICompetencySection: React.FC = () => {
  return (
    <section id="ai-competency" className="relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg sm:text-xl font-black text-[var(--text-heading)]">
            AI 활용 역량: 특성별 멀티 LLM 실무 활용 전략
          </h2>
          <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            06 / AI STRATEGY
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)] font-semibold">Claude • OpenAI • Gemini • n8n</span>
      </div>
      <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
        특정 버전에 얽매이지 않고, 각 프론티어 AI의 <strong>고유한 강점(코딩 정밀도, 심층 추론, 초대용량 컨텍스트)</strong>을 파악하여 개발 라이프사이클 적재적소에 결합해 최상의 생산성을 발휘합니다.
      </p>

      {/* 3-Column: 특성별 멀티 LLM 실무 매트릭스 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-6">
        {/* Card 1: Anthropic Claude */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center font-bold text-xs shrink-0 shadow-xs font-mono">
                  CLD
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)]">Anthropic Claude</h3>
                  <div className="text-[11px] text-[var(--text-muted)] font-medium">코딩 정밀도 & 아키텍처 리팩토링 특화</div>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded status-badge font-bold">Code Architecture</span>
            </div>

            <div className="space-y-2.5 text-xs text-[var(--text-body)]">
              <div>
                <span className="font-bold text-[var(--text-heading)] block mb-0.5">1. 컴포넌트 구조화 & 클린 코드 리팩토링</span>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  스프링 백엔드 및 React/DevExtreme 화면의 복잡한 컴포넌트 구조를 결합도가 낮고 재사용성이 높은 모듈형 아키텍처로 리팩토링합니다.
                </p>
              </div>
              <div>
                <span className="font-bold text-[var(--text-heading)] block mb-0.5">2. CLI 터미널 에이전트 다중 파일 협업</span>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  터미널 환경에서 여러 소스 파일 간의 일관성을 유지하며 대규모 디버깅과 스타일 가이드 준수 작업을 능숙하게 주도합니다.
                </p>
              </div>
              <div>
                <span className="font-bold text-[var(--text-heading)] block mb-0.5">3. 정밀한 API 페이로드 & 인터페이스 검증</span>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  클라이언트-서버 간 통신 데이터 스펙과 RESTful API 명세를 엄밀하게 사전 검증하여 인터페이스 결함을 방지합니다.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap gap-1">
            <span className="tech-tag text-[10px]">클린코드 리팩토링</span>
            <span className="tech-tag text-[10px]">컴포넌트 아키텍처</span>
            <span className="tech-tag text-[10px]">CLI 에이전트 협업</span>
          </div>
        </div>

        {/* Card 2: OpenAI ChatGPT */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center font-bold text-xs shrink-0 shadow-xs font-mono">
                  GPT
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)]">OpenAI ChatGPT</h3>
                  <div className="text-[11px] text-[var(--text-muted)] font-medium">심층 추론 & 비즈니스·SQL 최적화 특화</div>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded status-badge font-bold">Deep Reasoning</span>
            </div>

            <div className="space-y-2.5 text-xs text-[var(--text-body)]">
              <div>
                <span className="font-bold text-[var(--text-heading)] block mb-0.5">1. 복잡한 제조 공정 비즈니스 로직 모델링</span>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  Tank Mapping, 설비 Down Time 등 예외 조건이 많은 공정 규칙을 프롬프트 엔지니어링으로 체계적 알고리즘으로 구조화합니다.
                </p>
              </div>
              <div>
                <span className="font-bold text-[var(--text-heading)] block mb-0.5">2. 대용량 SQL 실행 계획(Execution Plan) 튜닝</span>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  Oracle/MySQL의 복잡한 쿼리 Full Scan 병목을 분석하여 인덱스 재설계 및 옵티마이저 힌트 적용으로 응답 속도를 개선합니다.
                </p>
              </div>
              <div>
                <span className="font-bold text-[var(--text-heading)] block mb-0.5">3. 결함 예방 엣지 케이스 단위 테스트 도출</span>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  통신 끊김, 널 포인터, 경계값 등 사람이 놓치기 쉬운 엣지 케이스를 사전에 도출하여 JUnit/Mockito 테스트를 자동화합니다.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap gap-1">
            <span className="tech-tag text-[10px]">심층 추론 모델링</span>
            <span className="tech-tag text-[10px]">SQL 실행계획 튜닝</span>
            <span className="tech-tag text-[10px]">엣지 테스트 자동화</span>
          </div>
        </div>

        {/* Card 3: Google Gemini */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center font-bold text-xs shrink-0 shadow-xs font-mono">
                  GEM
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)]">Google Gemini</h3>
                  <div className="text-[11px] text-[var(--text-muted)] font-medium">초대용량 컨텍스트 & 멀티모달 파이프라인 특화</div>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded status-badge font-bold">Long Context</span>
            </div>

            <div className="space-y-2.5 text-xs text-[var(--text-body)]">
              <div>
                <span className="font-bold text-[var(--text-heading)] block mb-0.5">1. 대규모 프로젝트 소스 코드베이스 전수 분석</span>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  방대한 레거시 파일 전체를 컨텍스트로 주입하여 소스 간 복잡한 의존 관계를 한눈에 파악하고 리팩토링 포인트를 도출합니다.
                </p>
              </div>
              <div>
                <span className="font-bold text-[var(--text-heading)] block mb-0.5">2. 멀티모달 설비 통신 규격서 & 도면 파싱</span>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  수십 장 분량의 공장 설비 사양서(PDF) 및 PLC 프로토콜 다이어그램을 분석하여 통신 컨트롤러 인터페이스 스펙을 신속 추출합니다.
                </p>
              </div>
              <div>
                <span className="font-bold text-[var(--text-heading)] block mb-0.5">3. n8n 워크플로우 연동 사내 자동화 파이프라인</span>
                <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                  Gemini API를 n8n 워크플로우와 결합하여 사내 R&D 주간 보고서 및 AI 테크 트렌드 리포트를 자동으로 요약·전파합니다.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap gap-1">
            <span className="tech-tag text-[10px]">초대용량 컨텍스트</span>
            <span className="tech-tag text-[10px]">설비 사양서 파싱</span>
            <span className="tech-tag text-[10px]">n8n 워크플로우 연계</span>
          </div>
        </div>
      </div>

      {/* SDLC 단계별 AI 활용 성과 바 */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
        <div className="text-xs font-bold text-[var(--text-heading)] uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          실제 개발 프로세스(SDLC) 단계별 AI 활용 효과
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <div className="font-bold text-[var(--text-heading)] mb-1">01. 요구사항 설계</div>
            <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">API 스펙 및 데이터 모델링 초안 신속 도출 (설계 착수 시간 50% 단축)</p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <div className="font-bold text-[var(--text-heading)] mb-1">02. 페어 코딩</div>
            <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">보일러플레이트 자동화 및 핵심 로직 집중 (개발 생산성 3배 향상)</p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <div className="font-bold text-[var(--text-heading)] mb-1">03. 쿼리 & 엣지 방어</div>
            <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">대용량 쿼리 튜닝 및 통신 단절 예외 방어 테스트 자동화 (결함 사전 차단)</p>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <div className="font-bold text-[var(--text-heading)] mb-1">04. 사내 자동화</div>
            <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">n8n + LLM API 연계 주간 보고서 및 테크 리서치 자동화 (반복 업무 제로화)</p>
          </div>
        </div>
      </div>
    </section>
  );
};
