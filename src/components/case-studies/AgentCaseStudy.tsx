import React from 'react';
import { ArrowLeft, Terminal } from 'lucide-react';

interface AgentCaseStudyProps {
  onBack: () => void;
}

export const AgentCaseStudy: React.FC<AgentCaseStudyProps> = ({ onBack }) => {
  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <header className="pb-6 border-b border-[var(--border-subtle)]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-heading)] hover:text-[var(--accent)] transition mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>메인 포트폴리오로 돌아가기</span>
        </button>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[11px] accent-pill font-bold">독립 에이전트 & 분산 큐 아키텍처</span>
          <span className="text-xs text-[var(--text-muted)]">에잇핀 / i-MOS V2 AX & 8pin-print-agent (2025.08 ~ 현재 운영 및 추가 개발 중)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-heading)]">
          8pin-print-agent: 로컬 SQLite 큐 기반 인쇄 장애 제로화 아키텍처
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          현장 네트워크 단절 시에도 라벨 인쇄 대기열 유실 원천 방어 및 멀티스레드 자동 재전송 파이프라인
        </p>
      </header>

      {/* Main Content */}
      <main className="py-8 space-y-8">
        {/* Architecture Diagram */}
        <div className="editorial-card p-5 sm:p-6 rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-heading)] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            1. 오프라인 로컬 큐 & 재시도 파이프라인 다이어그램
          </h2>
          <div className="p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] overflow-x-auto text-xs font-mono">
            <div className="space-y-2">
              <div className="text-[var(--text-heading)] font-bold">[현장 태블릿 / MES 웹] ➔ REST 호출 ➔ [8pin-print-agent 로컬 서버]</div>
              <div className="pl-6 border-l-2 border-slate-400 dark:border-slate-600 space-y-1 text-[var(--text-muted)]">
                <div>│ 1. 인쇄 페이로드 수신 (ZPL / 바코드 템플릿)</div>
                <div>│ 2. <span className="accent-text font-bold">Local SQLite DB Queue에 즉각 영속화 (`status: PENDING`)</span></div>
                <div>│ 3. 네트워크 헬스체크 및 프린터 소켓(Raw 9100) 연결 시도</div>
                <div>├── [정상] ➔ 프린터 직접 전송 ➔ <span className="accent-text font-bold">`status: COMPLETED`</span></div>
                <div>└── [통신 끊김] ➔ 백그라운드 Worker 스레드로 이관 ➔ 지수 백오프 기반 무한 재시도 ➔ 통신 복구 즉시 자동 출력</div>
              </div>
            </div>
          </div>
        </div>

        {/* Python Worker Code Review */}
        <div className="editorial-card p-5 sm:p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--border-subtle)]">
            <h2 className="text-base font-bold text-[var(--text-heading)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              2. Python 로컬 큐 워커 구현 코드 (smart_collector / transmitter)
            </h2>
            <span className="text-xs px-2 py-0.5 rounded accent-pill font-bold">Python Multi-Thread</span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 text-slate-200 text-xs">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>agent_transmitter.py</span>
              <span>Python 3.11 / SQLite3 / Socket RAW 9100</span>
            </div>
            <pre className="p-4 overflow-x-auto leading-relaxed font-mono"><code>{`import socket
import sqlite3
import time
import logging
from typing import Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("PrintAgentTransmitter")

class AgentPrintTransmitter:
    def __init__(self, db_path: str = "agent_queue.db", printer_ip: str = "192.168.1.200", printer_port: int = 9100):
        self.db_path = db_path
        self.printer_ip = printer_ip
        self.printer_port = printer_port
        self._init_sqlite_queue()

    def _init_sqlite_queue(self):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS print_jobs (
                    job_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    zpl_payload TEXT NOT NULL,
                    status TEXT DEFAULT 'PENDING',
                    retry_count INTEGER DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

    def enqueue_job(self, zpl_payload: str) -> int:
        """인쇄 명령을 로컬 DB에 선(先) 저장하여 유실 방어"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO print_jobs (zpl_payload) VALUES (?)", (zpl_payload,))
            job_id = cursor.lastrowid
            logger.info(f"[ENQUEUE] 라벨 인쇄 대기열 등록 완료: JobID={job_id}")
            return job_id

    def process_pending_jobs(self):
        """백그라운드 스레드: 미출력 인쇄 작업을 순차 전송"""
        while True:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT job_id, zpl_payload, retry_count FROM print_jobs WHERE status = 'PENDING' ORDER BY job_id ASC LIMIT 1")
                row = cursor.fetchone()

                if not row:
                    time.sleep(1.0)
                    continue

                job_id, payload, retries = row

                # 소켓 직접 통신 시도
                if self._send_to_printer_socket(payload):
                    conn.execute("UPDATE print_jobs SET status = 'COMPLETED' WHERE job_id = ?", (job_id,))
                    logger.info(f"[PRINT-SUCCESS] JobID={job_id} 출력 완료")
                else:
                    backoff = min(60, 2 ** min(retries, 5))
                    conn.execute("UPDATE print_jobs SET retry_count = retry_count + 1 WHERE job_id = ?", (job_id,))
                    logger.warning(f"[PRINT-RETRY] JobID={job_id} 프린터 통신 실패. {backoff}초 후 재시도...")
                    time.sleep(backoff)

    def _send_to_printer_socket(self, payload: str) -> bool:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                sock.settimeout(3.0)
                sock.connect((self.printer_ip, self.printer_port))
                sock.sendall(payload.encode('utf-8'))
                return True
        except Exception as e:
            logger.error(f"[SOCKET-ERROR] 프린터 연결 실패: {e}")
            return False`}</code></pre>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] text-xs text-[var(--text-body)]">
          <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">💡 엔지니어 코멘트</span>
          공장 설비실의 Wi-Fi 신호 간섭이나 프린터 전원 리셋 상황에서도, 현장 작업자가 출력 버튼을 누르고 안심하고 다음 공정으로 이동할 수 있도록{' '}
          인메모리 전송 방식 대신 <strong>로컬 SQLite 영속 큐 기반의 전달 보장(At-least-once delivery)</strong> 아키텍처를 구축했습니다.
        </div>
      </main>
    </div>
  );
};
