import React from 'react';

export const QASection: React.FC = () => {
  return (
    <section id="qa" className="relative pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg sm:text-xl font-black text-[var(--text-heading)]">
            엔지니어링 노트: 현장과 시스템을 대하는 태도
          </h2>
          <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            07 / ENGINEERING NOTES
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)] font-semibold">Field Mindset • Reliability • Automation</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Note 1 */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <span className="text-xs text-[var(--text-heading)] font-semibold uppercase block mb-1.5">
              Q. 현장(MES) 개발의 핵심은?
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-2">
              "사무실 밖 현장의 변수를 코드에 담는 것"
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed font-normal">
              실제 페인트 제조 공장은 분진이 날리고 작업자분들이 두꺼운 장갑을 끼고 계십니다.{' '}
              화면은 한눈에 들어와야 하고 터치는 확실해야 하며, 무엇보다 설비 통신이 잠깐 끊겨도 생산 라인이 멈추거나 데이터가 유실되지 않도록{' '}
              백엔드 컨트롤러에서 촘촘하게 방어선을 구축하는 것이 MES 개발의 본질이라고 생각합니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            포커스: 터치 UX 최적화 & 통신 단절 롤백 방어
          </div>
        </div>

        {/* Note 2 */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <span className="text-xs text-[var(--text-heading)] font-semibold uppercase block mb-1.5">
              Q. 3년 9개월 SKT 장기 개발 & 운영의 배움은?
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-2">
              "기능 추가 속도와 무장애 안정성의 균형"
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed font-normal">
              SKT T-world 대규모 웹 문자 발송 시스템(MPOMR)과 임직원 사내 메신저(COMMA)처럼 수많은 트랜잭션과 보안이 요구되는 통신사 시스템에서는 단순 유지보수를 넘어 비즈니스 요건에 맞춘 신규 기능 개발을 지속 병행해야 합니다.{' '}
              대용량 발송 큐 처리 및 Oracle DB 인덱스를 정교하게 튜닝하고 Jenkins CI/CD 자동 배포 체계를 정착시켜, 신규 비즈니스 로직을 빠르게 적용하면서도{' '}
              기존 대고객·전사 서비스에 장애가 없도록 지켜내는 '개발과 운영의 균형 감각'을 체득했습니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            포커스: 대규모 트래픽 무장애 릴리즈 & DB 튜닝
          </div>
        </div>

        {/* Note 3 */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <span className="text-xs text-[var(--text-heading)] font-semibold uppercase block mb-1.5">
              Q. 자동화와 AI를 대하는 자세는?
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-2">
              "기술은 사람의 시간을 벌어주어야 한다"
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed font-normal">
              사내에 n8n 자동화 컨테이너를 직접 개설하고 주간 리포팅을 자동화한 이유는, 동료들이 단순 반복 업무에서 벗어나{' '}
              더 가치 있는 고민에 집중하도록 돕기 위함이었습니다. AW 2026이나 AI Summit에 참석해 끊임없이 신기술을 공부하는 것도{' '}
              결국 현실의 문제를 가장 효과적인 도구로 해결하기 위함입니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            포커스: n8n 파이프라인 전사 구축 & 업무 효율화
          </div>
        </div>

        {/* Note 4 */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between md:col-span-1 lg:col-span-1 border-l-3 border-l-[var(--accent)]/60 hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <span className="text-xs text-[var(--text-heading)] font-semibold uppercase block mb-1.5">
              Q. C언어 CGI 레거시와 리눅스 서버 유지보수의 배움은?
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-2">
              "운영을 넘어 OS와 메모리 밑바닥 원리를 배운 값진 자산"
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed font-normal">
              오래전 구축된 레거시 시스템에서 <strong>리눅스 서버에 직접 SSH로 접속해 C언어로 작성된 CGI 웹 모듈을 디버깅하고 유지보수</strong>했던 이력이 있습니다.{' '}
              최신 프레임워크처럼 편리한 추상화 레이어가 없던 환경이었기에, 역설적으로 <strong>Linux 프로세스 라이프사이클, 메모리 할당과 해제, 포인터, HTTP 표준 규격의 밑바닥 동작 원리</strong>를 가장 근본부터 체득할 수 있었습니다.{' '}
              단순히 '오래된 코드를 고치는 운영'에 머물지 않고, <em>"운영 관점에서 추적하기 쉽고 장애가 나지 않는 구조가 진짜 좋은 코드"</em>라는 점을 뼈저리게 배웠으며, 이는 현재 Spring Boot나 현대적 백엔드를 설계할 때도 로깅, 트랜잭션 격리, 리소스 누수 방지 역량의 든든한 뿌리가 되었습니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
            배움: 저수준(C/Linux) 밑바닥 원리 체득 & 운영 친화적 개발 태도
          </div>
        </div>

        {/* Note 5 */}
        <div className="editorial-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between md:col-span-2 lg:col-span-2 border-l-3 border-l-[var(--accent)] bg-[var(--accent-subtle)]/30 hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <span className="text-xs text-[var(--text-heading)] font-semibold uppercase block mb-1.5">
              Q. 예상치 못한 DB 유실 위기 수습과 수많은 새벽 작업이 남긴 교훈은?
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-2">
              "일촉즉발 장애 앞에서의 냉철한 수습력과 보이지 않는 곳을 지키는 책임감"
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed font-normal">
              과거 본인의 실수가 아닌 <strong>외부 인프라 이슈로 인해 운영 데이터베이스가 전면 유실될 뻔한 절체절명의 위기 상황</strong>을 마주한 적이 있습니다.{' '}
              순간적으로 극도의 압박감이 엄습했으나 침착함을 유지하며, 즉시 백업 아카이브 스냅샷을 격리 확보하고 <strong>트랜잭션 덤프 로그를 타임라인별로 역추적하여 단 한 건의 데이터 영구 유실 없이 정합성 100%로 무사 복구</strong>해 냈습니다.
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed font-normal mt-2.5">
              또한 24시간 가동되는 서버 애플리케이션 특성상, 사용자 서비스 영향을 최소화하기 위해 <strong>수없이 새벽 2~4시 심야 시간에 긴급 점검과 무중단 배포를 직접 도맡아 수행</strong>했습니다.{' '}
              이 경험들을 통해 <em>"장애는 두려워하는 것이 아니라 철저한 백업과 롤백 계획으로 제어하는 것이며, 엔지니어의 진짜 가치는 모두가 잠든 새벽에도 보이지 않는 곳에서 시스템을 지켜내는 강한 책임감에서 나온다"</em>는 확고한 직업관을 정립했습니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] flex flex-wrap items-center justify-between gap-2">
            <span>배움: 위기 복구 능력 (트랜잭션 로그 역추적 & 100% 무결성 복구)</span>
            <span className="accent-text font-bold">새벽을 지키는 서버 엔지니어의 책임감</span>
          </div>
        </div>
      </div>
    </section>
  );
};
