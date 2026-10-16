import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Pause, Play } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'system' | 'cmd' | 'header' | 'bullet' | 'success';
  text: string;
}

interface TopicQueueItem {
  type: 'cmd' | 'header' | 'bullet' | 'success';
  fullText: string;
}

export const LiveDeveloperTerminal: React.FC = () => {
  const [completedLines, setCompletedLines] = useState<TerminalLine[]>([]);
  const [currentTyping, setCurrentTyping] = useState<{
    type: 'cmd' | 'header' | 'bullet' | 'success';
    text: string;
  } | null>(null);

  const [inputVal, setInputVal] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [topicIndex, setTopicIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const isHoveredRef = useRef(false);
  const autoIndexRef = useRef(0);
  const isUserModeRef = useRef(false);

  // Single source of truth for all timers to prevent ANY race condition
  const timersRef = useRef<{
    charTimer: ReturnType<typeof setInterval> | null;
    stepTimer: ReturnType<typeof setTimeout> | null;
    waitTimer: ReturnType<typeof setTimeout> | null;
  }>({
    charTimer: null,
    stepTimer: null,
    waitTimer: null,
  });

  const clearAllTimers = () => {
    if (timersRef.current.charTimer) clearInterval(timersRef.current.charTimer);
    if (timersRef.current.stepTimer) clearTimeout(timersRef.current.stepTimer);
    if (timersRef.current.waitTimer) clearTimeout(timersRef.current.waitTimer);
    timersRef.current.charTimer = null;
    timersRef.current.stepTimer = null;
    timersRef.current.waitTimer = null;
  };

  // Fixed Topics
  const topics = [
    {
      cmd: 'python3 inspect_career.py --domain=MES',
      header: '🏭 [화학공정 MES] 조광페인트 생산 파트 구축 (데이터 무결성 100%)',
      bullets: [
        '현장 설비 통신 인터페이스(PLC) 응답 시간 12ms 달성',
        '원료 반응기 Tank Mapping & 현장 터치 POP 단말기 설계',
        '설비 통신 단절 시 세이프가드: 자동 롤백으로 데이터 유실 0건 원천 방어',
      ],
      result: '생산 실적 데이터 무결성 100% 달성 (Zero Data Loss)',
    },
    {
      cmd: 'query_reason --question="why_hire"',
      header: '🎯 [채용 Q&A] "내가 한재선을 왜 뽑아야 하죠?"',
      bullets: [
        '01. 밤에 발 뻗고 주무실 수 있습니다 (화학공정 100% 무결성 정신으로 배포 후 주말 비상호출 Zero)',
        '02. 혼자 뛰지 않고 팀의 병목을 풉니다 (중국·터키 타향살이 2년+와 서번트 리더십으로 궂은일 솔선수범)',
        '03. 개발자 1명 뽑았는데 전사 자동화가 덤 (n8n과 LLM을 실무에 녹여 팀 생산성 3배 가속)',
      ],
      result: '채용 후 후회 확률: 0.00% (버그 없는 든든한 입사 보장)',
    },
    {
      cmd: 'python3 inspect_career.py --domain=SKT_TRAFFIC',
      header: '📱 [대규모 트래픽] SKT 웹 문자(MPOMR) & COMMA 메신저 장기 운영',
      bullets: [
        'T-world 대량 발송 큐 실시간 모니터링 (TPS 2,400건, 지연 0건)',
        'COMMA 사내 메신저 WebSocket 동시 접속 8,420건 실시간 안정 유지',
        '대용량 Oracle DB 쿼리 튜닝: Index Range Scan 적용 (실행 1.8ms)',
      ],
      result: '상용 서비스 3.9년 (1,424일) 무중단 장기 운영 달성',
    },
    {
      cmd: 'query_reason --question="weakness"',
      header: '🛠️ [솔직 Q&A] "한재선의 치명적인 단점은 무엇인가요?"',
      bullets: [
        '"대충 돌아가게만 만들고 치우는 것"을 병적으로 못 견딥니다.',
        '동료가 내 코드를 고치며 고통받지 않도록 사이드 이펙트 없는 구조에 집착하는 직업병이 있습니다.',
        '극복법: "일단 빠르게 작동하는 MVP를 먼저 만들고 안전하게 리팩토링하기"로 팀 속도와 균형 조율',
      ],
      result: '동료에게 기술 부채를 떠넘기지 않는 건강한 책임감',
    },
    {
      cmd: 'python3 inspect_career.py --domain=AI_OPS',
      header: '🤖 [AI 전사 자동화] 사내 n8n AI 업무 자동화 파이프라인 전사 구축',
      bullets: [
        '전사 n8n 파이프라인: LLM 연동 주간 실적 리포트 생성 및 슬랙 자동 발송',
        'Claude & Gemini AI 페어 프로그래밍으로 개발 생산성 3배 가속',
        '백엔드 자동화 워크플로우 무결점 안정 운영 (Zero-Fail)',
      ],
      result: '업무 자동화 혁신: 주 10시간 이상 반복 수작업 절감',
    },
    {
      cmd: 'query_profile --candidate=han_jaesun',
      header: '👤 [엔지니어 프로필] 한재선 (Full-Stack & Systems Engineer)',
      bullets: [
        '총 실무 경력 6+년 (2019.09 ~ 현재 실무 개발 및 장기 운영 중)',
        '중국·터키 각 1년+ 체류 경험으로 체득한 낯선 환경에 대한 빠른 적응력',
        '솔선수범하여 동료의 병목을 돕는 서번트 리더십과 열린 소통 태도',
      ],
      result: '부작용 없는 안전한 시스템 개발 및 운영 • 실무 즉시 투입 적합',
    },
  ];

  // Run a queue of items sequentially
  const runQueue = (items: TopicQueueItem[], onFinish?: () => void) => {
    clearAllTimers();
    setCompletedLines([]);
    setCurrentTyping(null);

    let queue = [...items];

    const next = () => {
      if (queue.length === 0) {
        setCurrentTyping(null);
        if (onFinish) onFinish();
        return;
      }

      const item = queue.shift()!;
      let charIdx = 0;
      const speed = item.type === 'cmd' ? 14 : 9;

      timersRef.current.charTimer = setInterval(() => {
        charIdx += 2;
        if (charIdx >= item.fullText.length) {
          if (timersRef.current.charTimer) clearInterval(timersRef.current.charTimer);
          timersRef.current.charTimer = null;
          setCurrentTyping(null);
          setCompletedLines(prev => [
            ...prev,
            { id: `line-${Date.now()}-${Math.random()}`, type: item.type, text: item.fullText },
          ]);

          timersRef.current.stepTimer = setTimeout(next, 70);
        } else {
          setCurrentTyping({
            type: item.type,
            text: item.fullText.slice(0, charIdx),
          });
        }
      }, speed);
    };

    next();
  };

  // Schedule next topic after 5 seconds reading delay
  const scheduleNextTopic = useCallback(() => {
    if (timersRef.current.waitTimer) clearTimeout(timersRef.current.waitTimer);

    const checkAndAdvance = () => {
      // If user is hovering or typing, keep waiting
      if (isHoveredRef.current || isUserModeRef.current) {
        timersRef.current.waitTimer = setTimeout(checkAndAdvance, 1000);
        return;
      }
      autoIndexRef.current++;
      playTopic(autoIndexRef.current);
    };

    timersRef.current.waitTimer = setTimeout(checkAndAdvance, 7000);
  }, []);

  // Play a specific topic by index
  const playTopic = useCallback((index: number) => {
    const topic = topics[index % topics.length];
    setTopicIndex(index % topics.length);

    const queue: TopicQueueItem[] = [
      { type: 'cmd', fullText: `jaesun@core:~$ ${topic.cmd}` },
      { type: 'header', fullText: topic.header },
      ...topic.bullets.map(b => ({ type: 'bullet' as const, fullText: `  › ${b}` })),
      { type: 'success', fullText: `  ✔ [RESULT] ${topic.result}` },
    ];

    runQueue(queue, () => {
      scheduleNextTopic();
    });
  }, [scheduleNextTopic, topics]);

  // Start immediately on mount
  useEffect(() => {
    autoIndexRef.current = 0;
    playTopic(0);

    return () => {
      clearAllTimers();
    };
  }, []);

  // Hover handlers: When hovered, freeze auto-advance!
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsPaused(false);
  };

  // Execute User Query
  const handleExecute = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    isUserModeRef.current = true;
    clearAllTimers();

    if (cmd === 'clear' || cmd === 'cls') {
      setCompletedLines([]);
      setCurrentTyping(null);
      setInputVal('');
      timersRef.current.waitTimer = setTimeout(() => {
        isUserModeRef.current = false;
        autoIndexRef.current++;
        playTopic(autoIndexRef.current);
      }, 2500);
      return;
    }

    let header = '';
    let bullets: string[] = [];
    let result = '';

    if (cmd.includes('왜') || cmd.includes('뽑') || cmd.includes('why') || cmd.includes('hire') || cmd.includes('채용') || cmd.includes('이유')) {
      header = '🎯 [채용 Q&A] "내가 한재선을 왜 뽑아야 하죠?"';
      bullets = [
        '01. 밤에 발 뻗고 주무실 수 있습니다 (화학공정 100% 무결성 정신으로 배포 후 주말 전화 갈 일 없는 안전한 시스템)',
        '02. 혼자 뛰지 않고 팀의 병목을 풉니다 (중국·터키 타향살이 2년+와 리더십으로 다진 친화력으로 동료의 궂은일 솔선수범)',
        '03. 개발자 1명 뽑았는데 전사 자동화가 덤 (n8n과 LLM을 실무에 녹여내어 단순 반복 업무를 제거하고 생산성 3배 가속)',
      ];
      result = '채용 후 후회 확률: 0.00% (버그 없는 든든한 입사 보장)';
    } else if (cmd.includes('단점') || cmd.includes('약점') || cmd.includes('weakness')) {
      header = '🛠️ [솔직 Q&A] "한재선의 치명적인 단점은 무엇인가요?"';
      bullets = [
        '"대충 돌아가게만 만들고 치우는 것"을 병적으로 못 견딥니다.',
        '나중에 동료가 내 코드를 고치면서 고통받지 않도록, 사이드 이펙트 없는 안전한 구조에 집착하는 직업병이 있습니다.',
        '극복법: "일단 빠르게 작동하는 MVP를 먼저 만들고 안전하게 리팩토링하기"로 팀 속도와 완성도의 균형을 맞춥니다.',
      ];
      result = '동료에게 기술 부채를 떠넘기지 않는 건강한 책임감';
    } else if (cmd.includes('성격') || cmd.includes('팀워크') || cmd.includes('동료') || cmd.includes('같이') || cmd.includes('personality') || cmd.includes('together')) {
      header = '💬 [동료 리뷰] "실제로 같이 일하면 어떤 사람인가요?"';
      bullets = [
        '"코드 앞에서는 집요하고 꼼꼼하지만, 사람 앞에서는 허허실실 편안한 동료"',
        '동료가 트러블슈팅으로 끙끙 앓고 있을 때, 커피 한 잔 건네며 "제가 같이 볼까요?" 하고 다가가는 서번트 리더입니다.',
        '비난보다는 해결책을, 내 고집보다는 비즈니스 가치를 먼저 생각합니다.',
      ];
      result = '월요일 아침에 마주쳐도 기분 좋은 편안하고 든든한 팀원';
    } else if (cmd.includes('야근') || cmd.includes('overtime') || cmd.includes('워라밸')) {
      header = '🌙 [업무 가치관] "야근에 대해 어떻게 생각하시나요?"';
      bullets = [
        '배포 때마다 주말 출근하는 "가짜 부지런함"을 극도로 경계합니다.',
        '평소에 철저한 테스트 자동화, CI/CD, 코드 무결성을 닦아두어 주 40시간 정시 퇴근하는 시스템을 지향합니다.',
        '하지만 전사 장애나 핵심 프로젝트 론칭 같은 결정적 순간에는 가장 늦게까지 남아 끝장을 봅니다.',
      ];
      result = '비효율적인 야근 대신 구조적 자동화로 증명하는 퍼포먼스';
    } else if (cmd.includes('mes') || cmd.includes('제조') || cmd.includes('생산') || cmd.includes('화학')) {
      header = '🏭 [핵심 경력] 조광페인트 화학공정 MES 생산 파트 구축';
      bullets = [
        '현장 설비 통신 인터페이스(PLC) 응답 시간 12ms 달성',
        '원료 반응기 Tank Mapping & 현장 터치 POP 단말기 설계',
        '설비 통신 단절 시 세이프가드: 자동 롤백으로 데이터 유실 0건 원천 방어',
      ];
      result = '생산 실적 데이터 무결성 100% 달성 (Zero Data Loss)';
    } else if (cmd.includes('skt') || cmd.includes('트래픽') || cmd.includes('문자') || cmd.includes('comma')) {
      header = '📱 [대규모 트래픽] SKT 웹 문자 & COMMA 메신저 장기 운영';
      bullets = [
        'T-world 대량 발송 큐 실시간 모니터링 (TPS 2,400건, 지연 0건)',
        'COMMA 사내 메신저 WebSocket 동시 접속 8,420건 실시간 안정 유지',
        '대용량 Oracle DB 쿼리 튜닝: Index Range Scan 적용 (실행 1.8ms)',
      ];
      result = '상용 서비스 3.9년 (1,424일) 무중단 장기 운영 달성';
    } else if (cmd.includes('ai') || cmd.includes('n8n') || cmd.includes('자동화')) {
      header = '🤖 [AI 업무 자동화] 사내 n8n AI 업무 자동화 파이프라인 전사 구축';
      bullets = [
        '전사 n8n 파이프라인: LLM 연동 주간 실적 리포트 생성 및 슬랙 자동 발송',
        'Claude & Gemini AI 페어 프로그래밍으로 개발 생산성 3배 가속',
        '백엔드 자동화 워크플로우 무결점 안정 운영 (Zero-Fail)',
      ];
      result = '업무 자동화 혁신: 주 10시간 이상 반복 수작업 절감';
    } else {
      header = `❓ [질문 응답: "${cmd}"]`;
      bullets = [
        '추천 질문 키워드: "왜 뽑아야 하지?", "단점", "같이 일하면?", "야근", "mes", "skt", "ai"',
        '위쪽 빠른 질문 칩을 클릭하시면 바로 확인하실 수 있습니다.',
      ];
      result = '원하는 질문을 클릭하거나 직접 입력해 보세요.';
    }

    setInputVal('');

    const userQueue: TopicQueueItem[] = [
      { type: 'cmd', fullText: `jaesun@core:~$ query --prompt="${rawCmd}"` },
      { type: 'header', fullText: header },
      ...bullets.map(b => ({ type: 'bullet' as const, fullText: `  › ${b}` })),
      { type: 'success', fullText: `  ✔ [RESULT] ${result}` },
    ];

    runQueue(userQueue, () => {
      timersRef.current.waitTimer = setTimeout(() => {
        isUserModeRef.current = false;
        autoIndexRef.current++;
        playTopic(autoIndexRef.current);
      }, 7500);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecute(inputVal);
    }
  };

  const quickButtons = [
    { cmd: '왜 뽑아야 하지?', label: '🎯 왜 뽑아야 하죠?' },
    { cmd: '치명적 단점', label: '🛠️ 치명적 단점?' },
    { cmd: '같이 일하면 어때?', label: '💬 같이 일하면?' },
    { cmd: '야근 생각', label: '🌙 야근에 대해' },
    { cmd: 'mes', label: '🏭 MES 100%' },
    { cmd: 'skt', label: '📱 SKT 3.9년' },
    { cmd: 'ai', label: '🤖 n8n AI' },
  ];

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => inputRef.current?.focus()}
      className="w-full flex flex-col rounded-xl overflow-hidden border border-slate-700/80 dark:border-slate-800 shadow-xl bg-[#0b0f19] text-slate-200 select-none cursor-text transition-all"
    >
      {/* 1. Fixed Terminal Title Bar */}
      <div className="bg-[#131b2c] border-b border-slate-800 px-3.5 py-1.5 flex flex-wrap items-center justify-between gap-2 shrink-0 h-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-xs" />
          <span className="ml-1.5 text-[11px] font-mono text-slate-300 font-semibold tracking-tight flex items-center gap-1.5">
            bash: jaesun@core:~/career
            <span className="text-[10px] text-slate-500 font-normal">
              ({topicIndex + 1}/{topics.length})
            </span>
          </span>
          {isPaused ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
              <Pause className="w-2.5 h-2.5" />
              PAUSED
            </span>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Play className="w-2 h-2 fill-current" />
              LIVE
            </span>
          )}
        </div>

        {/* Quick Clickable Buttons */}
        <div className="flex items-center gap-1 text-[10px] font-mono flex-wrap">
          <span className="text-slate-500 mr-0.5 hidden sm:inline-block">질문:</span>
          {quickButtons.map(btn => (
            <button
              key={btn.cmd}
              onClick={e => {
                e.stopPropagation();
                handleExecute(btn.cmd);
              }}
              className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 hover:text-white hover:bg-[var(--accent)] border border-slate-700/60 cursor-pointer transition font-mono whitespace-nowrap active:scale-95"
              title={`'${btn.cmd}' 질문하기`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. STRICT FIXED HEIGHT Output Body: Increased to fit all 6 lines cleanly */}
      <div className="px-3.5 py-2.5 font-mono text-[11px] sm:text-[12px] leading-relaxed bg-[#0b0f19] h-[192px] sm:h-[180px] overflow-y-auto flex flex-col justify-start">
        <div className="space-y-1 font-mono text-[11px] sm:text-xs">
          {completedLines.map(line => {
            if (line.type === 'cmd') {
              return (
                <div key={line.id} className="text-emerald-400 font-bold flex items-baseline gap-1.5">
                  <span className="text-slate-500 shrink-0 select-none">jaesun@core:~$</span>
                  <span className="text-amber-300">{line.text.replace('jaesun@core:~$ ', '')}</span>
                </div>
              );
            }
            if (line.type === 'header') {
              return (
                <div key={line.id} className="text-white font-bold tracking-tight bg-slate-800/60 px-2 py-0.5 rounded text-[11px] sm:text-xs border-l-2 border-[var(--accent)]">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'bullet') {
              return (
                <div key={line.id} className="text-slate-300 pl-1.5 leading-snug">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.id} className="text-emerald-300 font-semibold pl-2 bg-emerald-950/25 border-l-2 border-emerald-500 py-0.5 rounded-r">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-slate-400 pl-1 text-[10px] sm:text-[11px]">
                {line.text}
              </div>
            );
          })}

          {/* Currently Typing Line with Cursor */}
          {currentTyping && (
            <div className="flex items-baseline gap-1 font-bold">
              {currentTyping.type === 'cmd' ? (
                <span className="text-amber-300">
                  <span className="text-slate-500 font-normal select-none">jaesun@core:~$ </span>
                  {currentTyping.text.replace('jaesun@core:~$ ', '')}
                </span>
              ) : currentTyping.type === 'header' ? (
                <span className="text-white bg-slate-800/60 px-2 py-0.5 rounded border-l-2 border-[var(--accent)]">
                  {currentTyping.text}
                </span>
              ) : currentTyping.type === 'success' ? (
                <span className="text-emerald-300 pl-2 bg-emerald-950/25 border-l-2 border-emerald-500 py-0.5 rounded-r">
                  {currentTyping.text}
                </span>
              ) : (
                <span className="text-slate-300 pl-1.5 font-normal">
                  {currentTyping.text}
                </span>
              )}
              <span className="inline-block w-1.5 h-3 bg-emerald-400 ml-0.5 animate-pulse align-middle shrink-0" />
            </div>
          )}
        </div>
      </div>

      {/* 3. STRICT FIXED Bottom Interactive Prompt */}
      <div className="px-3.5 py-1.5 border-t border-slate-800/80 bg-[#0e1424] flex items-center gap-2 text-xs shrink-0 h-9">
        <span className="text-emerald-400 font-bold select-none shrink-0 text-[11px] sm:text-xs">
          jaesun@core:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="궁금한 질문을 직접 입력해 보세요 (예: 왜 뽑아야 하지?, 단점, mes, skt, 야근)"
          className="flex-1 bg-transparent border-none outline-hidden text-amber-200 placeholder:text-slate-500 font-mono text-[11px] sm:text-xs"
        />
        <button
          onClick={() => handleExecute(inputVal)}
          className="px-2 py-0.5 rounded bg-[var(--accent)] hover:opacity-90 text-white font-mono text-[10px] shrink-0 cursor-pointer font-semibold shadow-xs"
        >
          실행
        </button>
      </div>
    </div>
  );
};
