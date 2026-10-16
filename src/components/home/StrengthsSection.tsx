import React from 'react';
import { motion } from 'framer-motion';

export const StrengthsSection: React.FC = () => {
  return (
    <section id="strengths" className="relative scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg sm:text-xl font-black text-[var(--text-heading)]">
            협업과 실무에서 발휘되는 4대 핵심 역량
          </h2>
          <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            03 / CORE STRENGTHS
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)] font-semibold">
          On-site Focus • High-Traffic • Automation • Culture Fit
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-5.5">
        {/* Card 1 */}
        <motion.div
          whileHover={{ y: -4 }}
          className="editorial-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center font-bold text-xs mb-3 font-mono shadow-xs">
              01
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-2">
              현장 중심 문제 해결력 (생산 파트)
            </h3>
            <p className="text-xs text-[var(--text-body)] leading-relaxed font-normal">
              조광페인트 화학공정 MES 생산 파트를 전담하며 오입력을 줄이는 터치 POP UI를 설계했습니다.{' '}
              <strong>통신 끊김이나 장비 오류 시에도 생산 실적이 왜곡되지 않도록 원자적 롤백 및 예외 방어</strong>를 구현했습니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-medium">
            #스마트팩토리 #생산POP #데이터무결성100%
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ y: -4 }}
          className="editorial-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center font-bold text-xs mb-3 font-mono shadow-xs">
              02
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-2">
              대규모 웹 문자 & 메신저 운영
            </h3>
            <p className="text-xs text-[var(--text-body)] leading-relaxed font-normal">
              SKT T-world 웹 문자(MPOMR)와 사내 메신저(COMMA)를 <strong>3년 9개월간 개발·운영</strong>했습니다.{' '}
              대용량 발송 큐 관리, Oracle 쿼리 튜닝과 인덱스 최적화, Linux C-Shell 자동화 배치, Jenkins CI/CD 무중단 배포를 주도했습니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-medium">
            #Tworld문자발송 #사내메신저 #대용량DB튜닝
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ y: -4 }}
          className="editorial-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center font-bold text-xs mb-3 font-mono shadow-xs">
              03
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-2">
              업무 자동화(n8n) & AI 주도성
            </h3>
            <p className="text-xs text-[var(--text-body)] leading-relaxed font-normal">
              반복 수작업을 기술로 자동화합니다. 사내 n8n 컨테이너 구축을 주도하고 주간 R&D 및 AI 테크 리포트 파이프라인을 개설했습니다.{' '}
              최신 AI 서밋 참관을 통해 Physical AI와 Agentic AI 실무 적용을 선제 연구 중입니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-medium">
            #n8n파이프라인 #생산성혁신 #AgenticAI
          </div>
        </motion.div>

        {/* Card 4: People & Culture Fit Card */}
        <motion.div
          whileHover={{ y: -4 }}
          className="editorial-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center font-bold text-xs mb-3 font-mono shadow-xs">
              04
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-2">
              유연한 적응력 & 섬김의 팀워크
            </h3>
            <p className="text-xs text-[var(--text-body)] leading-relaxed font-normal">
              <strong>중국과 터키에서 각 1년 이상 체류</strong>하며 낯선 환경에 빠르게 녹아드는 유연성과 열린 소통 태도를 체득했습니다.{' '}
              또한 교회 및 공동체에서 리더로 섬기며 <strong>먼저 경청하고 궂은일을 솔선수범하여 동료의 병목을 돕는 '서번트 마인드셋'</strong>으로 팀의 완주를 돕습니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-medium">
            #이문화적응력 #서번트리더십 #컬쳐핏
          </div>
        </motion.div>
      </div>
    </section>
  );
};
