import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Server, Bot, Users } from 'lucide-react';

interface StrengthSummary {
  num: string;
  keyword: string;
  oneLiner: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STRENGTHS: StrengthSummary[] = [
  {
    num: '01',
    keyword: '현장 문제 해결',
    oneLiner: '생산 실적 데이터 무결성 100% 사수',
    icon: Factory
  },
  {
    num: '02',
    keyword: '대규모 무장애 운영',
    oneLiner: 'SKT 대용량 트래픽 3.9년 무사고',
    icon: Server
  },
  {
    num: '03',
    keyword: '업무 자동화 & AI',
    oneLiner: '반복 수작업 제거 & 생산성 혁신',
    icon: Bot
  },
  {
    num: '04',
    keyword: '적응력 & 팀워크',
    oneLiner: '해외 2개국 체류 & 서번트 리더십',
    icon: Users
  }
];

interface StrengthsSectionProps {
  onNavigate?: (view: any, sectionId?: string) => void;
}

export const StrengthsSection: React.FC<StrengthsSectionProps> = () => {

  return (
    <section id="strengths" className="relative scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5 pb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <h2 className="text-base sm:text-lg font-black text-[var(--text-heading)]">
            협업과 실무에서 발휘되는 4대 핵심 역량
          </h2>
          <span className="text-[10px] font-mono font-bold text-[var(--accent)] px-1.5 py-0.5 rounded bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            03 / CORE STRENGTHS
          </span>
        </div>
        <span className="text-[11px] font-mono text-[var(--text-muted)] font-semibold">
          On-site Focus • High-Traffic • Automation • Culture Fit
        </span>
      </div>

      {/* Credible, Grounded Single Executive Bar */}
      <div className="editorial-card rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">
          {STRENGTHS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.num}
                className="p-4 sm:p-5 flex flex-col justify-between hover:bg-[var(--bg-muted)]/30 transition-colors duration-150"
              >
                <div>
                  {/* Subtle Top Metadata: Number Index + Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] font-bold tracking-widest text-[var(--text-muted)] opacity-80">
                      PILLAR {item.num}
                    </span>
                    <Icon className="w-4 h-4 text-[var(--text-muted)]" />
                  </div>

                  {/* Main Keyword: Solid, Authoritative */}
                  <h3 className="text-base sm:text-[17px] font-extrabold text-[var(--text-heading)] tracking-tight mb-1.5 leading-snug">
                    {item.keyword}
                  </h3>
                </div>

                {/* Grounded, Realistic Engineering Value Proposition */}
                <p className="text-[12px] text-[var(--text-body)] font-medium leading-relaxed pt-2 border-t border-[var(--border-subtle)]/70 mt-2">
                  {item.oneLiner}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
