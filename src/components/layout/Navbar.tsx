import React, { useState, useEffect } from 'react';
import { Moon, Sun, Printer, Mail, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { GithubIcon } from '../common/GithubIcon';

interface NavbarProps {
  currentView: 'main' | 'mes' | 'agent' | 'pop-demo';
  onNavigate: (view: 'main' | 'mes' | 'agent' | 'pop-demo', sectionId?: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenContact }) => {
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false); // scroll down -> hide
      } else {
        setIsVisible(true); // scroll up -> show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 bg-[var(--bg-canvas)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-2xs transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8 h-15 flex items-center justify-between gap-3">
        {/* Brand / Title or Back Button */}
        <div className="flex items-center gap-3">
          {currentView !== 'main' ? (
            <button
              onClick={() => onNavigate('main', currentView === 'pop-demo' ? 'career-glance' : 'projects')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-heading)] hover:text-[var(--accent)] transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>메인 포트폴리오로 돌아가기</span>
            </button>
          ) : (
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => onNavigate('main', 'top')}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <span className="w-7 h-7 rounded accent-btn font-black text-xs flex items-center justify-center shrink-0 shadow-xs transition group-hover:scale-105">
                  JS
                </span>
                <span className="font-bold text-sm tracking-tight text-[var(--text-heading)] whitespace-nowrap">
                  한재선
                </span>
              </button>
              <span className="hidden sm:inline-block text-xs text-[var(--text-muted)] border-l border-[var(--border-subtle)] pl-2.5 whitespace-nowrap">
                풀스택 & 스마트팩토리 엔지니어
              </span>
            </div>
          )}
        </div>

        {/* Navigation Links (Desktop) */}
        {currentView === 'main' && (
          <div className="hidden md:flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <button onClick={() => onNavigate('main', 'career-glance')} className="px-2.5 py-1.5 rounded hover:text-[var(--text-heading)] hover:bg-[var(--bg-muted)] transition">
              Overview
            </button>
            <button onClick={() => onNavigate('main', 'skills')} className="px-2.5 py-1.5 rounded hover:text-[var(--text-heading)] hover:bg-[var(--bg-muted)] transition">
              Skills
            </button>
            <button onClick={() => onNavigate('main', 'projects')} className="px-2.5 py-1.5 rounded hover:text-[var(--text-heading)] hover:bg-[var(--bg-muted)] transition">
              Projects
            </button>
            <button onClick={() => onNavigate('main', 'principles')} className="px-2.5 py-1.5 rounded hover:text-[var(--text-heading)] hover:bg-[var(--bg-muted)] transition">
              Principles
            </button>
            <button onClick={() => onNavigate('main', 'ai-competency')} className="px-2.5 py-1.5 rounded hover:text-[var(--text-heading)] hover:bg-[var(--bg-muted)] transition">
              AI
            </button>
            <button onClick={() => onNavigate('main', 'qa')} className="px-2.5 py-1.5 rounded hover:text-[var(--text-heading)] hover:bg-[var(--bg-muted)] transition">
              Q&A
            </button>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* GitHub Source Code Button */}
          <a
            href="https://github.com/gksjs3468/jaesun-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-muted)] transition"
            title="포트폴리오 소스코드 (GitHub)"
            aria-label="GitHub 저장소 바로가기"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-muted)] transition"
            title="이력서 A4 맞춤 인쇄"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-heading)] hover:bg-[var(--bg-muted)] transition"
            title="다크 모드 / 라이트 모드 전환"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Contact Button */}
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg accent-btn transition shadow-xs whitespace-nowrap shrink-0"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>이메일 문의</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
