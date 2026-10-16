import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Tablet, Layers, ExternalLink, Sparkles, RotateCw } from 'lucide-react';

export interface GlobeNode {
  id: string;
  name: string;
  shortName: string;
  weight: number; // 0.95 ~ 1.6
  isCore?: boolean;
  period: string;
  summary: string;
  metrics: string;
  tags: string[];
  actionType?: 'pop-demo' | 'mes' | 'agent' | 'scroll-skt';
  actionLabel?: string;
}

const PIN8_ITEMS: GlobeNode[] = [
  {
    id: 'mes-jogwang',
    name: '조광페인트 화학공정 MES 생산 파트 전담',
    shortName: '조광페인트 MES',
    weight: 1.6,
    isCore: true,
    period: '2025.08 ~ 2026.09 (구축 완료)',
    summary: '현장 맞춤형 생산 실적 POP(Tablet & PC) 화면 개발, Tank Mapping 및 설비 통신 인터페이스 연동. 실적 데이터 무결성 100% 달성.',
    metrics: '실적 무결성 100%',
    tags: ['Spring Boot', 'React', 'DevExtreme', 'Pessimistic Lock'],
    actionType: 'pop-demo',
    actionLabel: 'POP 태블릿 시스템 직접 체험하기 →'
  },
  {
    id: 'imos-platform',
    name: 'i-MOS V2 AX 플랫폼 고도화',
    shortName: 'i-MOS V2 AX 플랫폼',
    weight: 1.3,
    period: '2025.08 ~ 현재 (재직 중)',
    summary: '생산 실적 카드뷰 컴포넌트 추가 및 전사 KPI 대시보드 리포트 모듈 안정화. 스마트팩토리 AX 운영 및 기능 확장.',
    metrics: '운영 & AX 확장',
    tags: ['React', 'DevExtreme', 'Spring Boot']
  },
  {
    id: 'print-agent',
    name: '프린트 에이전트 독립 개발',
    shortName: '프린트 에이전트 개발',
    weight: 1.25,
    period: '2025.08 ~ 현재',
    summary: '현장 네트워크 단절 시에도 라벨 인쇄 장애를 선제 방어하는 Python 기반 로컬 큐(SQLite) 독립 에이전트 구축.',
    metrics: '인쇄 누락 0건',
    tags: ['Python', 'SQLite', '장애 방어'],
    actionType: 'agent',
    actionLabel: '에이전트 아키텍처 케이스스터디 →'
  },
  {
    id: 'iot-sensors',
    name: 'IoT 무선 센서 & Node-RED 파이프라인',
    shortName: 'IoT 센서 & Node-RED',
    weight: 1.2,
    period: '2025.08 ~ 현재',
    summary: 'Zigbee 및 블루투스(BLE) 통신 기반 현장 온습도·진동 센서 연동, Node-RED를 활용한 실시간 데이터 수집 및 MES 전송 자동화.',
    metrics: '무선 데이터 수집',
    tags: ['Node-RED', 'Zigbee', 'Bluetooth BLE']
  },
  {
    id: 'n8n-automation',
    name: 'n8n 전사 업무 자동화 파이프라인',
    shortName: 'n8n 전사 자동화',
    weight: 1.05,
    period: '2025.08 ~ 현재',
    summary: '전사 n8n 컨테이너 구축 및 주간 AI/R&D 리포트 자동 생성 파이프라인. 반복 업무 자동화로 개발 리소스 절감.',
    metrics: '전사 AI 자동화',
    tags: ['n8n', 'Docker', 'AI 워크플로우']
  },
  {
    id: 'metric-100',
    name: '생산 실적 데이터 무결성 100%',
    shortName: '실적 무결성 100%',
    weight: 1.0,
    period: '핵심 실무 성과',
    summary: '비관적 락(Pessimistic Lock) 동시성 제어로 현장 연타/더블서브밋 및 패킷 유실을 완벽 방어하여 실적 오차 0건 달성.',
    metrics: '실적 오차 0건',
    tags: ['데이터 무결성', '동시성 제어', '락킹']
  }
];

const MOBILEPARK_ITEMS: GlobeNode[] = [
  {
    id: 'skt-mpomr',
    name: 'SKT T-world 웹 문자 발송 시스템 (MPOMR)',
    shortName: 'SKT 웹 문자 (MPOMR)',
    weight: 1.6,
    isCore: true,
    period: '2019.09 ~ 2023.06 (3년 9개월)',
    summary: 'SKT 가입자 대상 대규모 웹 문자(SMS/LMS/MMS) 동시 발송 시스템 신규 기능 개발 및 3.9년 장기 무장애 운영.',
    metrics: '3.9년 무장애 운영',
    tags: ['Java/JSP', 'Oracle DB', 'Linux', '대용량 발송 큐'],
    actionType: 'scroll-skt',
    actionLabel: 'SKT 대규모 프로젝트 상세 보기 →'
  },
  {
    id: 'skt-comma',
    name: 'SKT 임직원 사내 메신저 (COMMA) 플랫폼',
    shortName: 'SKT 전사 메신저 COMMA',
    weight: 1.35,
    period: '2021.04 ~ 2023.06 (2년 3개월)',
    summary: 'SKT 전사 임직원 사내 메신저 플랫폼의 신규 비즈니스 기능 개발, MySQL DB 연동 및 Jenkins 빌드·배포 자동화 무결점 관리.',
    metrics: '배포 실수 0건',
    tags: ['Java', 'MySQL', 'Jenkins CI/CD'],
    actionType: 'scroll-skt',
    actionLabel: 'COMMA 플랫폼 상세 보기 →'
  },
  {
    id: 'airtalk',
    name: 'Airtalk 실시간 커뮤니케이션 서비스',
    shortName: 'Airtalk 실시간 메신저',
    weight: 1.1,
    period: '2021.06 ~ 2021.12',
    summary: 'Vue.js 기반 프론트엔드 모듈식 UI 컴포넌트 개발 및 Java RESTful API 연동, 실시간 메시지 송수신 기능 구축 및 MariaDB 최적화.',
    metrics: '실시간 메시징',
    tags: ['Vue.js', 'Java', 'MariaDB', 'REST API']
  },
  {
    id: 'freemold',
    name: '프리몰드 제조 플랫폼 웹 고도화',
    shortName: '프리몰드 제조 웹',
    weight: 1.05,
    period: '2021.07 ~ 2021.12',
    summary: '제조 레거시 웹 시스템을 React 기반 반응형 UI로 개선 검토 및 jQuery/Bootstrap4 기반 UI 리뉴얼, 사용자 입력 동선 축소.',
    metrics: 'UI 리뉴얼',
    tags: ['React', 'Java', 'MySQL', 'Bootstrap4']
  },
  {
    id: 'idlenara-game',
    name: '아이들나라 모바일 인터랙티브 미니게임',
    shortName: '아이들나라 미니게임',
    weight: 1.0,
    period: '2023.01 ~ 2023.06',
    summary: '안드로이드 앱 임베디드 웹뷰(Webview) 키즈 타겟 인터랙티브 미니게임 개발. HTML5 Canvas & 순수 JavaScript 애니메이션 구현.',
    metrics: 'Canvas 애니메이션',
    tags: ['JavaScript', 'HTML5 Canvas', 'Android Webview']
  },
  {
    id: 'metric-stability',
    name: '대용량 트래픽 3.9년 무장애 운영',
    shortName: '3.9년 무장애 운영',
    weight: 1.0,
    period: '핵심 실무 성과',
    summary: '수천만 가입자 동시 발송 트래픽 중에도 무장애 유지. 심야 정기 점검 및 철저한 사전 검증으로 3년 9개월간 무사고 운영.',
    metrics: '3.9년 무장애 달성',
    tags: ['고가용성', '대용량 트래픽', '보안 가이드라인']
  }
];

interface Point3D {
  x: number;
  y: number;
  z: number;
  item: GlobeNode;
}

interface SingleCompanyGlobeProps {
  company: '8pin' | 'mobilepark';
  companyName: string;
  badge: string;
  subtitle: string;
  items: GlobeNode[];
  themeColor: 'blue' | 'indigo';
  onNavigate: (view: 'main' | 'mes' | 'agent' | 'pop-demo', sectionId?: string) => void;
}

const SingleCompanyGlobe: React.FC<SingleCompanyGlobeProps> = ({
  company,
  companyName,
  badge,
  subtitle,
  items,
  themeColor,
  onNavigate
}) => {
  const [selectedId, setSelectedId] = useState<string>(items[0]?.id || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef<{ rx: number; ry: number; vx: number; vy: number }>({
    rx: 0.25,
    ry: company === '8pin' ? 0.3 : -0.3,
    vx: 0,
    vy: company === '8pin' ? 0.0035 : -0.0035
  });
  const dragStartRef = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);

  // Fibonacci sphere point distribution
  const basePoints = useMemo<Point3D[]>(() => {
    const N = items.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    return items.map((item, i) => {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      return {
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.cos(phi),
        z: Math.sin(theta) * Math.sin(phi),
        item
      };
    });
  }, [items]);

  const [renderedNodes, setRenderedNodes] = useState<
    {
      item: GlobeNode;
      screenX: number;
      screenY: number;
      scale: number;
      opacity: number;
      zIndex: number;
    }[]
  >([]);

  useEffect(() => {
    let animId: number;

    const updateFrame = () => {
      const rot = rotRef.current;
      if (!dragStartRef.current) {
        rot.ry += rot.vy;
        rot.rx += rot.vx;
        rot.vx *= 0.95;
      }

      const rect = containerRef.current?.getBoundingClientRect();
      const width = rect?.width || 280;
      const height = rect?.height || 220;
      const radius = Math.min(width, height) * 0.36;
      const centerX = width / 2;
      const centerY = height / 2;

      const cosY = Math.cos(rot.ry);
      const sinY = Math.sin(rot.ry);
      const cosX = Math.cos(rot.rx);
      const sinX = Math.sin(rot.rx);

      const projected = basePoints.map((p) => {
        // Rotate around Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        // Rotate around X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective
        const fov = 320;
        const scale = fov / (fov + z2 * radius * 0.9);
        const screenX = centerX + x1 * radius * scale;
        const screenY = centerY + y2 * radius * scale;

        const normZ = z2; // -1 to 1
        const opacity = Math.max(0.25, (normZ + 1.2) / 2.2);
        const zIndex = Math.round((normZ + 1) * 100);

        return {
          item: p.item,
          screenX,
          screenY,
          scale: Math.max(0.7, Math.min(1.3, scale * p.item.weight)),
          opacity,
          zIndex
        };
      });

      setRenderedNodes(projected);
      animId = requestAnimationFrame(updateFrame);
    };

    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, [basePoints]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rx: rotRef.current.rx,
      ry: rotRef.current.ry
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const speed = 0.007;
    rotRef.current.ry = dragStartRef.current.ry + dx * speed;
    rotRef.current.rx = Math.max(-1.2, Math.min(1.2, dragStartRef.current.rx - dy * speed));
    rotRef.current.vy = dx * 0.0003;
    rotRef.current.vx = -dy * 0.0003;
  };

  const handlePointerUp = () => {
    dragStartRef.current = null;
  };

  const selectedItem = useMemo(
    () => items.find((it) => it.id === selectedId) || items[0],
    [items, selectedId]
  );

  const handleAction = useCallback(
    (item: GlobeNode) => {
      if (item.actionType === 'pop-demo') {
        onNavigate('pop-demo');
      } else if (item.actionType === 'mes') {
        onNavigate('mes');
      } else if (item.actionType === 'agent') {
        onNavigate('agent');
      } else if (item.actionType === 'scroll-skt') {
        const el = document.getElementById('project-enterprise-mpomr');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [onNavigate]
  );

  const isBlue = themeColor === 'blue';

  return (
    <div className="p-3.5 sm:p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[var(--accent-border)] transition-all duration-200">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isBlue ? 'bg-blue-600 animate-pulse' : 'bg-indigo-600 animate-pulse'
              }`}
            />
            <span className="font-black text-sm sm:text-base text-[var(--text-heading)]">
              {companyName}
            </span>
          </div>
          <span
            className={`text-[10px] px-2 py-0.5 rounded font-bold ${
              isBlue
                ? 'status-badge'
                : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)]'
            }`}
          >
            {badge}
          </span>
        </div>
        <div className="text-[11px] text-slate-700 dark:text-slate-300 font-semibold mb-2">
          {subtitle}
        </div>

        {/* 3D Sphere Interactive Area */}
        <div className="relative rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden mb-2.5">
          <div className="absolute top-2 left-2.5 z-10 flex items-center gap-1.5 pointer-events-none">
            <span
              className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-blue-500' : 'bg-indigo-500'}`}
            />
            <span className="text-[10px] font-bold text-[var(--text-muted)]">
              3D 토폴로지 글로브 (드래그 회전)
            </span>
          </div>

          <button
            onClick={() => {
              rotRef.current.ry = company === '8pin' ? 0.3 : -0.3;
              rotRef.current.rx = 0.25;
              rotRef.current.vy = company === '8pin' ? 0.0035 : -0.0035;
            }}
            className="absolute top-2 right-2.5 z-10 text-[10px] text-[var(--text-muted)] hover:text-[var(--text-heading)] flex items-center gap-0.5 cursor-pointer bg-[var(--bg-muted)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)]"
            title="각도 리셋"
          >
            <RotateCw className="w-2.5 h-2.5" />
            <span className="text-[9px]">리셋</span>
          </button>

          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full h-[210px] sm:h-[230px] cursor-grab active:cursor-grabbing touch-none flex items-center justify-center select-none"
          >
            {/* Ambient Wireframe Rings */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-25"
              viewBox="0 0 300 240"
            >
              <ellipse
                cx="150"
                cy="120"
                rx="100"
                ry="90"
                fill="none"
                stroke={isBlue ? '#3b82f6' : '#6366f1'}
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              <ellipse
                cx="150"
                cy="120"
                rx="100"
                ry="36"
                fill="none"
                stroke={isBlue ? '#3b82f6' : '#6366f1'}
                strokeWidth="0.8"
              />
              <ellipse
                cx="150"
                cy="120"
                rx="45"
                ry="90"
                fill="none"
                stroke={isBlue ? '#3b82f6' : '#6366f1'}
                strokeWidth="0.8"
              />
            </svg>

            {/* 3D Floating Nodes */}
            {renderedNodes.map(({ item, screenX, screenY, scale, opacity, zIndex }) => {
              const isSelected = item.id === selectedId;

              return (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(item.id);
                  }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) scale(${scale})`,
                    opacity: isSelected ? 1 : opacity,
                    zIndex: isSelected ? 999 : zIndex
                  }}
                  className="cursor-pointer transition-shadow duration-100"
                >
                  <div
                    className={`px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1 shadow-2xs border transition-all duration-150 ${
                      isSelected
                        ? isBlue
                          ? 'bg-blue-600 text-white border-blue-400 ring-2 ring-blue-500/30 font-black scale-105 shadow-md'
                          : 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-500/30 font-black scale-105 shadow-md'
                        : item.isCore
                        ? isBlue
                          ? 'bg-[var(--bg-muted)] text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700 font-black hover:scale-105'
                          : 'bg-[var(--bg-muted)] text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 font-black hover:scale-105'
                        : 'bg-[var(--bg-muted)] text-[var(--text-heading)] border-[var(--border-subtle)] font-semibold hover:border-slate-400'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isBlue ? 'bg-blue-500' : 'bg-indigo-500'
                      }`}
                    />
                    <span
                      className={`${
                        item.isCore ? 'text-[11px] sm:text-xs' : 'text-[10px]'
                      }`}
                    >
                      {item.shortName}
                    </span>
                    {item.isCore && (
                      <span
                        className={`text-[8px] px-1 rounded font-black ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : isBlue
                            ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300'
                            : 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300'
                        }`}
                      >
                        CORE
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Box */}
        <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] mb-2">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-xs font-black text-[var(--text-heading)] truncate">
              {selectedItem.name}
            </span>
            <span
              className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 ${
                isBlue
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                  : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
              }`}
            >
              {selectedItem.metrics}
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-body)] leading-relaxed line-clamp-2">
            {selectedItem.summary}
          </p>
        </div>

        {/* Action Button */}
        {selectedItem.actionLabel ? (
          <button
            onClick={() => handleAction(selectedItem)}
            className="w-full py-1.5 px-2.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-heading)] text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            {selectedItem.actionType === 'pop-demo' && <Tablet className="w-3.5 h-3.5 text-blue-500" />}
            {selectedItem.actionType === 'scroll-skt' && <Layers className="w-3.5 h-3.5 text-indigo-500" />}
            {selectedItem.actionType === 'agent' && <ExternalLink className="w-3.5 h-3.5 text-sky-500" />}
            <span>{selectedItem.actionLabel}</span>
          </button>
        ) : (
          <button
            onClick={() => {
              if (isBlue) {
                onNavigate('pop-demo');
              } else {
                const el = document.getElementById('project-enterprise-mpomr');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full py-1.5 px-2.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-heading)] text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            {isBlue ? (
              <>
                <Tablet className="w-3.5 h-3.5 text-blue-500" />
                <span>조광페인트 생산 파트 POP 태블릿 시스템 체험 →</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>SKT 대규모 서비스 & 프로젝트 상세 보기 →</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

interface CareerGlobeProps {
  onNavigate: (view: 'main' | 'mes' | 'agent' | 'pop-demo', sectionId?: string) => void;
}

export const CareerGlobe: React.FC<CareerGlobeProps> = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left Globe: 에잇핀 (8PIN) */}
      <SingleCompanyGlobe
        company="8pin"
        companyName="에잇핀 (8PIN)"
        badge="2025.08 ~ 현재 (재직 중)"
        subtitle="스마트팩토리 MES & 웹/서버 인프라 개발"
        items={PIN8_ITEMS}
        themeColor="blue"
        onNavigate={onNavigate}
      />

      {/* Right Globe: 모바일파크 (Mobile Park) */}
      <SingleCompanyGlobe
        company="mobilepark"
        companyName="모바일파크 (Mobile Park)"
        badge="2019.09 ~ 2023.06 (3년 9개월)"
        subtitle="개발 및 운영팀 (대리) / 대규모 통신사 엔터프라이즈"
        items={MOBILEPARK_ITEMS}
        themeColor="indigo"
        onNavigate={onNavigate}
      />
    </div>
  );
};
