import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle2, Cpu, Database, Printer, RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface LineStatus {
  id: string;
  name: string;
  role: string;
  status: 'RUNNING' | 'BUFFERED' | 'STANDBY';
  temp: number;
  rpm: number;
  progress: number;
}

export const FactorySimulator: React.FC = () => {
  const [isNetworkOffline, setIsNetworkOffline] = useState(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState(0);
  const [oee, setOee] = useState(98.7);
  const [logs, setLogs] = useState<Array<{ id: number; time: string; text: string; type: 'info' | 'warn' | 'success' }>>([
    { id: 1, time: '08:00:12', text: 'MES State Machine 초기화 완료. Tank A-03 매핑 정상', type: 'info' },
    { id: 2, time: '08:02:45', text: '조제 2라인 원료 인터록 검증 Pass. 배치 투입 개시', type: 'success' },
  ]);

  const [lines, setLines] = useState<LineStatus[]>([
    { id: 'L1', name: 'Line 1: 원료 분산/교반', role: '고점도 도료 믹싱', status: 'RUNNING', temp: 42.1, rpm: 1250, progress: 68 },
    { id: 'L2', name: 'Line 2: 반제품 반응조', role: 'Tank Mapping 자동화', status: 'RUNNING', temp: 65.4, rpm: 840, progress: 84 },
    { id: 'L3', name: 'Line 3: 자동 충진/포장', role: 'PLC 터치 POP 연동', status: 'RUNNING', temp: 24.2, rpm: 0, progress: 42 },
    { id: 'L4', name: 'Agent: 8pin-print-agent', role: 'ZPL 바코드 라벨 인쇄', status: 'RUNNING', temp: 31.0, rpm: 0, progress: 91 },
  ]);

  // 실시간 계측값 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prev => prev.map(line => {
        const deltaTemp = (Math.random() - 0.5) * 0.4;
        const deltaRpm = line.rpm > 0 ? (Math.random() - 0.5) * 20 : 0;
        let newProgress = line.progress + 1;
        if (newProgress > 100) newProgress = 10;

        let status = line.status;
        if (line.id === 'L4') {
          status = isNetworkOffline ? 'BUFFERED' : 'RUNNING';
        }

        return {
          ...line,
          status,
          temp: +(line.temp + deltaTemp).toFixed(1),
          rpm: Math.round(line.rpm + deltaRpm),
          progress: newProgress,
        };
      }));

      // 네트워크 오프라인 시 큐 적재 증가
      if (isNetworkOffline) {
        setOfflineQueueCount(c => c + 1);
        setOee(prev => +(Math.max(92.0, prev - 0.1)).toFixed(1));
      } else {
        setOee(prev => +(Math.min(99.2, prev + 0.05)).toFixed(1));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isNetworkOffline]);

  // 에이전트 장애 주입 테스트 토글
  const toggleNetworkFault = () => {
    const nextState = !isNetworkOffline;
    setIsNetworkOffline(nextState);

    const now = new Date().toTimeString().split(' ')[0];
    if (nextState) {
      setLogs(prev => [
        { id: Date.now(), time: now, text: '⚠️ [장애 시뮬레이션] 상위 ERP/MES 네트워크 링크 일시 단절 감지!', type: 'warn' },
        { id: Date.now() + 1, time: now, text: '📦 8pin-print-agent: SQLite 로컬 FIFO 큐 적재 모드로 무중단 자동 전환', type: 'info' },
        ...prev.slice(0, 4)
      ]);
    } else {
      const flushed = offlineQueueCount;
      setOfflineQueueCount(0);
      setLogs(prev => [
        { id: Date.now(), time: now, text: `✅ 네트워크 연결 복구 완료! 로컬 버퍼 ${flushed}건 비동기 플러시 성공`, type: 'success' },
        ...prev.slice(0, 4)
      ]);
    }
  };

  return (
    <div className="editorial-card p-5 sm:p-6 rounded-2xl border border-[var(--border-subtle)] my-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-[var(--text-heading)]">
                스마트팩토리 실시간 MES 파이프라인 시뮬레이터
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                LIVE
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              조광페인트 MES 및 8pin-print-agent의 실시간 가동 로직을 웹 인터랙션으로 재현한 라이브 데모입니다.
            </p>
          </div>
        </div>

        {/* 장애 주입 인터랙션 버튼 */}
        <button
          onClick={toggleNetworkFault}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition inline-flex items-center gap-1.5 shadow-xs shrink-0 ${
            isNetworkOffline
              ? 'bg-rose-500 hover:bg-rose-600 text-white'
              : 'border border-[var(--border-subtle)] hover:border-[var(--accent)] text-[var(--text-heading)] bg-[var(--bg-card)]'
          }`}
          title="네트워크 단절 시 로컬 큐 안전 적재 로직을 테스트합니다"
        >
          {isNetworkOffline ? (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span>네트워크 복구하기</span>
            </>
          ) : (
            <>
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
              <span>네트워크 단절 테스트 (클릭)</span>
            </>
          )}
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="p-3 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
          <div className="text-[11px] text-[var(--text-muted)] flex items-center justify-between">
            <span>설비 가동률 (OEE)</span>
            <Activity className="w-3 h-3 text-[var(--accent)]" />
          </div>
          <div className="text-lg font-bold text-[var(--text-heading)] mt-1 font-mono">
            {oee}%
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
          <div className="text-[11px] text-[var(--text-muted)] flex items-center justify-between">
            <span>탱크 매핑 상태</span>
            <Database className="w-3 h-3 text-emerald-500" />
          </div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>정상 (Tank A/B/C)</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
          <div className="text-[11px] text-[var(--text-muted)] flex items-center justify-between">
            <span>Agent 인쇄 큐</span>
            <Printer className="w-3 h-3 text-[var(--accent)]" />
          </div>
          <div className="text-sm font-bold text-[var(--text-heading)] mt-1 font-mono flex items-center gap-1">
            {isNetworkOffline ? (
              <span className="text-amber-500 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {offlineQueueCount}건 버퍼링 중
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400">0건 (대기 없음)</span>
            )}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
          <div className="text-[11px] text-[var(--text-muted)] flex items-center justify-between">
            <span>통신 안정성</span>
            <Cpu className="w-3 h-3 text-[var(--accent)]" />
          </div>
          <div className="text-sm font-bold mt-1">
            {isNetworkOffline ? (
              <span className="text-rose-500">오프라인 격리 모드</span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400">100% 무손실 동기화</span>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Line Monitoring Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {lines.map((line) => (
          <motion.div
            key={line.id}
            layout
            className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent)] transition"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-xs font-bold text-[var(--text-heading)]">{line.name}</span>
                <span className="text-[11px] text-[var(--text-muted)] block">{line.role}</span>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                  line.status === 'RUNNING'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}
              >
                {line.status}
              </span>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)] mb-2">
              <span>Temp: <strong className="text-[var(--text-heading)]">{line.temp}°C</strong></span>
              {line.rpm > 0 && <span>Speed: <strong className="text-[var(--text-heading)]">{line.rpm} RPM</strong></span>}
              <span>Progress: <strong className="text-[var(--text-heading)]">{line.progress}%</strong></span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-[var(--bg-muted)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-500 ease-out"
                style={{ width: `${line.progress}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Terminal-like Live Event Logs */}
      <div className="p-3 rounded-xl bg-[var(--code-bg)] text-[var(--code-text)] font-mono text-[11px]">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/60 text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            MES EVENT AUDIT LOG
          </span>
          <span className="text-[10px]">Real-time Event Stream</span>
        </div>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 leading-relaxed">
              <span className="text-slate-500 shrink-0">[{log.time}]</span>
              <span className={log.type === 'warn' ? 'text-amber-400' : log.type === 'success' ? 'text-emerald-400' : 'text-slate-200'}>
                {log.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
