import React from 'react';
import { Server, Monitor, Database, Settings } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg sm:text-xl font-black text-[var(--text-heading)]">
            기술 스택 & 실무 경험치
          </h2>
          <span className="text-xs font-mono font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] border border-[var(--accent-border)] hidden sm:inline">
            02 / TECH STACK
          </span>
        </div>
        <span className="text-xs font-mono text-[var(--text-muted)] font-semibold">Backend • Frontend • Database • DevOps</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Backend */}
        <div className="editorial-card p-5 sm:p-6 rounded-3xl hover:border-[var(--accent-border)] transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase mb-3 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>Backend</span>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">Java <span>주력 (Core)</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">객체지향 설계, 멀티스레드, 대용량 트랜잭션</p>
              </li>
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">Spring Boot <span>실무 활용</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">RESTful API, MVC 패턴, 비즈니스 로직</p>
              </li>
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">Node.js <span>서버 환경</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">비동기 이벤트 루프, API 서버 및 풀스택 연동</p>
              </li>
              <li>
                <div className="font-bold text-[var(--text-heading)] flex justify-between">Python / C# <span>에이전트 개발</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">로컬 인쇄 에이전트 및 자동화 스크립트</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Frontend */}
        <div className="editorial-card p-5 sm:p-6 rounded-3xl hover:border-[var(--accent-border)] transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase mb-3 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>Frontend</span>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">React & DevExtreme <span>POP 구축</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">터치 인터페이스, 컴포넌트 모듈화</p>
              </li>
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">TypeScript <span>타입 안정성</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">인터페이스 설계, 정적 타입 검증 및 결함 방어</p>
              </li>
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">Vue.js / jQuery <span>UI 고도화</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">반응형 웹 화면 및 비동기 통신</p>
              </li>
              <li>
                <div className="font-bold text-[var(--text-heading)] flex justify-between">JavaScript / HTML5 <span>웹 표준</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">DOM 조작, Canvas 인터랙션</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Database */}
        <div className="editorial-card p-5 sm:p-6 rounded-3xl hover:border-[var(--accent-border)] transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase mb-3 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>Database</span>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">Oracle DB <span>3.5+년</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">대용량 테이블 인덱스 설계 및 쿼리 튜닝</p>
              </li>
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">MySQL / MariaDB <span>운영</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">RDBMS 스키마 설계 및 무결성 관리</p>
              </li>
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">MongoDB <span>NoSQL</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">Document 모델링, 비정형 데이터 및 로그 저장</p>
              </li>
              <li>
                <div className="font-bold text-[var(--text-heading)] flex justify-between">Local Queue <span>장애 방어</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">SQLite 영속 큐, 네트워크 지연 시 백업</p>
              </li>
            </ul>
          </div>
        </div>

        {/* DevOps & IoT */}
        <div className="editorial-card p-5 sm:p-6 rounded-3xl hover:border-[var(--accent-border)] transition-all duration-200 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase mb-3 flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>DevOps & IoT</span>
            </div>
            <ul className="space-y-2.5 text-xs">
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">Node-RED & IoT <span>센서 파이프라인</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">Zigbee·블루투스(BLE) 무선 센서 데이터 수집 및 연계</p>
              </li>
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">n8n Workflow <span>전사 구축</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">컨테이너 구축 및 업무 파이프라인 자동화</p>
              </li>
              <li className="pb-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-[var(--text-heading)] flex justify-between">Jenkins CI/CD <span>배포 자동화</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">무중단 릴리즈 파이프라인 운영</p>
              </li>
              <li>
                <div className="font-bold text-[var(--text-heading)] flex justify-between">Docker & Linux <span>인프라</span></div>
                <p className="text-[var(--text-muted)] mt-0.5">컨테이너 환경 격리 및 서버 세팅</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
