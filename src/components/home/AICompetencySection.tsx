import React from 'react';
import { motion } from 'framer-motion';
import { ClaudeLogo, OpenAILogo, GeminiLogo, N8nLogo } from '../common/AILogos';
import { Zap, ShieldCheck, Cpu } from 'lucide-react';

export const AICompetencySection: React.FC = () => {
  const aiTools = [
    {
      name: 'Claude',
      company: 'Anthropic',
      role: '코드 아키텍처 & 리팩토링',
      logo: ClaudeLogo,
      badge: 'Code Specialist',
      oneLiner: '복잡한 레거시 코드를 결합도 낮은 모듈형 아키텍처로 정밀 재설계',
      points: [
        'Spring Boot & React 대규모 소스 코드의 다중 파일 리팩토링',
        '컴포넌트 분리 및 불필요한 의존성 제거로 유지보수성 극대화',
        'RESTful API 스펙 및 클라이언트-서버 페이로드 사전 정합성 검증'
      ],
      tag: '#클린코드 #대규모리팩토링 #아키텍처'
    },
    {
      name: 'ChatGPT',
      company: 'OpenAI',
      role: '심층 추론 & SQL 최적화',
      logo: OpenAILogo,
      badge: 'Deep Reasoning',
      oneLiner: '제조 공정 비즈니스 로직 알고리즘화 및 대용량 DB 쿼리 튜닝',
      points: [
        'Tank Mapping, 가동 시간 등 복잡한 화학공정 예외 규칙 알고리즘 모델링',
        'Oracle / MySQL 대용량 발송 이력 쿼리 실행 계획(Explain Plan) 정밀 튜닝',
        '통신 단절, 경계값 등 엣지 케이스 단위 테스트(JUnit) 시나리오 사전 도출'
      ],
      tag: '#DB쿼리튜닝 #비즈니스로직 #엣지테스트'
    },
    {
      name: 'Gemini',
      company: 'Google',
      role: '초대용량 문맥 & 도면 분석',
      logo: GeminiLogo,
      badge: 'Long Context',
      oneLiner: '수십 장의 설비 사양서(PDF) 및 프로젝트 전수 코드베이스 분석',
      points: [
        '프로젝트 전수 소스파일을 한 번에 주입하여 전체 아키텍처 의존관계 파악',
        'PDF 설비 사양서 및 PLC 통신 프로토콜 문서에서 인터페이스 스펙 자동 추출',
        '사내 기술 동향 및 주간 R&D 리포트 요약 파이프라인 연계'
      ],
      tag: '#초대용량문맥 #설비사양서분석 #멀티모달'
    },
    {
      name: 'n8n',
      company: 'Self-Hosted n8n',
      role: '전사 업무 자동화 파이프라인',
      logo: N8nLogo,
      badge: 'Zero-Fail Auto',
      oneLiner: '사내 반복 업무를 제로화하는 전사 이벤트 트리거 자동화 구축',
      points: [
        '사내 n8n 도커 컨테이너 구축 및 팀별 자동화 웹훅(Webhook) 엔드포인트 개설',
        'AI 요약 API와 메신저/이메일을 결합한 주간 테크 리포트 무인 발행',
        '반복적인 수기 데이터 수집 작업을 백그라운드 스케줄러로 100% 자동화'
      ],
      tag: '#n8n컨테이너 #사내자동화 #생산성3배'
    }
  ];

  return (
    <section id="ai-competency" className="relative scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg sm:text-xl font-black text-[var(--text-heading)]">
            AI 실무 활용 역량: 적재적소 멀티 LLM 협업
          </h2>
          <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            06 / AI WORKFLOW
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)] font-semibold flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Claude • ChatGPT • Gemini • n8n</span>
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-5 leading-relaxed">
        AI를 맹목적으로 복사하지 않고, <strong>각 AI 도구의 고유한 특성(코드 품질, 추론력, 초대용량 문맥, 업무 자동화)</strong>을 분업화하여 개발 사이클 속도를 3배 이상 단축합니다.
      </p>

      {/* 4대 AI 특성별 실무 활용 카드 그리드 (단정한 editorial-card 디자인 통일) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 mb-5">
        {aiTools.map((tool, idx) => {
          const Logo = tool.logo;

          return (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="editorial-card p-5 rounded-2xl border border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--bg-card)] flex flex-col justify-between transition-all duration-200 hover:shadow-xs"
            >
              <div>
                {/* Header: Logo + Name + Badge */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 p-1.5">
                      <Logo className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[var(--text-heading)] leading-tight">
                        {tool.name}
                      </h3>
                      <div className="text-[10px] text-[var(--text-muted)] font-medium">
                        {tool.company}
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded status-badge font-bold shrink-0">
                    {tool.badge}
                  </span>
                </div>

                {/* Role & 1-Liner Highlight */}
                <div className="mb-3">
                  <div className="text-[11px] font-bold text-[var(--accent)] mb-1 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>{tool.role}</span>
                  </div>
                  <p className="text-xs text-[var(--text-heading)] font-semibold leading-snug">
                    {tool.oneLiner}
                  </p>
                </div>

                {/* 3 Practical Bullet Points */}
                <ul className="space-y-1.5 text-[11px] text-[var(--text-body)] leading-relaxed">
                  {tool.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="text-slate-400 dark:text-slate-500 font-bold shrink-0">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tag Footer */}
              <div className="mt-4 pt-2.5 border-t border-[var(--border-subtle)] text-[10px] font-medium text-[var(--text-muted)]">
                {tool.tag}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 하단: 인간 엔지니어의 철저한 검증 원칙 */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--text-heading)]">
              원칙: "AI가 코드를 짜도, 책임과 아키텍처 설계는 엔지니어의 몫입니다"
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
              도메인 설계 명세 선행 → 멀티 LLM 초안 구현 → 로컬 컴파일 & 단위 테스트 100% 통과 후 프로덕션 반영
            </div>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 whitespace-nowrap">
            생산성 3배 ↑ • 버그율 0건 유지
          </span>
        </div>
      </div>
    </section>
  );
};
