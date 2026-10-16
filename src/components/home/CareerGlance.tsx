import React from 'react';
import { Tablet } from 'lucide-react';

interface CareerGlanceProps {
  onNavigate: (view: 'main' | 'mes' | 'agent' | 'pop-demo', sectionId?: string) => void;
}

export const CareerGlance: React.FC<CareerGlanceProps> = ({ onNavigate }) => {
  return (
    <section id="career-glance" className="editorial-card p-6 sm:p-8 md:p-9 rounded-3xl border border-[var(--border-subtle)] relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-6 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg sm:text-xl font-black text-[var(--text-heading)]">
            한눈에 보는 경력 요약
          </h2>
          <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            01 / CAREER
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)] font-semibold">총 6년+ 실무 개발 & 엔터프라이즈 운영</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company 1: 에잇핀 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-black text-base text-[var(--text-heading)]">에잇핀 (8PIN)</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md status-badge font-bold">2025.08 ~ 현재 (재직 중)</span>
            </div>
            <div className="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
              웹 및 서버 인프라 시스템 개발 / 스마트팩토리 MES
            </div>
            <ul className="text-xs text-[var(--text-body)] space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                <span><strong>i-MOS V2 AX 플랫폼 고도화</strong>: 생산 실적 카드뷰 컴포넌트 추가 및 KPI 레포트 안정화 (현재 운영 및 추가 기능 개발 중)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                <span><strong>조광페인트 화학공정 MES</strong>: 생산 파트 전담 — 생산 실적 POP(Tablet/PC) 화면 및 설비 I/F 연동 컨트롤러 구축 완료 (2025.08 ~ 2026.09)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                <span><strong>8pin-print-agent 독립 개발</strong>: Python 기반 현장 라벨 인쇄 장애 방어 로컬 큐 구축</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                <span><strong>업무 자동화 주도</strong>: 전사 n8n 컨테이너 구축 및 주간 AI/R&D 리포트 자동화 파이프라인</span>
              </li>
            </ul>

            {/* Interactive Demo Link Button */}
            <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => onNavigate('pop-demo')}
                className="w-full py-2.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md cursor-pointer hover:shadow-rose-900/30"
              >
                <Tablet className="w-4 h-4 text-white" />
                <span>조광페인트 화학공정 실제 생산 파트 POP 태블릿 시스템 체험하기 →</span>
              </button>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex flex-wrap gap-1">
            <span className="tech-tag text-[10px]">Java Spring Boot</span>
            <span className="tech-tag text-[10px]">React</span>
            <span className="tech-tag text-[10px]">DevExtreme</span>
            <span className="tech-tag text-[10px]">Python</span>
            <span className="tech-tag text-[10px]">n8n</span>
          </div>
        </div>

        {/* Company 2: 모바일파크 */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-black text-base text-[var(--text-heading)]">모바일파크 (Mobile Park)</span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] font-bold">
                2019.09 ~ 2023.06 (3년 9개월)
              </span>
            </div>
            <div className="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
              개발 및 운영팀 (대리) / 대규모 통신사 서비스
            </div>
            <ul className="text-xs text-[var(--text-body)] space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                <span><strong>SKT T-world 웹 문자 발송 시스템(MPOMR)</strong>: 대규모 동시 발송 트래픽 처리 웹 애플리케이션 신규 기능 개발 및 3.5년 장기 무중단 운영</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                <span><strong>SKT 임직원 사내 메신저(COMMA)</strong>: 전사 메신저 플랫폼 신규 비즈니스 기능 개발, MySQL 연동 및 Jenkins CI/CD 배포 자동화</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                <span><strong>Oracle 대용량 튜닝</strong>: 인덱스 최적화 및 C-Shell 자동화 배치 스크립트 작성</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                <span><strong>기타 상용 프로젝트</strong>: Airtalk(Vue.js), 프리몰드(React), 아이들나라 키즈 미니게임</span>
              </li>
            </ul>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex flex-wrap gap-1">
            <span className="tech-tag text-[10px]">Java/JSP</span>
            <span className="tech-tag text-[10px]">Oracle DB</span>
            <span className="tech-tag text-[10px]">Jenkins</span>
            <span className="tech-tag text-[10px]">Linux C-Shell</span>
            <span className="tech-tag text-[10px]">Vue.js/React</span>
          </div>
        </div>
      </div>
    </section>
  );
};
