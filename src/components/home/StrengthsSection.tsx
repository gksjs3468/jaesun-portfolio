import React from 'react';
import { motion } from 'framer-motion';

export const StrengthsSection: React.FC = () => {
  return (
    <section id="strengths" className="relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg sm:text-xl font-black text-[var(--text-heading)]">
            협업과 실무에서 발휘되는 3대 핵심 역량
          </h2>
          <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            03 / CORE STRENGTHS
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)] font-semibold">On-site Focus • High-Traffic Ops • Automation</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {/* Card 1 */}
        <motion.div
          whileHover={{ y: -4 }}
          className="editorial-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center font-bold text-xs mb-3 font-mono shadow-xs">
              01
            </div>
            <h3 className="text-base font-bold text-[var(--text-heading)] mb-2">현장(On-site) 중심의 문제 해결력 (생산 파트)</h3>
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed font-normal">
              조광페인트 화학공정 MES의 생산 파트를 전담하며, 현장 작업자의 오입력을 줄이는 터치 POP UI(DevExtreme, React)를 설계했습니다.{' '}
              <strong>설비 I/F 연동 중 네트워크 끊김이나 장비 오류가 발생해도 생산 실적이 유실·왜곡되지 않도록 원자적 롤백 및 예외 방어 로직</strong>을 구현했습니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-medium">
            #스마트팩토리 #생산파트_POP #데이터무결성100%
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ y: -4 }}
          className="editorial-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center font-bold text-xs mb-3 font-mono shadow-xs">
              02
            </div>
            <h3 className="text-base font-bold text-[var(--text-heading)] mb-2">통신사 대규모 웹 문자 & 사내 메신저 개발·운영</h3>
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed font-normal">
              SKT T-world 대규모 웹 문자 발송 시스템(MPOMR)과 임직원 사내 메신저(COMMA)를 <strong>3년 9개월간 담당하며 신규 요구사항에 따른 지속적인 추가 개발과 운영</strong>을 성공적으로 이끌었습니다.{' '}
              대용량 발송 큐 관리, Oracle DB 대용량 쿼리 튜닝과 인덱스 최적화, 리눅스 C-Shell 자동화 배치, Jenkins CI/CD 무중단 배포를 직접 주도했습니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-medium">
            #Tworld문자발송 #사내메신저 #대용량쿼리최적화
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ y: -4 }}
          className="editorial-card p-6 sm:p-7 rounded-3xl flex flex-col justify-between"
        >
          <div>
            <div className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center font-bold text-xs mb-3 font-mono shadow-xs">
              03
            </div>
            <h3 className="text-base font-bold text-[var(--text-heading)] mb-2">업무 자동화(n8n) 및 차세대 AI 주도성</h3>
            <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed font-normal">
              반복 수작업을 기술로 해결합니다. 사내 부서별 n8n 컨테이너 구축과 도메인 발급을 주도하고, 주간 R&D 및 AI 테크 리포트 자동화 파이프라인을 개설했습니다.{' '}
              AW 2026 및 AI Summit Seoul 참관을 통해 Physical AI와 Agentic AI를 선제 연구 중입니다.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] font-medium">
            #n8n파이프라인 #생산성혁신 #AgenticAI
          </div>
        </motion.div>
      </div>
    </section>
  );
};
