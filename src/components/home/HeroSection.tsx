import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, Zap, Bot, MapPin, Mail, Check, Terminal, ShieldCheck, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../common/GithubIcon';
import confetti from 'canvas-confetti';

interface CountUpNumberProps {
  target: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({
  target,
  duration = 1400,
  decimals = 0,
  suffix = '',
  prefix = ''
}) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(2, -10 * progress);
      const current = easeOut * target;
      setVal(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setVal(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {decimals > 0 ? val.toFixed(decimals) : Math.round(val)}
      {suffix}
    </span>
  );
};

interface HeroSectionProps {
  onOpenContact: () => void;
  onNavigate?: (view: 'main' | 'mes' | 'agent' | 'pop-demo', sectionId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onNavigate }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [typedHighlight, setTypedHighlight] = useState('');

  const scrollToTarget = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // 부드러운 강조 애니메이션 (링 펄스)
      el.classList.add('ring-2', 'ring-[var(--accent)]');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-[var(--accent)]');
      }, 1800);
    } else if (onNavigate) {
      onNavigate('main', targetId);
    }
  };

  const rotatingKeywords = [
    {
      highlight: '데이터 무결성 100%',
      prefix: '화학공정 현장 설비 통신 장애를 원천 방어하는',
    },
    {
      highlight: '3.9년 무중단 장기 운영',
      prefix: 'SKT 대규모 웹 문자 및 사내 메신저 트래픽의',
    },
    {
      highlight: '전사 n8n AI 파이프라인',
      prefix: '반복 업무를 자동화하고 생산성을 혁신하는',
    },
    {
      highlight: '스마트팩토리 MES & 풀스택 시스템',
      prefix: '공장 현장과 엔터프라이즈 비즈니스를 잇는',
    },
  ];

  // 한 글자씩 타자 치듯 타이핑되는 효과
  useEffect(() => {
    const fullText = rotatingKeywords[keywordIndex].highlight;
    setTypedHighlight('');
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      charIndex++;
      setTypedHighlight(fullText.slice(0, charIndex));
      if (charIndex >= fullText.length) {
        clearInterval(typeInterval);
      }
    }, 45);

    return () => clearInterval(typeInterval);
  }, [keywordIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setKeywordIndex(i => (i + 1) % rotatingKeywords.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [rotatingKeywords.length]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('gksjs3468@gmail.com');
    setEmailCopied(true);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <header id="summary" className="relative pt-4 sm:pt-6 pb-8 px-4 sm:px-8 w-full overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div className="pointer-events-none absolute -top-28 -left-20 w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-3xl -z-10 animate-pulse duration-1000" />
      <div className="pointer-events-none absolute top-12 right-10 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
        <div className="border-b border-[var(--border-subtle)] pb-10">

          {/* Top High-Tech Status & Role Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2.5 mb-3.5"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold accent-pill tracking-wide uppercase shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
              </span>
              Full-Stack & Systems Engineer
            </span>

            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              6+ Years Field Experience
            </span>

            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-md text-[11px] font-mono border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              Production Integrity: 100%
            </span>
          </motion.div>

          {/* Prominent Revolutionary Name & Inline Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 relative"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-2">
              <div className="flex flex-wrap items-baseline gap-2.5 sm:gap-3.5 shrink-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--text-heading)] leading-none">
                  한재선
                </h1>

                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono tracking-wider text-[var(--text-muted)]">
                    HAN JAE-SUN
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border-subtle)] text-[var(--accent)] tracking-widest uppercase">
                    ARCHITECT
                  </span>
                </div>
              </div>

              {/* Dynamic Rotating Slogan Banner (Placed to the right of Name) */}
              <div className="lg:border-l lg:border-[var(--border-subtle)] lg:pl-5 py-0.5 min-h-[38px] sm:min-h-[42px] flex flex-col justify-center overflow-hidden flex-1">

                {/* Effect 2: Slogan Text with Glowing Underline & Blinking Terminal Cursor Effect */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={keywordIndex}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.28 }}
                    className="text-xs sm:text-sm md:text-base font-semibold text-slate-800 dark:text-slate-200 flex flex-wrap items-center gap-x-2 gap-y-1 leading-snug"
                  >
                    <span className="text-slate-600 dark:text-slate-400 font-normal">
                      {rotatingKeywords[keywordIndex].prefix}
                    </span>
                    <span className="font-extrabold accent-text border-b-2 border-[var(--accent)] pb-0.5 inline-flex items-center shadow-2xs">
                      {typedHighlight}
                      <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-[var(--accent)] ml-1.5 animate-terminal-cursor align-middle shadow-[0_0_8px_var(--accent)]" />
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Quick Contact Bar */}
          <div className="flex flex-wrap items-center gap-y-2.5 gap-x-4 text-xs text-[var(--text-muted)] mb-6">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>경기도 성남시 수정구</span>
            </span>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 hover:text-[var(--text-heading)] underline decoration-dotted whitespace-nowrap cursor-pointer transition"
              title="클릭하여 이메일 주소 복사"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>gksjs3468@gmail.com</span>
              {emailCopied ? (
                <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> 복사됨
                </span>
              ) : (
                <span className="text-[10px] text-slate-400">(복사)</span>
              )}
            </button>

            <a
              href="https://github.com/gksjs3468/jaesun-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border border-slate-700/60 shadow-xs hover:shadow-md whitespace-nowrap transition-all duration-200 cursor-pointer font-semibold group"
              title="포트폴리오 소스코드 GitHub 저장소 바로가기"
            >
              <GithubIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>GitHub 소스코드</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Effect 3: Key Metrics Grid with Count-Up & Ambient SVG Sparklines */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 mb-6">
            {/* Metric 1: 6+년 */}
            <div className="relative overflow-hidden editorial-card p-4 sm:p-5 rounded-2xl group">
              <svg className="absolute right-2 bottom-1 w-24 h-12 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity text-[var(--text-muted)]" viewBox="0 0 100 40" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  d="M0 35 L 25 30 L 50 22 L 75 14 L 100 4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="4" r="3" fill="currentColor" />
              </svg>
              <div className="relative z-10 text-xl sm:text-2xl md:text-3xl font-black text-[var(--text-heading)]">
                <CountUpNumber target={6} suffix="+" /> <span className="text-xs sm:text-sm font-normal text-[var(--text-muted)]">년</span>
              </div>
              <div className="relative z-10 text-xs font-semibold text-[var(--text-heading)] mt-1 whitespace-nowrap">실무 개발 및 운영</div>
              <div className="relative z-10 text-[11px] text-[var(--text-muted)] mt-1 whitespace-nowrap">2019.09 ~ 현재</div>
            </div>

            {/* Metric 2: 100% 무결성 */}
            <div className="relative overflow-hidden editorial-card p-4 sm:p-5 rounded-2xl border-l-3 border-l-[var(--accent)] bg-[var(--accent-subtle)]/40 group">
              <svg className="absolute right-2 bottom-1 w-28 h-12 pointer-events-none opacity-25 group-hover:opacity-45 transition-opacity text-[var(--accent)]" viewBox="0 0 120 40" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                  d="M0 24 L 35 24 L 42 6 L 48 36 L 54 18 L 60 24 L 120 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="120" cy="24" r="3" fill="currentColor" />
              </svg>
              <div className="relative z-10 text-xl sm:text-2xl md:text-3xl font-black accent-text">
                <CountUpNumber target={100} suffix="%" />
              </div>
              <div className="relative z-10 text-xs font-semibold text-[var(--text-heading)] mt-1 whitespace-nowrap">생산 실적 데이터 무결성</div>
              <div className="relative z-10 text-[11px] text-[var(--text-muted)] mt-1 whitespace-nowrap">조광페인트 MES 생산 파트</div>
            </div>

            {/* Metric 3: 3.9년 SKT */}
            <div className="relative overflow-hidden editorial-card p-4 sm:p-5 rounded-2xl group">
              <svg className="absolute right-2 bottom-1 w-28 h-12 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity text-sky-500" viewBox="0 0 120 40" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  d="M0 20 C 15 10, 25 30, 40 20 C 55 10, 65 30, 80 20 C 95 10, 105 30, 120 20"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="120" cy="20" r="3" fill="currentColor" />
              </svg>
              <div className="relative z-10 text-xl sm:text-2xl md:text-3xl font-black text-[var(--text-heading)]">
                <CountUpNumber target={3.9} decimals={1} /> <span className="text-xs sm:text-sm font-normal text-[var(--text-muted)]">년</span>
              </div>
              <div className="relative z-10 text-xs font-semibold text-[var(--text-heading)] mt-1 whitespace-nowrap">SKT 개발 & 장기 운영</div>
              <div className="relative z-10 text-[11px] text-[var(--text-muted)] mt-1 whitespace-nowrap">T-world MPOMR • COMMA</div>
            </div>

            {/* Metric 4: Zero-Fail n8n */}
            <div className="relative overflow-hidden editorial-card p-4 sm:p-5 rounded-2xl group">
              <svg className="absolute right-2 bottom-1 w-28 h-12 pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity text-emerald-500" viewBox="0 0 120 40" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  d="M0 28 H 30 V 12 H 60 V 28 H 90 V 12 H 120"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="60" cy="28" r="2.5" fill="currentColor" />
                <circle cx="120" cy="12" r="2.5" fill="currentColor" />
              </svg>
              <div className="relative z-10 flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-[var(--text-heading)]">Zero-Fail</span>
                <span className="relative flex h-2 w-2 mb-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <div className="relative z-10 text-xs font-semibold text-[var(--text-heading)] mt-1 whitespace-nowrap">n8n 전사 파이프라인</div>
              <div className="relative z-10 text-[11px] text-[var(--text-muted)] mt-1 whitespace-nowrap">사내 자동화 및 리포팅</div>
            </div>
          </div>

          {/* 3-Pillar Visual Infographic Cards (Placed below Key Metrics) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
            {/* Pillar 1: 제조 현장 MES */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center shrink-0 shadow-xs transition group-hover:scale-105">
                  <Factory className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">On-Site MES</div>
                  <div className="text-sm font-bold text-[var(--text-heading)]">화학공정 MES 생산 파트</div>
                </div>
              </div>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                <strong>조광페인트 화학공정 MES 생산 파트 구축</strong>: 터치 POP 화면 설계, Tank Mapping 및 설비 통신 장애 시 롤백 방어로 <strong>생산 실적 데이터 무결성 100%</strong> 달성
              </p>
            </motion.div>

            {/* Pillar 2: 통신사 대규모 트래픽 */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center shrink-0 shadow-xs transition group-hover:scale-105">
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Enterprise Scale</div>
                  <div className="text-sm font-bold text-[var(--text-heading)]">SKT 문자 & 사내 메신저</div>
                </div>
              </div>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                <strong>T-world 문자(MPOMR) & 사내 메신저(COMMA) 3.9년</strong>: 대규모 발송 트래픽 큐 관리, 신규 기능 개발, Oracle 쿼리 튜닝, Jenkins CI/CD
              </p>
            </motion.div>

            {/* Pillar 3: AI & 전사 자동화 */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition group"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-8 h-8 rounded-lg accent-pill flex items-center justify-center shrink-0 shadow-xs transition group-hover:scale-105">
                  <Bot className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider">AI-Native Ops</div>
                  <div className="text-sm font-bold text-[var(--text-heading)]">AI 활용 & 업무 자동화</div>
                </div>
              </div>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                <strong>사내 n8n 파이프라인 전사 구축</strong>: LLM 연동 주간 리포트 자동화, Claude/Gemini 페어 프로그래밍으로 생산성 3배 혁신
              </p>
            </motion.div>
          </div>



          {/* Enterprise Clients & Collaborators Logo Strip */}
          <div className="mt-12 pt-8 border-t border-[var(--border-subtle)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div className="text-xs sm:text-sm font-bold text-[var(--text-heading)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span>프로젝트 협력 및 시스템 연동 기업</span>
                <span className="text-[11px] text-[var(--text-muted)] font-normal hidden sm:inline">
                  (Project Experience & Collaborators)
                </span>
              </div>
              <span className="text-[11px] text-[var(--text-muted)] font-medium">글로벌 자동화 • 대기업 통신계 • 화학 MES 솔루션</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {/* 1. Rockwell Automation -> 조광페인트 MES 프로젝트 */}
              <button
                type="button"
                onClick={() => scrollToTarget('project-mes-jogwang')}
                className="group p-5 rounded-2xl bg-[var(--bg-muted)]/50 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer text-left w-full"
                title="클릭하여 조광페인트 MES & 로크웰 PLC 연동 프로젝트로 이동"
              >
                <div className="w-full h-20 sm:h-22 rounded-xl bg-white p-3 flex items-center justify-center border border-slate-200 dark:border-slate-700/80 shadow-2xs group-hover:scale-[1.02] transition-transform">
                  <img src="/2019_Logo_rgb_RA_Bug-LeftText_color.svg" alt="로크웰 오토메이션 로고" className="max-h-9 sm:max-h-10 w-auto max-w-[75%] object-contain" />
                </div>
                <div className="mt-3 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                      로크웰 오토메이션 <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded status-badge font-semibold shrink-0">글로벌 자동화</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    Rockwell PLC 통신 인터페이스 연동 및 공정 데이터 실시간 계측
                  </p>
                </div>
              </button>

              {/* 2. FactoryTalk -> 조광페인트 MES 프로젝트 */}
              <button
                type="button"
                onClick={() => scrollToTarget('project-mes-jogwang')}
                className="group p-4 rounded-xl bg-[var(--bg-muted)]/50 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition flex flex-col justify-between shadow-2xs hover:shadow-md cursor-pointer text-left w-full"
                title="클릭하여 FactoryTalk MES 연계 프로젝트로 이동"
              >
                <div className="w-full h-20 sm:h-22 rounded-lg bg-white p-3 flex items-center justify-center border border-slate-200 dark:border-slate-700/80 shadow-2xs group-hover:scale-[1.02] transition-transform">
                  <img src="/2019_Logo_FactoryTalk_rgb.svg" alt="FactoryTalk 로고" className="max-h-12 w-auto max-w-[88%] object-contain" />
                </div>
                <div className="mt-3 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                      FactoryTalk <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded status-badge font-semibold shrink-0">산업용 MES</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    로크웰 제조 실행 소프트웨어 연계 및 화학공정 실시간 데이터 통합
                  </p>
                </div>
              </button>

              {/* 3. SK telecom -> SKT 대규모 웹 문자 시스템 프로젝트 */}
              <button
                type="button"
                onClick={() => scrollToTarget('project-enterprise-mpomr')}
                className="group p-4 rounded-xl bg-[var(--bg-muted)]/50 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition flex flex-col justify-between shadow-2xs hover:shadow-md cursor-pointer text-left w-full"
                title="클릭하여 SKT T-world 웹 문자 발송 시스템 프로젝트로 이동"
              >
                <div className="w-full h-20 sm:h-22 rounded-lg bg-white p-1 flex items-center justify-center border border-slate-200 dark:border-slate-700/80 shadow-2xs group-hover:scale-[1.02] transition-transform overflow-hidden">
                  <img src="/sk_telecom_logo.png" alt="SK telecom 로고" className="h-full w-auto max-h-[92%] max-w-[95%] object-contain scale-140 sm:scale-150" />
                </div>
                <div className="mt-3 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                      SK telecom <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded status-badge font-semibold shrink-0">대규모 통신계</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    T-world 대규모 웹 문자(MPOMR) & 전사 사내 메신저(COMMA) 3.9년 개발·운영
                  </p>
                </div>
              </button>

              {/* 4. 조광페인트 -> 조광페인트 MES 프로젝트 */}
              <button
                type="button"
                onClick={() => scrollToTarget('project-mes-jogwang')}
                className="group p-4 rounded-xl bg-[var(--bg-muted)]/50 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition flex flex-col justify-between shadow-2xs hover:shadow-md cursor-pointer text-left w-full"
                title="클릭하여 조광페인트 스마트팩토리 MES 생산관리 구축 프로젝트로 이동"
              >
                <div className="w-full h-20 sm:h-22 rounded-lg bg-white p-3 flex items-center justify-center border border-slate-200 dark:border-slate-700/80 shadow-2xs group-hover:scale-[1.02] transition-transform">
                  <img src="/ci_ko.png" alt="조광페인트 로고" className="max-h-12 w-auto max-w-[88%] object-contain" />
                </div>
                <div className="mt-3 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                      조광페인트 <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded status-badge font-semibold shrink-0">페인트 스마트 MES</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    화학공정 스마트팩토리 MES 생산관리 구축 및 현장 POP 생산 파트 전담
                  </p>
                </div>
              </button>

              {/* 5. 에잇핀 (8PIN) -> i-MOS V2 AX 고도화 & 8pin-print-agent 프로젝트 */}
              <button
                type="button"
                onClick={() => scrollToTarget('project-mes-agent')}
                className="group p-4 rounded-xl bg-[var(--bg-muted)]/50 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition flex flex-col justify-between shadow-2xs hover:shadow-md cursor-pointer text-left w-full ring-1 ring-[var(--accent-border)]/50"
                title="클릭하여 에잇핀 i-MOS V2 AX 플랫폼 및 인쇄 에이전트 프로젝트로 이동"
              >
                <div className="w-full h-20 sm:h-22 rounded-lg bg-white p-2.5 sm:p-3 flex items-center justify-center border border-slate-200 dark:border-slate-700/80 shadow-2xs group-hover:scale-[1.02] transition-transform">
                  <img src="/logo-C41093Bk.webp" alt="에잇핀 (8PIN) 로고" className="max-h-11 sm:max-h-13 w-auto max-w-[88%] object-contain" />
                </div>
                <div className="mt-3 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                      에잇핀 (8PIN) <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded status-badge font-semibold shrink-0">재직 중</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    i-MOS MES 고도화, 프린트 에이전트 개발 및 Zigbee·BLE 무선 센서/Node-RED 파이프라인 구축
                  </p>
                </div>
              </button>

              {/* 6. 모바일파크 -> SKT 대규모 웹 문자 시스템 프로젝트 */}
              <button
                type="button"
                onClick={() => scrollToTarget('project-enterprise-mpomr')}
                className="group p-4 rounded-xl bg-[var(--bg-muted)]/50 hover:bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition flex flex-col justify-between shadow-2xs hover:shadow-md cursor-pointer text-left w-full"
                title="클릭하여 모바일파크 수행 SKT 엔터프라이즈 프로젝트로 이동"
              >
                <div className="w-full h-20 sm:h-22 rounded-lg bg-white p-2 sm:p-2.5 flex items-center justify-center border border-slate-200 dark:border-slate-700/80 shadow-2xs group-hover:scale-[1.02] transition-transform">
                  <img src="/mobilepark_logo3.png" alt="모바일파크 로고" className="max-h-12 sm:max-h-14 w-auto max-w-[90%] object-contain" />
                </div>
                <div className="mt-3 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-heading)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                      모바일파크 <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded status-badge font-semibold shrink-0">3.9년 운영</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    SKT 핵심 가입자 서비스 및 엔터프라이즈 솔루션 개발·3.9년 장기 운영
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
