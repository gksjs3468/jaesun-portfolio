import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Info,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertTriangle,
  Play,
  Check,
  RotateCcw,
  Barcode,
  Scale,
  FileText,
  Clock,
  User,
  Users,
  Settings,
  Sparkles,
  Layers,
  Thermometer,
  Gauge,
  Activity,
  History,
  Droplet,
  MessageSquare,
  ClipboardCheck,
  ChevronRight,
  TrendingUp,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PopTabletDemoProps {
  onBack: () => void;
}

// 4대 메인 공정 단계
type ProcessStepKey = '1_PREP' | '2_DISP' | '3_REACT' | '4_PACK';

interface ProcessStepInfo {
  key: ProcessStepKey;
  label: string;
  opName: string;
  status: 'End' | 'InProgress' | 'Wait';
}

// 생산 파트 6대 액티비티 서브스텝
type SubStepKey = 
  | 'preparation' 
  | 'materialInput' 
  | 'equipmentStart' 
  | 'equipmentComplete' 
  | 'inspection' 
  | 'workComplete';

interface SubStepInfo {
  key: SubStepKey;
  label: string;
  status: 'End' | 'Start' | 'Wait';
  desc: string;
}

export const PopTabletDemo: React.FC<PopTabletDemoProps> = ({ onBack }) => {
  // 전체화면 토글 상태
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 상단 공정 단계 목록
  const [processSteps, setProcessSteps] = useState<ProcessStepInfo[]>([
    { key: '1_PREP', label: '1_조제 (배합)', opName: '9_B1', status: 'End' },
    { key: '2_DISP', label: '2_분산 (교반)', opName: '9_B2', status: 'InProgress' },
    { key: '3_REACT', label: '3_반응 (조정)', opName: '9_B3', status: 'Wait' },
    { key: '4_PACK', label: '4_포장 (출하)', opName: '9_P7', status: 'Wait' },
  ]);
  const [selectedProcessStep, setSelectedProcessStep] = useState<ProcessStepKey>('2_DISP');

  // 생산 파트 6대 액티비티 서브스텝 목록
  const [subSteps, setSubSteps] = useState<SubStepInfo[]>([
    { key: 'preparation', label: '공정 준비', status: 'End', desc: '설비 매핑 및 작업자 지정' },
    { key: 'materialInput', label: '자재 투입', status: 'End', desc: '바코드 스캔 및 원료 투입' },
    { key: 'equipmentStart', label: '설비 시작', status: 'Start', desc: '디스퍼 교반기 PLC 구동' },
    { key: 'equipmentComplete', label: '설비 완료', status: 'Wait', desc: '교반 정지 및 실적 집계' },
    { key: 'inspection', label: '중간 검사', status: 'Wait', desc: '점도/비중/색차 시험' },
    { key: 'workComplete', label: '작업 완료', status: 'Wait', desc: '실적 등록 및 공정 마감' },
  ]);
  const [currentSubStep, setCurrentSubStep] = useState<SubStepKey>('equipmentStart');

  // 모달 상태 관리
  const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isWorkerGroupModalOpen, setIsWorkerGroupModalOpen] = useState(false);
  const [isSopModalOpen, setIsSopModalOpen] = useState(false);
  const [isInspectionResultModalOpen, setIsInspectionResultModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [isSolventModalOpen, setIsSolventModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // [Step 1: 공정 준비 데이터]
  const [prepStartTime, setPrepStartTime] = useState('2026-10-16 08:15:20');
  const [prepEndTime, setPrepEndTime] = useState('2026-10-16 08:24:45');
  const [selectedEquipGroup, setSelectedEquipGroup] = useState('T01-고속교반조군');
  const [selectedEquipment, setSelectedEquipment] = useState('DISPER-01 (고속 디스퍼 교반기 2500L)');
  const [carrierBarcode, setCarrierBarcode] = useState('');
  const [carrierList, setCarrierList] = useState([
    { id: 1, carrierCode: 'CR-TANK-01', type: '고정형 교반탱크', capacity: '2,500 L', status: '매핑 완료 (적합)', cleanDate: '2026-10-16 07:30' },
    { id: 2, carrierCode: 'DRUM-IN-04', type: '이동식 서브드럼', capacity: '500 L', status: '대기 (Cleaned)', cleanDate: '2026-10-16 07:45' },
  ]);
  const [workerList, setWorkerList] = useState([
    { id: 1, empNo: 'EMP-202104', name: '김재선 (정/책임)', dept: '화학생산1팀', role: '주작업자 (Leader)', status: '작업중' },
    { id: 2, empNo: 'EMP-202319', name: '박민우 (부/선임)', dept: '화학생산1팀', role: '보조작업자', status: '작업중' },
  ]);

  // [Step 2: 자재 투입 데이터]
  const [materialScanInput, setMaterialScanInput] = useState('');
  const [materialList, setMaterialList] = useState([
    { id: 'RM-RESIN-EP01', name: '속건 에폭시 수지액 (Base Resin)', target: 850.0, input: 850.0, unit: 'KG', status: '완료', scanCode: 'BAR-EP01-992' },
    { id: 'RM-SOLV-XY02', name: '고순도 자일렌 용제 (Xylene)', target: 420.0, input: 420.0, unit: 'KG', status: '완료', scanCode: 'BAR-XY02-108' },
    { id: 'AD-PIGM-TI01', name: '티타늄 디옥사이드 백색안료 (TiO2)', target: 380.0, input: 380.0, unit: 'KG', status: '완료', scanCode: 'BAR-TI01-445' },
    { id: 'AD-ANTI-ST03', name: '침전방지 및 분산안정제', target: 200.0, input: 200.0, unit: 'KG', status: '완료', scanCode: 'BAR-ST03-312' },
  ]);

  // [Step 3 & 4: 설비 가동 & 텔레메트리]
  const [isEquipRunning, setIsEquipRunning] = useState(true);
  const [equipStartTime, setEquipStartTime] = useState('2026-10-16 08:35:10');
  const [equipEndTime, setEquipEndTime] = useState('');
  const [rpm, setRpm] = useState(1248);
  const [temperature, setTemperature] = useState(52.6);
  const [torque, setTorque] = useState(67.4);
  const [currentAmp, setCurrentAmp] = useState(41.8);
  const [elapsedMinutes, setElapsedMinutes] = useState(38);

  // 비가동(Downtime) 상태
  const [downtimeList, setDowntimeList] = useState([
    { id: 1, reason: '원료 이송 배관 점검', start: '08:42:10', end: '08:46:30', duration: '4분 20초', type: '공정지연' }
  ]);
  const [newDowntimeReason, setNewDowntimeReason] = useState('원료 필터 교체');

  // [Step 5: 중간 검사 성적서]
  const [inspectionData, setInspectionData] = useState([
    { id: 1, count: '1차', item: '점도 (KU Viscosity)', target: '81.0', min: '78.0', max: '84.0', value: '81.4', result: 'PASS' },
    { id: 2, count: '1차', item: '비중 (Specific Gravity)', target: '1.30', min: '1.25', max: '1.35', value: '1.29', result: 'PASS' },
    { id: 3, count: '1차', item: '색차 (Color ΔE)', target: '0.10', min: '0.00', max: '0.50', value: '0.18', result: 'PASS' },
    { id: 4, count: '1차', item: '분산도 (Hegman 입도)', target: '6.5', min: '6.0', max: '7.0', value: '6.7', result: 'PASS' },
    { id: 5, count: '1차', item: '은폐력 (Contrast Ratio)', target: '98.0%', min: '95.0%', max: '100.0%', value: '98.5%', result: 'PASS' },
  ]);

  // [Step 6: 작업 완료 실적]
  const [totalOrderQty] = useState(1850.0);
  const [totalInputQty] = useState(1850.0);
  const [completeGoodQty, setCompleteGoodQty] = useState(1842.5);
  const [lossQty, setLossQty] = useState(7.5);
  const [isSecondCoolingRequired, setIsSecondCoolingRequired] = useState(false);
  const [isMeasuringWeight, setIsMeasuringWeight] = useState(false);
  const [scaleDeviceName] = useState('LOADCELL-SCALE-B02 (방폭 인라인 전자저울)');

  // 텔레메트리 루프
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isEquipRunning) {
      timer = setInterval(() => {
        setRpm(prev => 1250 + Math.round((Math.random() - 0.5) * 16));
        setTemperature(prev => +(52.5 + (Math.random() - 0.5) * 0.4).toFixed(1));
        setTorque(prev => +(67.2 + (Math.random() - 0.5) * 0.8).toFixed(1));
        setCurrentAmp(prev => +(41.5 + (Math.random() - 0.5) * 0.6).toFixed(1));
      }, 800);
    }
    return () => clearInterval(timer);
  }, [isEquipRunning]);

  // 바코드 스캔 핸들러
  const handleScanCarrier = () => {
    if (!carrierBarcode.trim()) return;
    const newCarrier = {
      id: carrierList.length + 1,
      carrierCode: carrierBarcode.trim().toUpperCase(),
      type: '이동식 서브탱크',
      capacity: '1,000 L',
      status: '매핑 완료 (적합)',
      cleanDate: new Date().toLocaleTimeString('ko-KR')
    };
    setCarrierList(prev => [newCarrier, ...prev]);
    setCarrierBarcode('');
  };

  // 설비 완료 클릭
  const handleEquipmentCompleteAction = () => {
    setIsEquipRunning(false);
    const nowStr = new Date().toLocaleString('ko-KR');
    setEquipEndTime(nowStr);
    
    // 서브스텝 상태 변경
    setSubSteps(prev => prev.map(s => {
      if (s.key === 'equipmentStart') return { ...s, status: 'End' };
      if (s.key === 'equipmentComplete') return { ...s, status: 'End' };
      if (s.key === 'inspection') return { ...s, status: 'Start' };
      return s;
    }));
    setCurrentSubStep('inspection');
  };

  // 로드셀 무게 측정 시뮬레이션
  const handleMeasureWeight = () => {
    setIsMeasuringWeight(true);
    setTimeout(() => {
      setIsMeasuringWeight(false);
      const measured = 1843.2;
      setCompleteGoodQty(measured);
      setLossQty(+(totalInputQty - measured).toFixed(1));
    }, 1200);
  };

  // 비관적 락(Pessimistic Lock) 확정 완료
  const handleFinalWorkComplete = () => {
    // 서브스텝 완료
    setSubSteps(prev => prev.map(s => {
      if (s.key === 'workComplete') return { ...s, status: 'End' };
      return s;
    }));
    // 메인 스텝 업데이트
    setProcessSteps(prev => prev.map(p => {
      if (p.key === '2_DISP') return { ...p, status: 'End' };
      if (p.key === '3_REACT') return { ...p, status: 'InProgress' };
      return p;
    }));

    // 폭죽 효과
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col select-none font-sans">
      {/* 1. 최상단 네비게이션 & 태블릿 상태 바 */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all border border-slate-700 hover:border-slate-600"
          >
            <ArrowLeft className="w-4 h-4 text-rose-500" />
            <span>포트폴리오 복귀</span>
          </button>
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider">PLC LINK ACTIVE (50ms)</span>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">| 단말 ID: TAB-MES-P1-04</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="text-rose-400 font-semibold bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded">
            도료 생산 MES 2.0 (실운영 파트)
          </span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>2026-10-16 09:14:28</span>
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title="전체화면 전환"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. WorkOperationHeader (작업지시 헤더 정보) */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 shadow-sm">
        <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* 주요 4대 정보 (LOT, 총중량, 제품코드, 제품명) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1 min-w-[300px]">
            <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">LOT 번호</span>
              <span className="text-base sm:text-lg font-black text-white font-mono tracking-tight text-rose-400">
                25A0123-B01
              </span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">총중량 (KG)</span>
              <span className="text-base sm:text-lg font-black text-white font-mono tracking-tight text-emerald-400">
                1,850.00 KG
              </span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">제품코드</span>
              <span className="text-base sm:text-lg font-black text-slate-200 font-mono tracking-tight">
                P-001239
              </span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">제품명</span>
              <span className="text-sm sm:text-base font-extrabold text-white truncate block" title="속건 에폭시 프라이머 그레이">
                속건 에폭시 프라이머 그레이
              </span>
            </div>
          </div>

          {/* [비고] 툴팁/모달 버튼 */}
          <button
            onClick={() => setIsRemarksModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-900/30 transition-all border border-rose-500"
          >
            <Info className="w-5 h-5" />
            <span>공정 비고 / 주의사항</span>
          </button>
        </div>
      </div>

      {/* 3. WorkOperationSteps (화살표 형태 메인 공정 단계 배너) */}
      <div className="bg-slate-950 px-3 py-2.5 border-b border-slate-800/80">
        <div className="max-w-[1700px] mx-auto grid grid-cols-4 gap-1.5 sm:gap-2">
          {processSteps.map((step, idx) => {
            const isSelected = selectedProcessStep === step.key;
            const isEnd = step.status === 'End';
            const isInProgress = step.status === 'InProgress';

            let bgStyle = 'bg-slate-900 text-slate-400 border-slate-800';
            if (isSelected) {
              bgStyle = 'bg-rose-600 text-white border-rose-400 ring-2 ring-rose-500/50 shadow-lg';
            } else if (isEnd) {
              bgStyle = 'bg-emerald-700/80 text-white border-emerald-600';
            } else if (isInProgress) {
              bgStyle = 'bg-blue-600/90 text-white border-blue-500';
            }

            return (
              <div
                key={step.key}
                onClick={() => setSelectedProcessStep(step.key)}
                className={`relative py-2.5 px-2 sm:px-4 rounded-md border text-center cursor-pointer transition-all duration-200 ${bgStyle}`}
              >
                <div className="text-xs sm:text-sm font-extrabold truncate">
                  {step.label}
                </div>
                <div className="text-[10px] font-mono opacity-80 mt-0.5">
                  {isEnd ? '✓ 완료 (End)' : isInProgress ? '● 진행중 (Active)' : '○ 대기 (Wait)'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. WorkOperationSubSteps (생산 파트 6대 액티비티 서브스텝) */}
      <div className="bg-slate-900/60 px-3 py-2 border-b border-slate-800">
        <div className="max-w-[1700px] mx-auto grid grid-cols-3 md:grid-cols-6 gap-2">
          {subSteps.map((sub, idx) => {
            const isActive = currentSubStep === sub.key;
            const isEnd = sub.status === 'End';
            const isStart = sub.status === 'Start';

            let badgeClass = 'bg-slate-800 text-slate-400 border-slate-700';
            if (isActive) {
              badgeClass = 'bg-rose-600 text-white border-rose-400 ring-2 ring-rose-400 shadow-md scale-[1.02]';
            } else if (isEnd) {
              badgeClass = 'bg-emerald-900/60 text-emerald-300 border-emerald-700 hover:bg-emerald-900/90';
            } else if (isStart) {
              badgeClass = 'bg-blue-900/60 text-blue-300 border-blue-700 hover:bg-blue-900/90';
            }

            return (
              <button
                key={sub.key}
                onClick={() => setCurrentSubStep(sub.key)}
                className={`py-2 px-2.5 rounded-lg border text-left transition-all duration-150 flex flex-col justify-between ${badgeClass}`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-mono font-bold opacity-75">#{idx + 1}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-black/30">
                    {isEnd ? '완료' : isStart ? '진행중' : '대기'}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-extrabold truncate">{sub.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. WorkOperationContentPanel (중앙 서브스텝별 실제 액티비티 UI) */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 max-w-[1700px] w-full mx-auto">
        <AnimatePresence mode="wait">
          {/* ===================== [서브스텝 1: 공정 준비 (Preparation)] ===================== */}
          {currentSubStep === 'preparation' && (
            <motion.div
              key="preparation"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            >
              {/* 좌측: 준비 시작/완료 폼 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-rose-500" />
                    <span>공정 준비 제어</span>
                  </h3>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    준비 완료됨
                  </span>
                </div>

                <div className="space-y-3 mt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-400 mb-1 block">준비 시작 일시</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={prepStartTime}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-slate-200 flex-1"
                      />
                      <button
                        onClick={() => setPrepStartTime(new Date().toLocaleString('ko-KR'))}
                        className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700"
                      >
                        시간 기록
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 mb-1 block">설비 그룹</label>
                    <select
                      value={selectedEquipGroup}
                      onChange={e => setSelectedEquipGroup(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-rose-500"
                    >
                      <option value="T01-고속교반조군">T01-고속교반조군 (DISPER HIGH-SPEED)</option>
                      <option value="T02-밀링분산조군">T02-밀링분산조군 (SAND-MILL SYSTEM)</option>
                      <option value="T03-합성반응로군">T03-합성반응로군 (REACTOR TANK)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 mb-1 block">가동 대상 설비</label>
                    <select
                      value={selectedEquipment}
                      onChange={e => setSelectedEquipment(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-rose-500"
                    >
                      <option value="DISPER-01 (고속 디스퍼 교반기 2500L)">DISPER-01 (고속 디스퍼 교반기 2500L)</option>
                      <option value="DISPER-02 (고속 디스퍼 교반기 3000L)">DISPER-02 (고속 디스퍼 교반기 3000L)</option>
                      <option value="MILL-04 (수평형 비드밀 50L)">MILL-04 (수평형 비드밀 50L)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 mb-1 block">준비 완료 일시</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={prepEndTime}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-emerald-400 flex-1"
                      />
                      <button
                        onClick={() => setPrepEndTime(new Date().toLocaleString('ko-KR'))}
                        className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow"
                      >
                        준비 완료
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsChecklistModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                      <span>설비 안전 체크리스트 점검 (완료 5/5)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 중앙: 캐리어 그리드 섹션 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-rose-500" />
                    <span>캐리어(이송 용기) 매핑</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">총 {carrierList.length}건 등록</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="캐리어 바코드 스캔 (예: CR-TANK-03)"
                    value={carrierBarcode}
                    onChange={e => setCarrierBarcode(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleScanCarrier()}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    onClick={handleScanCarrier}
                    className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow"
                  >
                    스캔 등록
                  </button>
                </div>

                <div className="flex-1 overflow-x-auto border border-slate-800 rounded-lg bg-slate-950/60">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">캐리어 코드</th>
                        <th className="py-2.5 px-2">유형</th>
                        <th className="py-2.5 px-2">용량</th>
                        <th className="py-2.5 px-3">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {carrierList.map(item => (
                        <tr key={item.id} className="hover:bg-slate-900/60">
                          <td className="py-2.5 px-3 font-bold text-white">{item.carrierCode}</td>
                          <td className="py-2.5 px-2 text-slate-300 font-sans">{item.type}</td>
                          <td className="py-2.5 px-2 text-emerald-400">{item.capacity}</td>
                          <td className="py-2.5 px-3">
                            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-sans font-semibold">
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 우측: 작업자 관리 섹션 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-rose-500" />
                    <span>작업자 구성</span>
                  </h3>
                  <button
                    onClick={() => setIsWorkerGroupModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700"
                  >
                    <Users className="w-3.5 h-3.5 text-rose-400" />
                    <span>조원 구성</span>
                  </button>
                </div>

                <div className="flex-1 overflow-x-auto border border-slate-800 rounded-lg bg-slate-950/60">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">사번</th>
                        <th className="py-2.5 px-2">성명</th>
                        <th className="py-2.5 px-2">부서</th>
                        <th className="py-2.5 px-3">역할</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {workerList.map(worker => (
                        <tr key={worker.id} className="hover:bg-slate-900/60">
                          <td className="py-2.5 px-3 font-mono text-slate-300">{worker.empNo}</td>
                          <td className="py-2.5 px-2 font-bold text-white">{worker.name}</td>
                          <td className="py-2.5 px-2 text-slate-400">{worker.dept}</td>
                          <td className="py-2.5 px-3">
                            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-800 font-semibold">
                              {worker.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => setCurrentSubStep('materialInput')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md transition-all"
                  >
                    <span>다음 단계 (자재 투입) 이동</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================== [서브스텝 2: 자재 투입 (MaterialInput)] ===================== */}
          {currentSubStep === 'materialInput' && (
            <motion.div
              key="materialInput"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {/* 상단 액션 바 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative flex-1">
                    <Barcode className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="원료 바코드 스캔 (BOM 대조)"
                      value={materialScanInput}
                      onChange={e => setMaterialScanInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setMaterialScanInput('BAR-RESIN-VERIFIED-OK');
                      setTimeout(() => setMaterialScanInput(''), 1500);
                    }}
                    className="px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow"
                  >
                    스캔 시뮬레이션
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('자동 투입 밸브 시퀀스가 이미 완료되었습니다 (1,850 KG 전량 충진).')}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700"
                  >
                    자동 투입 확인
                  </button>
                  <button
                    onClick={() => alert('수동 투입 분할 모달을 호출합니다.')}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700"
                  >
                    수동 투입
                  </button>
                  <button
                    onClick={() => alert('투입 잔량 0.0 KG 처리되었습니다.')}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700"
                  >
                    잔량 처리
                  </button>
                  <button
                    onClick={() => setCurrentSubStep('equipmentStart')}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow flex items-center gap-1.5"
                  >
                    <span>자재 투입 완료 ➔ 설비 시작 이동</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 자재 BOM 목록 그리드 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
                <div className="px-4 py-3 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <h3 className="text-sm font-extrabold text-white">BOM 원자재 배합 및 실투입 목록</h3>
                  </div>
                  <div className="text-xs font-mono text-emerald-400 font-bold">
                    투입 진행률: 100% (1,850.00 / 1,850.00 KG)
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">자재코드</th>
                        <th className="py-3 px-3">원료/자재명</th>
                        <th className="py-3 px-3 text-right">지시량 (KG)</th>
                        <th className="py-3 px-3 text-right">실투입량 (KG)</th>
                        <th className="py-3 px-3 text-right">잔량 (KG)</th>
                        <th className="py-3 px-3 text-center">MSDS</th>
                        <th className="py-3 px-4 text-center">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-mono">
                      {materialList.map(item => (
                        <tr key={item.id} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-bold text-rose-400">{item.id}</td>
                          <td className="py-3 px-3 font-sans font-semibold text-white">{item.name}</td>
                          <td className="py-3 px-3 text-right text-slate-300 font-bold">{item.target.toFixed(2)}</td>
                          <td className="py-3 px-3 text-right text-emerald-400 font-bold">{item.input.toFixed(2)}</td>
                          <td className="py-3 px-3 text-right text-slate-400">0.00</td>
                          <td className="py-3 px-3 text-center font-sans">
                            <button
                              onClick={() => alert(`[MSDS 다운로드]\n${item.name} 안전보건자료를 조회했습니다.`)}
                              className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                            >
                              열람
                            </button>
                          </td>
                          <td className="py-3 px-4 text-center font-sans">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                              <Check className="w-3 h-3" />
                              투입완료
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================== [서브스텝 3: 설비 작업 시작 (EquipmentStart)] ===================== */}
          {currentSubStep === 'equipmentStart' && (
            <motion.div
              key="equipmentStart"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            >
              {/* 좌측: 작업 시작 폼 & 조작 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-rose-500" />
                    <span>설비 가동 시작</span>
                  </h3>
                  <span className="text-xs text-blue-400 font-bold bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800 animate-pulse">
                    ● 설비 구동 중 (RUN)
                  </span>
                </div>

                <div className="space-y-3 mt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-400 mb-1 block">설비 작업 시작 시간</label>
                    <input
                      type="text"
                      readOnly
                      value={equipStartTime}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm font-mono text-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 mb-1 block">현재 배합/교반조 설비</label>
                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                      <div className="text-sm font-black text-white">{selectedEquipment}</div>
                      <div className="text-xs text-slate-400 mt-1">PLC Node: 192.168.10.42 (Rockwell ControlLogix L83E)</div>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">가동 경과 시간:</span>
                      <span className="font-mono font-bold text-white">{elapsedMinutes}분 24초</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">교반 목표 시간:</span>
                      <span className="font-mono font-bold text-slate-300">45분 00초 (진행률 85%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={handleEquipmentCompleteAction}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-emerald-950/40 transition-all"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>설비 교반 작업 완료 처리</span>
                    </button>
                    <button
                      onClick={() => setIsChecklistModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700"
                    >
                      <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                      <span>공정 중 체크리스트</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 중앙: 실시간 PLC 게이지 & 텔레메트리 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-rose-500" />
                    <span>실시간 설비 텔레메트리 (PLC)</span>
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">실시간 연동중</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-1">
                  {/* RPM 카드 */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-400 mb-1">교반기 회전속도</span>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-rose-400">
                      {rpm} <span className="text-xs text-slate-400 font-sans">RPM</span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1">목표: 1,250 RPM (±15)</span>
                  </div>

                  {/* 온도 카드 */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-400 mb-1">배합조 내부 온도</span>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                      {temperature} <span className="text-xs text-slate-400 font-sans">℃</span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1">관리상한: 60.0 ℃</span>
                  </div>

                  {/* 모터 토크 부하 */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-400 mb-1">모터 토크 부하율</span>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-blue-400">
                      {torque} <span className="text-xs text-slate-400 font-sans">%</span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1">정상 범위 (50~80%)</span>
                  </div>

                  {/* 인버터 전류 */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-400 mb-1">인버터 구동 전류</span>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
                      {currentAmp} <span className="text-xs text-slate-400 font-sans">A</span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1">정격: 55.0 A 이하</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 mt-1">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-slate-300">방폭 환기팬 & 냉각수 칠러</span>
                    <span className="text-emerald-400 font-bold">정상 가동 (NORMAL)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    도료 고속 분산 공정 시 발생하는 마찰열을 칠러 냉각수로 제어 중이며, 배기 압력 120 Pa을 정상 유지하고 있습니다.
                  </p>
                </div>
              </div>

              {/* 우측: DowntimeSection (비가동 등록 섹션) */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span>Downtime (비가동 관리)</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">총 1건 기록</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 block">비가동 사유 선택 및 추가</label>
                  <div className="flex gap-2">
                    <select
                      value={newDowntimeReason}
                      onChange={e => setNewDowntimeReason(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs font-semibold text-white focus:outline-none focus:border-rose-500"
                    >
                      <option value="원료 필터 교체">원료 필터 교체 (Filter Replace)</option>
                      <option value="배관 이송 지연">배관 이송 지연 (Pipe Delay)</option>
                      <option value="교반기 날개 점검">교반기 날개 점검 (Impeller Check)</option>
                      <option value="전원 인버터 일시 정지">전원 인버터 일시 정지</option>
                    </select>
                    <button
                      onClick={() => {
                        const newD = {
                          id: downtimeList.length + 1,
                          reason: newDowntimeReason,
                          start: new Date().toLocaleTimeString('ko-KR'),
                          end: '-',
                          duration: '진행중',
                          type: '설비점검'
                        };
                        setDowntimeList(prev => [newD, ...prev]);
                      }}
                      className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-bold text-slate-950 shadow"
                    >
                      비가동 등록
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-x-auto border border-slate-800 rounded-lg bg-slate-950/60 mt-1">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">사유</th>
                        <th className="py-2.5 px-2">시작시간</th>
                        <th className="py-2.5 px-2">시간</th>
                        <th className="py-2.5 px-3">구분</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {downtimeList.map(item => (
                        <tr key={item.id} className="hover:bg-slate-900/60">
                          <td className="py-2.5 px-3 font-sans font-semibold text-white">{item.reason}</td>
                          <td className="py-2.5 px-2 text-slate-300">{item.start}</td>
                          <td className="py-2.5 px-2 text-amber-400 font-bold">{item.duration}</td>
                          <td className="py-2.5 px-3 font-sans text-slate-400">{item.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================== [서브스텝 4: 설비 작업 완료 (EquipmentComplete)] ===================== */}
          {currentSubStep === 'equipmentComplete' && (
            <motion.div
              key="equipmentComplete"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-lg font-black text-white">설비 작업 완료 및 텔레메트리 마감</h3>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                  교반 정지 완료 (STOP)
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">총 교반 가동시간</span>
                  <span className="text-lg font-black text-white font-mono">45분 12초</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">평균 회전속도</span>
                  <span className="text-lg font-black text-rose-400 font-mono">1,249 RPM</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">최고 도달온도</span>
                  <span className="text-lg font-black text-emerald-400 font-mono">54.2 ℃</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-1">누적 전력소비량</span>
                  <span className="text-lg font-black text-amber-400 font-mono">48.2 kWh</span>
                </div>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 space-y-2 text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-white text-sm">설비 완료 점검 사항</p>
                <p>• 디스퍼 모터 정지 및 축 런아웃(Runout) 진동 0.02mm 이하 정상 확인.</p>
                <p>• 배합탱크 밀폐 밸브 V-102 차단 완료 및 냉각수 배출 밸브 잠금.</p>
                <p>• 다음 공정(중간 검사: 점도, 비중, 분산도 시험) 샘플링 채취 준비 완료.</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setCurrentSubStep('inspection')}
                  className="px-6 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-lg flex items-center gap-2"
                >
                  <span>중간 검사 (품질 시험) 단계로 이동</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ===================== [서브스텝 5: 중간 검사 (Inspection)] ===================== */}
          {currentSubStep === 'inspection' && (
            <motion.div
              key="inspection"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {/* 상단 액션 및 차수 요약 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">검사 차수:</span>
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-white text-xs font-mono font-bold border border-slate-700">
                      1차 검사
                    </span>
                  </div>
                  <div className="h-4 w-px bg-slate-800" />
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">종합 판정:</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-800 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      합격 (PASS)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('품질관리실(QC Lab)로 검사의뢰가 접수되었습니다.')}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700"
                  >
                    검사의뢰 재요청
                  </button>
                  <button
                    onClick={() => alert('대체 검사값 수기 입력 모달이 열립니다.')}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700"
                  >
                    검사결과 수기입력
                  </button>
                  <button
                    onClick={() => {
                      setSubSteps(prev => prev.map(s => s.key === 'inspection' ? { ...s, status: 'End' } : s));
                      setCurrentSubStep('workComplete');
                    }}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow flex items-center gap-1.5"
                  >
                    <span>검사 마감 ➔ 작업 완료 단계 이동</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 검사항목 그리드 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
                <div className="px-4 py-3 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-500" />
                    <span>도료 품질 검사 성적서 (품질 판정 항목)</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">검사원: 책임연구원 한승우 (승인완료)</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-3 text-center">차수</th>
                        <th className="py-3 px-4">검사항목</th>
                        <th className="py-3 px-3 text-center">Target</th>
                        <th className="py-3 px-3 text-right">하한값</th>
                        <th className="py-3 px-3 text-right">상한값</th>
                        <th className="py-3 px-3 text-right font-black text-rose-400">실측 검사값</th>
                        <th className="py-3 px-3 text-center">판정</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-mono">
                      {inspectionData.map(item => (
                        <tr key={item.id} className="hover:bg-slate-800/40">
                          <td className="py-3 px-3 text-center font-sans text-slate-400">{item.count}</td>
                          <td className="py-3 px-4 font-sans font-bold text-white">{item.item}</td>
                          <td className="py-3 px-3 text-center text-slate-300">{item.target}</td>
                          <td className="py-3 px-3 text-right text-slate-400">{item.min}</td>
                          <td className="py-3 px-3 text-right text-slate-400">{item.max}</td>
                          <td className="py-3 px-3 text-right font-black text-emerald-400 text-sm">{item.value}</td>
                          <td className="py-3 px-3 text-center font-sans">
                            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                              PASS
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================== [서브스텝 6: 작업 완료 (WorkComplete)] ===================== */}
          {currentSubStep === 'workComplete' && (
            <motion.div
              key="workComplete"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="max-w-4xl mx-auto space-y-4"
            >
              {/* 실적 집계 카드 */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Scale className="w-6 h-6 text-rose-500" />
                    <div>
                      <h3 className="text-lg font-black text-white">공정 실적 집계 및 최종 작업 완료</h3>
                      <p className="text-xs text-slate-400 mt-0.5">양품 완성량 계량 및 비관적 락(Pessimistic Lock) 최종 확정</p>
                    </div>
                  </div>
                  <button
                    onClick={handleMeasureWeight}
                    disabled={isMeasuringWeight}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold text-xs shadow transition-all border border-blue-400/30"
                  >
                    <Scale className="w-4 h-4" />
                    <span>{isMeasuringWeight ? '로드셀 무게 수신중...' : '무게 실시간 계량 수신'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">지시 수량</span>
                    <span className="text-xl font-black text-white font-mono">{totalOrderQty.toFixed(2)} KG</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">원료 실투입량</span>
                    <span className="text-xl font-black text-emerald-400 font-mono">{totalInputQty.toFixed(2)} KG</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">완성량 (양품 실적)</span>
                    <span className="text-xl font-black text-rose-400 font-mono">{completeGoodQty.toFixed(2)} KG</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-1">공정 LOSS량</span>
                    <span className="text-xl font-black text-amber-400 font-mono">{lossQty.toFixed(2)} KG (0.4%)</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="secondCooling"
                      checked={isSecondCoolingRequired}
                      onChange={e => setIsSecondCoolingRequired(e.target.checked)}
                      className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-rose-600 focus:ring-0"
                    />
                    <label htmlFor="secondCooling" className="text-xs font-bold text-slate-200 cursor-pointer">
                      2차 추가 냉각 필요 여부 (필요 시 조제 탱크 2시간 정치)
                    </label>
                  </div>
                  <span className="text-xs font-mono text-slate-400">연동 저울: {scaleDeviceName}</span>
                </div>

                {/* 대형 작업 완료 확정 버튼 */}
                <div className="pt-2">
                  <button
                    onClick={handleFinalWorkComplete}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-[0.99] text-white font-black text-base sm:text-lg shadow-xl shadow-rose-950/50 flex items-center justify-center gap-3 transition-all"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    <span>작업 완료 및 실적 등록 (비관적 락 트랜잭션 확정)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 6. WorkOperationBottomNavigation (하단 고정 내비게이션 바) */}
      <div className="bg-slate-900 border-t border-slate-800 px-3 py-2.5 shadow-lg">
        <div className="max-w-[1700px] mx-auto grid grid-cols-4 sm:grid-cols-7 gap-2">
          <button
            onClick={() => {
              setCurrentSubStep('preparation');
              setSelectedProcessStep('2_DISP');
            }}
            className="py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-slate-200 flex flex-col items-center justify-center gap-1 border border-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setIsInspectionResultModalOpen(true)}
            className="py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-slate-200 flex flex-col items-center justify-center gap-1 border border-slate-700 transition-all"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>검사 결과</span>
          </button>

          <button
            onClick={() => setIsSopModalOpen(true)}
            className="py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-slate-200 flex flex-col items-center justify-center gap-1 border border-slate-700 transition-all"
          >
            <ClipboardCheck className="w-4 h-4 text-blue-400" />
            <span>S.O.P 지침</span>
          </button>

          <button
            onClick={() => setCurrentSubStep('equipmentStart')}
            className="py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-slate-200 flex flex-col items-center justify-center gap-1 border border-slate-700 transition-all"
          >
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Trend 곡선</span>
          </button>

          <button
            onClick={() => setIsPerformanceModalOpen(true)}
            className="py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-slate-200 flex flex-col items-center justify-center gap-1 border border-slate-700 transition-all"
          >
            <History className="w-4 h-4 text-purple-400" />
            <span>실적 조회</span>
          </button>

          <button
            onClick={() => setIsSolventModalOpen(true)}
            className="py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-slate-200 flex flex-col items-center justify-center gap-1 border border-slate-700 transition-all"
          >
            <Droplet className="w-4 h-4 text-cyan-400" />
            <span>청소 용제</span>
          </button>

          <button
            onClick={() => setIsCommentModalOpen(true)}
            className="py-2.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-slate-200 flex flex-col items-center justify-center gap-1 border border-slate-700 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-rose-400" />
            <span>Comment</span>
          </button>
        </div>
      </div>

      {/* ======================= 모달 팝업들 (실제 ckpaint_front 구성 모사) ======================= */}

      {/* 1. 공정 비고 / 주의사항 모달 */}
      <AnimatePresence>
        {isRemarksModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Info className="w-6 h-6 text-rose-500" />
                  <h3 className="text-lg font-black text-white">공정 주의사항 및 특이사항 (비고)</h3>
                </div>
                <button
                  onClick={() => setIsRemarksModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/50">
                  <span className="font-bold text-rose-400 block mb-1">【정전기 방지 및 방폭 주의】</span>
                  용제(자일렌) 투입 시 접지선(Earth Clip) 체결 상태를 육안 검증하고, 유속을 1.5 m/s 이하로 유지하여 인화 위험을 방지하십시오.
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-bold text-white block mb-1">【안료 분산 기준】</span>
                  티타늄 디옥사이드 투입 후 15분간 저속(500 RPM) 예비 교반 후, 고속(1,250 RPM)으로 본 교반을 수행하여 입도 6.5 Hegman 이상을 확보하십시오.
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-bold text-white block mb-1">【온도 관리 기준】</span>
                  에폭시 수지의 급격한 반응열 상승을 방지하기 위해 배합조 내부 온도가 55℃를 초과할 경우 냉각수 밸브 V-201을 100% 개방하십시오.
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsRemarksModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow"
                >
                  확인 완료
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. S.O.P 표준작업지침 모달 */}
      <AnimatePresence>
        {isSopModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-black text-white">S.O.P 표준작업지침서 (속건 에폭시 프라이머)</h3>
                </div>
                <button
                  onClick={() => setIsSopModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 max-h-[60vh] overflow-y-auto">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <h4 className="font-bold text-white mb-1">1단계: 설비 점검 및 캐리어 용기 소독</h4>
                  <p className="text-slate-400">교반기 블레이드 마모도, 축 패킹 오일 누유, 방폭 모터 절연 상태 확인.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <h4 className="font-bold text-white mb-1">2단계: 원료 바코드 스캔 및 투입 순서</h4>
                  <p className="text-slate-400">1) 베이스 수지 850KG ➔ 2) 자일렌 200KG(1차) ➔ 3) TiO2 안료 380KG ➔ 4) 잔여 자일렌 220KG ➔ 5) 첨가제 순서 준수.</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <h4 className="font-bold text-white mb-1">3단계: 고속 분산 및 품질 채취</h4>
                  <p className="text-slate-400">1,250 RPM으로 45분간 분산 후 게이지 블록으로 입도 측정(6.5 이상 합격).</p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsSopModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. 체크리스트 모달 */}
      <AnimatePresence>
        {isChecklistModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-emerald-400" />
                  <span>공정 안전 및 품질 체크리스트</span>
                </h3>
                <button
                  onClick={() => setIsChecklistModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-200">
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-rose-600" />
                  <span>교반기 날개 체결 볼트 토크 및 회전 방향 정상 확인</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-rose-600" />
                  <span>배합조 탱크 어스 접지선 저항치 10Ω 이하 확인</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-rose-600" />
                  <span>국소 배기 방폭 팬 작동 음압 형성 확인</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-rose-600" />
                  <span>원자재 LOT 바코드 일치 여부 및 포장 결함 여부 확인</span>
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsChecklistModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow"
                >
                  체크리스트 저장
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. 조원 구성 모달 */}
      <AnimatePresence>
        {isWorkerGroupModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-rose-500" />
                  <span>현장 조원 편성 관리</span>
                </h3>
                <button
                  onClick={() => setIsWorkerGroupModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">김재선 (정/책임)</span>
                    <span className="text-slate-400">사번: EMP-202104 | 화학생산1팀</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold border border-rose-800">
                    주작업자
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">박민우 (부/선임)</span>
                    <span className="text-slate-400">사번: EMP-202319 | 화학생산1팀</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
                    보조
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsWorkerGroupModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow"
                >
                  조원 편성 저장
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. 청소 용제 투입 모달 */}
      <AnimatePresence>
        {isSolventModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-cyan-400" />
                  <span>세척/청소 용제 투입 이력</span>
                </h3>
                <button
                  onClick={() => setIsSolventModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-bold">세척 용제 품번</label>
                  <input
                    type="text"
                    readOnly
                    value="RM-SOLV-WASH01 (재생 톨루엔/자일렌 세척액)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-bold">투입 용제량 (KG)</label>
                  <input
                    type="text"
                    defaultValue="45.0 KG"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-emerald-400 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsSolventModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow"
                >
                  용제 투입 등록
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Comment 모달 */}
      <AnimatePresence>
        {isCommentModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-rose-500" />
                  <span>현장 인수인계 코멘트 (Comment)</span>
                </h3>
                <button
                  onClick={() => setIsCommentModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                rows={4}
                defaultValue="[2교대 인계사항] 점도 81.4 KU로 상한 기준 내 안정적이며, 3단계 반응조 이송 펌프 P-04 토출 압력 정상임."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-rose-500"
              />

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setIsCommentModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow"
                >
                  코멘트 등록
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. 최종 작업 완료 성공 팝업 */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-slate-900 border-2 border-emerald-500 rounded-3xl max-w-lg w-full p-8 shadow-2xl text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">공정 작업 완료 및 실적 확정</h3>
                <p className="text-sm text-slate-300 mt-2 font-mono">
                  LOT NO: <span className="text-rose-400 font-bold">25A0123-B01</span>
                </p>
                <p className="text-xs text-emerald-400 mt-1 font-semibold">
                  비관적 락(Pessimistic Lock) 트랜잭션 정상 커밋 완료
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs font-mono space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">실투입량:</span>
                  <span className="font-bold text-white">1,850.00 KG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">양품 완성량:</span>
                  <span className="font-bold text-emerald-400">1,842.50 KG (99.59%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">LOSS량:</span>
                  <span className="font-bold text-amber-400">7.50 KG (0.41%)</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-1.5">
                  <span className="text-slate-400 font-sans">다음 이관 공정:</span>
                  <span className="font-bold text-cyan-400 font-sans">3_반응 (조정 및 첨가제 숙성)</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700"
                >
                  POP 화면 계속 확인
                </button>
                <button
                  onClick={onBack}
                  className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-950/50"
                >
                  포트폴리오 메인으로 복귀
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
