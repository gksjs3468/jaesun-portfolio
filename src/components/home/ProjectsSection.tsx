import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ListFilter } from 'lucide-react';

interface ProjectsSectionProps {
  onNavigate: (view: 'main' | 'mes' | 'agent', sectionId?: string) => void;
}

type Category = 'all' | 'mes' | 'enterprise' | 'web';

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<Category>('all');

  return (
    <section id="projects" className="relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg sm:text-xl font-black text-[var(--text-heading)]">
            주요 프로젝트 및 상세 실무
          </h2>
          <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            04 / PROJECTS
          </span>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg transition whitespace-nowrap shadow-2xs font-semibold ${
              filter === 'all'
                ? 'accent-btn'
                : 'border border-[var(--border-subtle)] hover:bg-[var(--bg-muted)] text-[var(--text-muted)]'
            }`}
          >
            전체보기 (7)
          </button>
          <button
            onClick={() => setFilter('mes')}
            className={`px-3 py-1 rounded-lg transition whitespace-nowrap shadow-2xs font-semibold ${
              filter === 'mes'
                ? 'accent-btn'
                : 'border border-[var(--border-subtle)] hover:bg-[var(--bg-muted)] text-[var(--text-muted)]'
            }`}
          >
            스마트팩토리/MES
          </button>
          <button
            onClick={() => setFilter('enterprise')}
            className={`px-3 py-1 rounded-lg transition whitespace-nowrap shadow-2xs font-semibold ${
              filter === 'enterprise'
                ? 'accent-btn'
                : 'border border-[var(--border-subtle)] hover:bg-[var(--bg-muted)] text-[var(--text-muted)]'
            }`}
          >
            SKT 개발 & 운영
          </button>
          <button
            onClick={() => setFilter('web')}
            className={`px-3 py-1 rounded-lg transition whitespace-nowrap shadow-2xs font-semibold ${
              filter === 'web'
                ? 'accent-btn'
                : 'border border-[var(--border-subtle)] hover:bg-[var(--bg-muted)] text-[var(--text-muted)]'
            }`}
          >
            모바일파크 & 웹 플랫폼
          </button>
        </div>
      </div>

      <div className="space-y-7 sm:space-y-8">
        <AnimatePresence mode="popLayout">
          {/* 1. 조광페인트 MES 구축 */}
          {(filter === 'all' || filter === 'mes') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key="mes-jogwang"
              id="project-mes-jogwang"
              className="editorial-card p-6 sm:p-8 rounded-3xl project-card scroll-mt-24"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[11px] status-badge font-semibold inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      구축 완료 • 화학공정 MES 생산 파트 전담
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
                      <span className="h-4.5 w-auto bg-white px-1 py-0.5 rounded flex items-center justify-center border border-slate-200 shrink-0">
                        <img src="/ci_ko.png" alt="조광페인트" className="h-3 w-auto object-contain" />
                      </span>
                      <span className="font-medium text-[11px] text-[var(--text-muted)]">조광페인트 / 에잇핀</span>
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
                    조광페인트 스마트팩토리 MES 생산관리시스템 구축 (생산 파트 전담)
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                    현장 작업자를 위한 생산 실적 POP(Tablet & PC) 화면 개발, Tank Mapping 및 설비 통신 인터페이스 연동
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0 flex flex-col items-start sm:items-end gap-1">
                  <span className="text-xs font-medium text-[var(--text-heading)] whitespace-nowrap">
                    2025.08 ~ 2026.09 (구축 완료)
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-semibold whitespace-nowrap">
                    생산 실적 데이터 무결성 100% 달성
                  </span>
                  {/* Deep-dive Link Button */}
                  <button
                    onClick={() => onNavigate('mes')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg accent-pill hover:accent-btn transition shadow-2xs mt-1"
                  >
                    <span>심층 아키텍처 & 코드 리뷰</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 text-xs sm:text-sm">
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mb-2 flex items-center gap-1.5">
                    <ListFilter className="w-3.5 h-3.5 text-slate-400" />
                    <span>주요 수행 업무 (생산 파트 전담)</span>
                  </div>
                  <ul className="space-y-2 text-[var(--text-body)] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold shrink-0">•</span>
                      <span>
                        <strong>현장 맞춤형 생산 실적 POP(Tablet/PC) 화면 및 컨트롤러 개발</strong>: 작업지시 조회, 공정 준비(Tank Mapping, 설비 파라미터 입력, Down Time 입력), 화학 원료 자재 투입 및 최종 생산 실적 등록 풀 프로세스 구현
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold shrink-0">•</span>
                      <span>
                        <strong>설비 I/F 연동 자동화 & 생산 실적 데이터 무결성 보장</strong>: 센서 및 교반기 설비 통신 연계를 통한 실시간 계측치 수신, 자동 작업 시작/종료 처리 및 통신 예외 시 원자적 롤백 설계
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>문제 해결 및 기술적 성과</span>
                  </div>
                  <ul className="space-y-2 text-[var(--text-body)] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span>
                        <strong>현장 터치 POP 생산 실적 데이터 무결성 100% 달성</strong>: 작업자 장갑 착용/터치 연타로 인한 중복 등록(더블 서브밋) 원천 차단 및 비관적 락(Pessimistic Lock) 기반 동시성 제어로 실적 오차 0건 달성
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span>
                        <strong>설비 통신 예외 선제 방어</strong>: 열악한 공장 통신 환경에서 데이터 패킷 유실 시에도 지수 백오프 자동 재시도 및 안전 롤백 로직을 설계하여 생산 실적 유실 방어
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span>
                        <strong>현장 작업 능률 극대화</strong>: 터치 환경에 최적화된 DevExtreme & React 기반 UI 설계로 현장 작업자의 오입력 방지 및 입력 동선 축소
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-[var(--text-muted)] mr-1">Skills:</span>
                <span className="tech-tag">Java</span>
                <span className="tech-tag">Spring Boot</span>
                <span className="tech-tag">React</span>
                <span className="tech-tag">DevExtreme</span>
                <span className="tech-tag">RESTful API</span>
                <span className="tech-tag">Linux</span>
              </div>
            </motion.div>
          )}

          {/* 2. i-MOS V2 AX 고도화 & 8pin-print-agent */}
          {(filter === 'all' || filter === 'mes') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key="mes-agent"
              id="project-mes-agent"
              className="editorial-card p-6 sm:p-8 rounded-3xl project-card scroll-mt-24"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[11px] status-badge font-semibold inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      현재 재직 중 • 플랫폼 운영 & 추가 개발
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
                      <span className="h-4.5 w-auto bg-white px-1 py-0.5 rounded flex items-center justify-center border border-slate-200 shrink-0">
                        <img src="/logo-C41093Bk.webp" alt="에잇핀" className="h-3 w-auto object-contain" />
                      </span>
                      <span className="font-medium text-[11px] text-[var(--text-muted)]">에잇핀 솔루션</span>
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
                    i-MOS V2 AX 플랫폼 고도화 및 프린트 에이전트·무선 센서 파이프라인 개발·운영
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                    공통 UI/UX 리팩토링, KPI 레포트 버그 수정, 프린트 에이전트 개발, Zigbee·블루투스(BLE) 무선 센서 연동 및 Node-RED 기반 실시간 수집 파이프라인 구축
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0 flex flex-col items-start sm:items-end gap-1">
                  <span className="text-xs font-medium text-[var(--text-heading)] whitespace-nowrap">
                    2025.08 ~ 현재 (운영 및 추가 개발 중)
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-semibold whitespace-nowrap">
                    인쇄 장애 제로화 & IoT 파이프라인 안정 운영
                  </span>
                  {/* Deep-dive Link Button */}
                  <button
                    onClick={() => onNavigate('agent')}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg accent-pill hover:accent-btn transition shadow-2xs mt-1"
                  >
                    <span>로컬 큐 아키텍처 & 코드 리뷰</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 text-xs sm:text-sm">
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mb-2 flex items-center gap-1.5">
                    <ListFilter className="w-3.5 h-3.5 text-slate-400" />
                    <span>주요 수행 업무</span>
                  </div>
                  <ul className="space-y-2 text-[var(--text-body)] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold shrink-0">•</span>
                      <span>
                        <strong>i-MOS V2 AX 공통 UI/UX 전면 개선</strong>: 현장 실적 카드뷰 컴포넌트 신규 추가, 다중 탭 기능 최적화
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold shrink-0">•</span>
                      <span>
                        <strong>프린트 에이전트 개발</strong>: Python 기반 `smart_collector` 및 통신 트랜스미터 모듈을 설계하여 현장 라벨 인쇄 파이프라인 무중단 지원
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold shrink-0">•</span>
                      <span>
                        <strong>Zigbee·블루투스 센서 & Node-RED 연동</strong>: 현장 온습도 및 진동 무선 센서들을 Zigbee/BLE로 연결하고 Node-RED를 활용해 MES 실시간 모니터링 데이터 파이프라인 구축
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>문제 해결 및 성과</span>
                  </div>
                  <ul className="space-y-2 text-[var(--text-body)] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span>
                        <strong>인쇄 대기열 유실 원천 차단</strong>: 네트워크 지연 시에도 로컬 SQLite/JSON 큐에 안전 백업 후 순차 재전송되는 루틴을 확립하여 인쇄 누락 0건 방어
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span>
                        <strong>센서 데이터 실시간 가시화</strong>: 무선 센서 패킷을 Node-RED로 정제하여 상위 MES 대시보드와 지연 없이 연계
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span>
                        <strong>KPI 레포트 안정성 확보</strong>: 16개 차트 자동화 보고서 버그 수정 및 데이터 처리 안정성 제고
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-[var(--text-muted)] mr-1">Skills:</span>
                <span className="tech-tag">Python</span>
                <span className="tech-tag">Node-RED</span>
                <span className="tech-tag">Zigbee</span>
                <span className="tech-tag">Bluetooth (BLE)</span>
                <span className="tech-tag">SQLite</span>
                <span className="tech-tag">Java Spring Boot</span>
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">SQL</span>
              </div>
            </motion.div>
          )}

          {/* 3. SKT MPOMR 시스템 개발 및 운영 */}
          {(filter === 'all' || filter === 'enterprise') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key="enterprise-mpomr"
              id="project-enterprise-mpomr"
              className="editorial-card p-6 sm:p-8 rounded-3xl project-card scroll-mt-24"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[11px] status-badge font-semibold">
                      SKT T-world 웹 문자 발송 시스템 (3.9년 장기 운영)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
                      <span className="h-4.5 w-auto bg-white px-1 py-0.5 rounded flex items-center justify-center border border-slate-200 shrink-0">
                        <img src="/sk_telecom_logo.png" alt="SK telecom" className="h-3 w-auto object-contain" />
                      </span>
                      <span className="h-4.5 w-auto bg-white px-1 py-0.5 rounded flex items-center justify-center border border-slate-200 shrink-0">
                        <img src="/mobilepark_logo3.png" alt="모바일파크" className="h-2.5 w-auto object-contain" />
                      </span>
                      <span className="font-medium text-[11px] text-[var(--text-muted)]">SKT / 모바일파크</span>
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
                    SKT T-world 웹 문자 발송 시스템(MPOMR) 신규 기능 개발 및 장기 운영
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                    SKT 가입자 대상 대규모 웹 문자(SMS/LMS/MMS) 발송 시스템의 신규 기능 개발, 대용량 발송 큐 관리, Oracle 쿼리 최적화 및 3.9년 무장애 운영
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0 flex flex-col items-start sm:items-end gap-1">
                  <span className="text-xs font-medium text-[var(--text-heading)] whitespace-nowrap">
                    2019.09 ~ 2023.06
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-semibold whitespace-nowrap">
                    신규 개발 & 무사고 장기 운영
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 text-xs sm:text-sm">
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mb-2 flex items-center gap-1.5">
                    <ListFilter className="w-3.5 h-3.5 text-slate-400" />
                    <span>주요 수행 업무 (신규 개발 & 운영)</span>
                  </div>
                  <ul className="space-y-2 text-[var(--text-body)] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold shrink-0">•</span>
                      <span>
                        <strong>T-world 대규모 웹 문자 발송 신규 기능 및 비즈니스 로직 개발</strong>: Java, JSP, C# 기반으로 대규모 웹 문자(SMS/LMS/MMS) 발송 관련 요구사항 분석, 신규 기능 추가 개발 및 UI 화면 구현
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold shrink-0">•</span>
                      <span>
                        <strong>Linux C-Shell 자동화 배치 스크립트 작성 및 운영</strong>: 대규모 문자 발송 이력 데이터 정합성 검증, 발송 큐 모니터링 및 서비스 헬스체크 배치 프로세스 개발·운영
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>문제 해결 및 성과</span>
                  </div>
                  <ul className="space-y-2 text-[var(--text-body)] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span>
                        <strong>대용량 문자 발송 트래픽 중에도 무장애 유지</strong>: 신규 기능 릴리즈 시에도 수천만 가입자의 동시 발송 트랜잭션에 영향을 주지 않도록 철저한 예외 방어 및 사전 검증 수행
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span>
                        <strong>Oracle DB 대용량 쿼리 최적화</strong>: 발송 이력 및 가입자 데이터 테이블의 복잡한 인덱스 재설계 및 Full Scan 제거로 데이터 조회 응답 속도 대폭 개선
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span>
                        <strong>3.9년간 무사고 장기 운영</strong>: 통신사 기준의 엄격한 보안 가이드라인 준수, 심야 긴급 점검 및 장애 신속 조치 체계 확립
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-[var(--text-muted)] mr-1">Skills:</span>
                <span className="tech-tag">Java</span>
                <span className="tech-tag">JSP</span>
                <span className="tech-tag">C#</span>
                <span className="tech-tag">Oracle DB</span>
                <span className="tech-tag">Linux</span>
                <span className="tech-tag">대용량 아키텍처</span>
              </div>
            </motion.div>
          )}

          {/* 4. SKT COMMA 시스템 구축 */}
          {(filter === 'all' || filter === 'enterprise') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key="enterprise-comma"
              className="editorial-card p-6 sm:p-8 rounded-3xl project-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[11px] status-badge font-semibold">
                      SKT 임직원 사내 메신저 (2년 3개월)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
                      <span className="h-4.5 w-auto bg-white px-1 py-0.5 rounded flex items-center justify-center border border-slate-200 shrink-0">
                        <img src="/sk_telecom_logo.png" alt="SK telecom" className="h-3 w-auto object-contain" />
                      </span>
                      <span className="h-4.5 w-auto bg-white px-1 py-0.5 rounded flex items-center justify-center border border-slate-200 shrink-0">
                        <img src="/mobilepark_logo3.png" alt="모바일파크" className="h-2.5 w-auto object-contain" />
                      </span>
                      <span className="font-medium text-[11px] text-[var(--text-muted)]">SKT / 모바일파크</span>
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">
                    SKT 임직원 사내 메신저(COMMA) 플랫폼 구축, 기능 고도화 및 Jenkins 자동화
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
                    SKT 전사 임직원 사내 메신저 플랫폼의 신규 비즈니스 기능 개발, MySQL DB 연동 및 Jenkins 빌드·배포 파이프라인 관리
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0">
                  <span className="text-xs font-medium text-[var(--text-heading)] whitespace-nowrap">
                    2021.04 ~ 2023.06
                  </span>
                  <div className="text-[11px] text-[var(--text-muted)] font-semibold whitespace-nowrap">
                    기능 개발 및 릴리즈 실수 0건
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 text-xs sm:text-sm">
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mb-2 flex items-center gap-1.5">
                    <ListFilter className="w-3.5 h-3.5 text-slate-400" />
                    <span>주요 수행 업무</span>
                  </div>
                  <ul className="space-y-2 text-[var(--text-body)] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold shrink-0">•</span>
                      <span>
                        <strong>사내 메신저 플랫폼 신규 기능 개발 및 지속적 고도화</strong>: 사내 협업 확장에 따른 신규 비즈니스 기능(메시지 송수신, 조직도 연동, 채널 관리 등) 개발 및 MySQL 연동
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold shrink-0">•</span>
                      <span>
                        <strong>Jenkins CI/CD 배포 자동화 파이프라인 구축</strong>: 수동 배포 위험을 제거하고 안전하고 신속한 기능 릴리즈 환경 구축
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>문제 해결 및 성과</span>
                  </div>
                  <ul className="space-y-2 text-[var(--text-body)] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span>
                        <strong>신규 기능 배포 주기 단축</strong>: Jenkins 자동화 파이프라인 정착으로 신규 메신저 기능 개발 후 검증 및 배포까지의 소요 시간을 대폭 단축
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="accent-text font-bold shrink-0">✓</span>
                      <span>
                        <strong>배포 휴먼 에러 원천 차단</strong>: 릴리즈 체크리스트를 자동화 스크립트로 구성하여 임직원 업무 시간에 영향 없는 무결점 배포(실수 0건) 달성
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-[var(--text-muted)] mr-1">Skills:</span>
                <span className="tech-tag">Java</span>
                <span className="tech-tag">MySQL</span>
                <span className="tech-tag">Jenkins CI/CD</span>
                <span className="tech-tag">Windows/Mobile</span>
              </div>
            </motion.div>
          )}

          {/* 5, 6, 7 웹/플랫폼 프로젝트 카드 */}
          {(filter === 'all' || filter === 'web') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key="web-cards"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              <div className="editorial-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between project-card">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
                      <span className="h-4 w-auto bg-white px-1 py-0.5 rounded flex items-center justify-center border border-slate-200 shrink-0">
                        <img src="/mobilepark_logo3.png" alt="모바일파크" className="h-2 w-auto object-contain" />
                      </span>
                      <span className="text-[11px] font-semibold text-[var(--text-muted)]">모바일파크</span>
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-medium">2021.06 ~ 2021.12</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-1.5">
                    Airtalk 실시간 커뮤니케이션
                  </h4>
                  <p className="text-xs text-[var(--text-body)] leading-relaxed mb-3">
                    Vue.js 기반 프론트엔드 모듈식 UI 컴포넌트 개발 및 Java RESTful API 연동. 실시간 메시지 송수신 기능 구축 및 MariaDB 최적화.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 pt-2.5 border-t border-[var(--border-subtle)]">
                  <span className="tech-tag text-[10px]">Vue.js</span>
                  <span className="tech-tag text-[10px]">Java</span>
                  <span className="tech-tag text-[10px]">MariaDB</span>
                  <span className="tech-tag text-[10px]">REST API</span>
                </div>
              </div>

              <div className="editorial-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between project-card">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
                      <span className="h-4 w-auto bg-white px-1 py-0.5 rounded flex items-center justify-center border border-slate-200 shrink-0">
                        <img src="/mobilepark_logo3.png" alt="모바일파크" className="h-2 w-auto object-contain" />
                      </span>
                      <span className="text-[11px] font-semibold text-[var(--text-muted)]">모바일파크</span>
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-medium">2021.07 ~ 2021.12</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-1.5">
                    프리몰드 제조 플랫폼 웹 고도화
                  </h4>
                  <p className="text-xs text-[var(--text-body)] leading-relaxed mb-3">
                    제조 레거시 웹 시스템을 React 기반 반응형 UI로 개선 검토 및 jQuery/Bootstrap4 기반 UI 리뉴얼, 사용자 입력 동선 축소.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 pt-2.5 border-t border-[var(--border-subtle)]">
                  <span className="tech-tag text-[10px]">React</span>
                  <span className="tech-tag text-[10px]">Java</span>
                  <span className="tech-tag text-[10px]">MySQL</span>
                  <span className="tech-tag text-[10px]">Bootstrap4</span>
                </div>
              </div>

              <div className="editorial-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between project-card">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
                      <span className="h-4 w-auto bg-white px-1 py-0.5 rounded flex items-center justify-center border border-slate-200 shrink-0">
                        <img src="/mobilepark_logo3.png" alt="모바일파크" className="h-2 w-auto object-contain" />
                      </span>
                      <span className="text-[11px] font-semibold text-[var(--text-muted)]">모바일파크</span>
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-medium">2023.01 ~ 2023.06</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[var(--text-heading)] mb-1.5">
                    아이들나라 인터랙티브 미니게임
                  </h4>
                  <p className="text-xs text-[var(--text-body)] leading-relaxed mb-3">
                    안드로이드 앱 임베디드 웹뷰(Webview) 키즈 타겟 인터랙티브 미니게임 개발. HTML5 Canvas & 순수 JavaScript 애니메이션 구현.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 pt-2.5 border-t border-[var(--border-subtle)]">
                  <span className="tech-tag text-[10px]">JavaScript</span>
                  <span className="tech-tag text-[10px]">HTML5 Canvas</span>
                  <span className="tech-tag text-[10px]">Android Webview</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
