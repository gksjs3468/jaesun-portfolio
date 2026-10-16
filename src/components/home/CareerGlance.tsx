import React, { useState } from 'react';
import { Tablet, Layers, ListFilter, Globe2 } from 'lucide-react';
import { CareerGlobe } from './CareerGlobe';

interface CareerGlanceProps {
  onNavigate: (view: 'main' | 'mes' | 'agent' | 'pop-demo', sectionId?: string) => void;
}

export const CareerGlance: React.FC<CareerGlanceProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'globe' | 'list'>('globe');

  return (
    <section id="career-glance" className="editorial-card p-4 sm:p-5 md:p-6 rounded-2xl border border-[var(--border-subtle)] relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <h2 className="text-base sm:text-lg font-black text-[var(--text-heading)]">
            한눈에 보는 경력 요약
          </h2>
          <span className="text-[10px] font-mono font-bold text-[var(--accent)] px-1.5 py-0.5 rounded bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            01 / CAREER
          </span>
        </div>

        {/* View Mode Toggle: 3D Dual Globes vs Detailed Text List */}
        <div className="flex items-center gap-2">
          <div className="inline-flex p-0.5 rounded-lg bg-[var(--bg-muted)] border border-[var(--border-subtle)] text-[11px] font-semibold">
            <button
              onClick={() => setViewMode('globe')}
              className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer ${
                viewMode === 'globe'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>3D 인터랙티브 토폴로지 글로브</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[var(--bg-card)] text-[var(--text-heading)] shadow-xs font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-heading)]'
              }`}
            >
              <ListFilter className="w-3 h-3 text-slate-400" />
              <span>상세 텍스트 목록</span>
            </button>
          </div>
          <span className="text-[11px] font-mono text-[var(--text-muted)] font-semibold hidden lg:inline">
            총 6년+ 실무 개발 & 엔터프라이즈 운영
          </span>
        </div>
      </div>

      {viewMode === 'globe' ? (
        <CareerGlobe onNavigate={onNavigate} />
      ) : (
        /* Detailed Text List View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company 1: 에잇핀 */}
          <div id="career-8pin" className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200 scroll-mt-24">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-black text-sm sm:text-base text-[var(--text-heading)]">에잇핀 (8PIN)</span>
                <span className="text-[10px] px-2 py-0.5 rounded status-badge font-bold">2025.08 ~ 현재 (재직 중)</span>
              </div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-semibold mb-2">
                스마트팩토리 MES & 웹/서버 인프라 개발
              </div>
              <ul className="text-xs text-[var(--text-body)] space-y-1.5 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                  <span><strong>조광페인트 화학공정 MES</strong>: 생산 파트 전담 — 생산 실적 POP(Tablet/PC) 화면 및 설비 I/F 연동 컨트롤러 구축 완료 (2025.08 ~ 2026.09)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                  <span><strong>i-MOS V2 AX 플랫폼 고도화</strong>: 생산 실적 카드뷰 컴포넌트 추가 및 KPI 레포트 안정화 (현재 운영 및 추가 기능 개발 중)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                  <span><strong>프린트 에이전트 개발</strong>: Python 기반 현장 라벨 인쇄 장애 방어 로컬 큐(SQLite) 구축으로 네트워크 단절 시에도 인쇄 누락 0건 방어</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                  <span><strong>IoT 무선 센서 & Node-RED 파이프라인</strong>: Zigbee 및 블루투스(BLE) 통신 기반 현장 온습도·진동 센서 연동, Node-RED를 활용한 실시간 데이터 수집 및 MES 전송 자동화</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                  <span><strong>업무 자동화 주도</strong>: 전사 n8n 컨테이너 구축 및 주간 AI/R&D 리포트 자동화 파이프라인</span>
                </li>
              </ul>

              {/* Interactive Demo Link Button */}
              <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => onNavigate('pop-demo')}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-heading)] text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Tablet className="w-3.5 h-3.5 text-blue-500" />
                  <span>조광페인트 생산 파트 POP 태블릿 시스템 체험하기 →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Company 2: 모바일파크 */}
          <div id="career-mobilepark" className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200 scroll-mt-24">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-black text-sm sm:text-base text-[var(--text-heading)]">모바일파크 (Mobile Park)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] font-bold">
                  2019.09 ~ 2023.06 (3년 9개월)
                </span>
              </div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-semibold mb-2">
                개발 및 운영팀 (대리) / 대규모 통신사 엔터프라이즈
              </div>
              <ul className="text-xs text-[var(--text-body)] space-y-1.5 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                  <span><strong>SKT T-world 웹 문자 발송 시스템(MPOMR)</strong>: 대규모 동시 발송 트래픽 처리 웹 애플리케이션 신규 기능 개발 및 3.9년 장기 무중단 운영</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                  <span><strong>SKT 임직원 사내 메신저(COMMA)</strong>: 전사 메신저 플랫폼 신규 비즈니스 기능 개발, MySQL 연동 및 Jenkins CI/CD 배포 자동화</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                  <span><strong>Airtalk 실시간 커뮤니케이션 서비스</strong>: Vue.js 기반 프론트엔드 UI 컴포넌트 개발 및 Java RESTful API 연동 (MariaDB)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                  <span><strong>프리몰드 제조 플랫폼 웹 고도화</strong>: 레거시 화면 리뉴얼, React 기반 반응형 UI 전환 검토 및 jQuery/Bootstrap4 개선</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-slate-400 dark:text-slate-500 font-bold">•</span>
                  <span><strong>아이들나라 모바일 미니게임 (블루가)</strong>: 안드로이드 임베디드 웹뷰 기반 인터랙티브 미니게임 JavaScript 애니메이션 개발</span>
                </li>
              </ul>

              {/* Interactive Jump Link Button */}
              <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => {
                    const el = document.getElementById('project-enterprise-mpomr');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-heading)] text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>SKT 대규모 서비스 & 모바일파크 프로젝트 상세 보기 →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
