import React from 'react';

// Anthropic Claude 공식 클러스터 스파크 로고 SVG (테라코타 오렌지)
export const ClaudeLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M13.5 3.5l1.6 3.8 3.9 1.4-3.9 1.4-1.6 3.9-1.6-3.9-3.9-1.4 3.9-1.4 1.6-3.8z"
      fill="#D97706"
    />
    <path
      d="M6.5 13.5l1.1 2.5 2.6 1-2.6 1-1.1 2.5-1.1-2.5-2.5-1 2.5-1 1.1-2.5z"
      fill="#F59E0B"
    />
    <circle cx="17.5" cy="17.5" r="2" fill="#D97706" />
  </svg>
);

// OpenAI 공식 소용돌이 로고 SVG
export const OpenAILogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 8.937a4.485 4.485 0 0 1 2.366-1.973V12.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 8.937zm16.597 3.855l-5.833-3.387L15.119 8.24a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 10.27V7.934a.08.08 0 0 1 .033-.061l4.84-2.796a4.5 4.5 0 0 1 6.67 4.043v.003l-.002-.26zM12 14.083l-2.783-1.608 2.783-1.608 2.783 1.608L12 14.083z" />
  </svg>
);

// Google Gemini 공식 4각 블루-퍼플 스파크 로고 SVG
export const GeminiLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1B72E8" />
        <stop offset="50%" stopColor="#8AB4F8" />
        <stop offset="100%" stopColor="#C58AF9" />
      </linearGradient>
    </defs>
    <path
      d="M12 2C12 7.523 7.523 12 2 12C7.523 12 12 16.477 12 22C12 16.477 16.477 12 22 12C16.477 12 12 7.523 12 2Z"
      fill="url(#gemini-grad)"
    />
  </svg>
);

// n8n 공식 자동화 워크플로우 로고 SVG
export const N8nLogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-5 3a5 5 0 1 1 9.9 1H15a3 3 0 1 1 0 6h-2.1a5 5 0 1 1-9.8-2H5a3 3 0 0 0 0-6h4.9A5.002 5.002 0 0 1 0 9zm18 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
      fill="#EA4B71"
    />
  </svg>
);
