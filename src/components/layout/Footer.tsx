import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon } from '../common/GithubIcon';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] py-10 px-4 sm:px-6 transition-colors">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded accent-btn font-black text-[10px] flex items-center justify-center shrink-0 shadow-2xs">
              JS
            </span>
            <h4 className="font-bold text-sm text-[var(--text-heading)]">한재선 (HAN JAE-SUN)</h4>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Full-Stack & Smart Factory Systems Developer | Building robust, mission-critical manufacturing platforms.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/gksjs3468/jaesun-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-xs text-[var(--text-body)] transition flex items-center gap-1.5 whitespace-nowrap bg-[var(--bg-card)] hover:text-[var(--text-heading)]"
            title="GitHub 소스코드 저장소"
          >
            <GithubIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>GitHub</span>
          </a>
          <button
            onClick={scrollToTop}
            className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-xs text-[var(--text-body)] transition flex items-center gap-1.5 whitespace-nowrap bg-[var(--bg-card)]"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>맨 위로</span>
          </button>
          <button
            onClick={onOpenContact}
            className="px-3.5 py-1.5 rounded-lg accent-btn text-xs font-semibold transition shadow-xs flex items-center gap-1.5 whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>이메일 문의</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-6 pt-5 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] text-center">
        &copy; {new Date().getFullYear()} HAN JAE-SUN. All rights reserved. Powered by React, Vite, Tailwind & Framer Motion.
      </div>
    </footer>
  );
};
