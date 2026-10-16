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
  const [prepStartTime, setPrepStartTime] = useState('2026-10-16 08:30:12');
  const [prepEndTime, setPrepEndTime] = useState('2026-10-16 08:45:00');
  const [selectedEquipGroup, setSelectedEquipGroup] = useState('T01-고속교반조군');
  const [selectedEquipment, setSelectedEquipment] = useState('DISPER-01 (고속 디스퍼 교반기 2500L)');
  const [carrierBarcode, setCarrierBarcode] = useState('');
  const [carrierList, setCarrierList] = useState([
    { id: 1, carrierCode: 'CR-TANK-01', type: '고정형 반응조', capacity: '2,500 L', status: '매핑 완료 (적합)', cleanDate: '2026-10-16 07:40' },
    { id: 2, carrierCode: 'CR-DRUM-04', type: '이동식 서브탱크', capacity: '1,000 L', status: '매핑 완료 (적합)', cleanDate: '2026-10-16 08:10' }
  ]);
  const [workerList] = useState([
    { id: 1, empNo: 'EMP-202104', name: '김재선', role: '주작업자 (정)', dept: '화학생산1팀' },
    { id: 2, empNo: 'EMP-202319', name: '박민우', role: '보조작업자 (부)', dept: '화학생산1팀' }
  ]);

  // [Step 2: 자재 투입 데이터]
  const [rawBarcode, setRawBarcode] = useState('');
  const [materialInputList] = useState([
    { id: 1, seq: 10, matCode: 'RM-EPOXY-101', matName: '비스페놀-A 에폭시 수지 (YP-50)', targetQty: 850.0, inputQty: 850.0, lotNo: 'LOT-EP261011', status: '완료' },
    { id: 2, seq: 20, matCode: 'RM-SOLV-XYL', matName: '자일렌 (Xylene 99.5% 전자급)', targetQty: 420.0, inputQty: 420.0, lotNo: 'LOT-XY261014', status: '완료' },
    { id: 3, seq: 30, matCode: 'RM-PIGM-W01', matName: '루타일형 산화티타늄 (TiO2 안료)', targetQty: 380.0, inputQty: 380.0, lotNo: 'LOT-TI261009', status: '완료' },
    { id: 4, seq: 40, matCode: 'RM-ADDT-S22', matName: '분산소포제 (BYK-066N)', targetQty: 25.0, inputQty: 25.0, lotNo: 'LOT-AD260928', status: '완료' },
    { id: 5, seq: 50, matCode: 'RM-FILL-BAR', matName: '침강성 황산바륨 (Barytes Extra)', targetQty: 175.0, inputQty: 175.0, lotNo: 'LOT-BA261005', status: '완료' }
  ]);

  // [Step 3: 설비 작업 데이터 (실시간 텔레메트리)]
  const [isEquipRunning, setIsEquipRunning] = useState(true);
  const [equipStartTime] = useState('2026-10-16 08:50:35');
  const [equipEndTime, setEquipEndTime] = useState('-');
  const [elapsedMinutes] = useState(38);
  const [rpm, setRpm] = useState(1250);
  const [temperature, setTemperature] = useState(52.4);
  const [torque, setTorque] = useState(67.5);
  const [currentAmp, setCurrentAmp] = useState(41.8);

  // [Step 5: 중간 검사 데이터]
  const [inspectionData] = useState([
    { id: 1, count: '1차', item: '점도 (Viscosity - Stormer)', target: '80 ~ 85 KU', min: '78.0', max: '88.0', value: '81.4 KU', status: 'PASS' },
    { id: 2, count: '1차', item: '비중 (Specific Gravity)', target: '1.42 ± 0.03', min: '1.39', max: '1.45', value: '1.425', status: 'PASS' },
    { id: 3, count: '1차', item: '입도 (Grind Gauge - Hegman)', target: '6.5 이상', min: '6.5', max: '8.0', value: '7.0 Hegman', status: 'PASS' },
    { id: 4, count: '1차', item: '색차 (Color Difference ΔE)', target: '0.50 이하', min: '0.00', max: '0.50', value: '0.24 ΔE', status: 'PASS' },
    { id: 5, count: '1차', item: '고형분 (Non-Volatile Content)', target: '72.0 ± 2.0 %', min: '70.0', max: '74.0', value: '72.6 %', status: 'PASS' }
  ]);

  // [Step 6: 작업 완료 실적 집계 데이터]
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
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col select-none font-sans">
      {/* 1. 최상단 네비게이션 & 태블릿 상태 바 (클린 라이트 블루) */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all border border-slate-300"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>포트폴리오 복귀</span>
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-mono text-blue-700 font-bold tracking-wider">PLC LINK ACTIVE (50ms)</span>
          </div>
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">| 단말 ID: TAB-MES-P1-04</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
          <span className="text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded">
            도료 생산 MES 2.0 (실운영 파트)
          </span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>2026-10-16 09:14:28</span>
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors"
            title="전체화면 전환"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. WorkOperationHeader (작업지시 헤더 정보 - 화이트 카드) */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-2xs">
        <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* 주요 4대 정보 (LOT, 총중량, 제품코드, 제품명) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1 min-w-[300px]">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">LOT 번호</span>
              <span className="text-base sm:text-lg font-black text-blue-700 font-mono tracking-tight">
                25A0123-B01
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">총중량 (KG)</span>
              <span className="text-base sm:text-lg font-black text-blue-800 font-mono tracking-tight">
                1,850.00 KG
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">제품코드</span>
              <span className="text-base sm:text-lg font-black text-slate-800 font-mono tracking-tight">
                P-001239
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">제품명</span>
              <span className="text-sm sm:text-base font-extrabold text-slate-900 truncate block" title="속건 에폭시 프라이머 그레이">
                속건 에폭시 프라이머 그레이
              </span>
            </div>
          </div>

          {/* [비고] 툴팁/모달 버튼 (단정한 블루 스타일) */}
          <button
            onClick={() => setIsRemarksModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm tracking-wide shadow-xs transition-all border border-blue-500"
          >
            <Info className="w-5 h-5" />
            <span>공정 비고 / 주의사항</span>
          </button>
        </div>
      </div>

      {/* 3. WorkOperationSteps (화살표 형태 메인 공정 단계 배너 - 깔끔한 블루 네비게이션) */}
      <div className="bg-slate-200/90 px-3 py-2 border-b border-slate-300">
        <div className="max-w-[1700px] mx-auto grid grid-cols-4 gap-1.5 sm:gap-2">
          {processSteps.map((step) => {
            const isSelected = selectedProcessStep === step.key;
            const isEnd = step.status === 'End';
            const isInProgress = step.status === 'InProgress';

            let bgStyle = 'bg-white text-slate-600 border-slate-300 shadow-2xs hover:bg-slate-50';
            if (isSelected) {
              bgStyle = 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400/50 shadow-md font-bold';
            } else if (isEnd) {
              bgStyle = 'bg-blue-50 text-blue-900 border-blue-300 font-semibold';
            } else if (isInProgress) {
              bgStyle = 'bg-sky-50 text-sky-900 border-sky-400 font-semibold';
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
      <div className="bg-white px-3 py-2 border-b border-slate-200 shadow-2xs">
        <div className="max-w-[1700px] mx-auto grid grid-cols-3 md:grid-cols-6 gap-2">
          {subSteps.map((sub, idx) => {
            const isActive = currentSubStep === sub.key;
            const isEnd = sub.status === 'End';
            const isStart = sub.status === 'Start';

            let badgeClass = 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100';
            if (isActive) {
              badgeClass = 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400/50 shadow-md scale-[1.01]';
            } else if (isEnd) {
              badgeClass = 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100';
            } else if (isStart) {
              badgeClass = 'bg-sky-50 text-sky-900 border-sky-300 hover:bg-sky-100';
            }

            return (
              <button
                key={sub.key}
                onClick={() => setCurrentSubStep(sub.key)}
                className={`py-2 px-2.5 rounded-lg border text-left transition-all duration-150 flex flex-col justify-between cursor-pointer ${badgeClass}`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-mono font-bold opacity-75">#{idx + 1}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
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
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <span>공정 준비 제어</span>
                  </h3>
                  <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    준비 완료됨
                  </span>
                </div>

                <div className="space-y-3 mt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-600 mb-1 block">준비 시작 일시</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={prepStartTime}
                        className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono text-slate-800 flex-1"
                      />
                      <button
                        onClick={() => setPrepStartTime(new Date().toLocaleString('ko-KR'))}
                        className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300"
                      >
                        시간 기록
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 mb-1 block">설비 그룹</label>
                    <select
                      value={selectedEquipGroup}
                      onChange={e => setSelectedEquipGroup(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
                    >
                      <option value="T01-고속교반조군">T01-고속교반조군 (DISPER HIGH-SPEED)</option>
                      <option value="T02-밀링분산조군">T02-밀링분산조군 (SAND-MILL SYSTEM)</option>
                      <option value="T03-합성반응로군">T03-합성반응로군 (REACTOR TANK)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 mb-1 block">가동 대상 설비</label>
                    <select
                      value={selectedEquipment}
                      onChange={e => setSelectedEquipment(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
                    >
                      <option value="DISPER-01 (고속 디스퍼 교반기 2500L)">DISPER-01 (고속 디스퍼 교반기 2500L)</option>
                      <option value="DISPER-02 (고속 디스퍼 교반기 3000L)">DISPER-02 (고속 디스퍼 교반기 3000L)</option>
                      <option value="MILL-04 (수평형 비드밀 50L)">MILL-04 (수평형 비드밀 50L)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 mb-1 block">준비 완료 일시</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={prepEndTime}
                        className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono text-blue-700 flex-1 font-bold"
                      />
                      <button
                        onClick={() => setPrepEndTime(new Date().toLocaleString('ko-KR'))}
                        className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs"
                      >
                        준비 완료
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsChecklistModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 transition-colors"
                    >
                      <ClipboardCheck className="w-4 h-4 text-blue-600" />
                      <span>설비 안전 체크리스트 점검 (완료 5/5)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 중앙: 캐리어 그리드 섹션 */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <span>캐리어(이송 용기) 매핑</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-500">총 {carrierList.length}건 등록</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="캐리어 바코드 스캔 (예: CR-TANK-03)"
                    value={carrierBarcode}
                    onChange={e => setCarrierBarcode(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleScanCarrier()}
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={handleScanCarrier}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    스캔 등록
                  </button>
                </div>

                <div className="flex-1 overflow-x-auto border border-slate-200 rounded-lg bg-slate-50">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">캐리어 코드</th>
                        <th className="py-2.5 px-2">유형</th>
                        <th className="py-2.5 px-2">용량</th>
                        <th className="py-2.5 px-3">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono">
                      {carrierList.map(item => (
                        <tr key={item.id} className="hover:bg-white bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-slate-900">{item.carrierCode}</td>
                          <td className="py-2.5 px-2 text-slate-700 font-sans">{item.type}</td>
                          <td className="py-2.5 px-2 text-blue-700 font-bold">{item.capacity}</td>
                          <td className="py-2.5 px-3">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-sans font-semibold">
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
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>작업자 구성</span>
                  </h3>
                  <button
                    onClick={() => setIsWorkerGroupModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300"
                  >
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>조원 구성</span>
                  </button>
                </div>

                <div className="flex-1 overflow-x-auto border border-slate-200 rounded-lg bg-slate-50">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">사번</th>
                        <th className="py-2.5 px-2">성명</th>
                        <th className="py-2.5 px-2">부서</th>
                        <th className="py-2.5 px-3">역할</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {workerList.map(worker => (
                        <tr key={worker.id} className="hover:bg-white bg-slate-50">
                          <td className="py-2.5 px-3 font-mono text-slate-600">{worker.empNo}</td>
                          <td className="py-2.5 px-2 font-bold text-slate-900">{worker.name}</td>
                          <td className="py-2.5 px-2 text-slate-600">{worker.dept}</td>
                          <td className="py-2.5 px-3">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
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
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition-all"
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
              {/* 바코드 스캔 상단 바 */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 flex-1 min-w-[280px]">
                  <Barcode className="w-7 h-7 text-blue-600 shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-600 mb-1">원자재 LOT 바코드 스캔 검증 (ERP/WMS 연계)</div>
                    <input
                      type="text"
                      placeholder="원료 포장 라벨의 바코드를 스캔하세요 (예: RM-EPOXY-101-LOT2610)"
                      value={rawBarcode}
                      onChange={e => setRawBarcode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      alert('스캔된 원료 바코드가 정상 검증되었습니다. (정합성 100%)');
                      setRawBarcode('');
                    }}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs"
                  >
                    바코드 검증
                  </button>
                  <button
                    onClick={() => setCurrentSubStep('equipmentStart')}
                    className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 flex items-center gap-1.5"
                  >
                    <span>설비 가동 단계로 이동</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 배합표 원료 투입 현황 그리드 */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>배합표(BOM) 원료 투입 리스트 (총 5개 원자재 1,850 KG)</span>
                  </h3>
                  <span className="text-xs text-blue-700 font-bold font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    전체 투입 완료 (100%)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-3 text-center">순번</th>
                        <th className="py-3 px-3">원자재 코드</th>
                        <th className="py-3 px-4">원자재 품명</th>
                        <th className="py-3 px-3 text-right">지시량 (KG)</th>
                        <th className="py-3 px-3 text-right">실투입량 (KG)</th>
                        <th className="py-3 px-3">투입 LOT 번호</th>
                        <th className="py-3 px-4 text-center">투입 상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono">
                      {materialInputList.map(mat => (
                        <tr key={mat.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 text-center text-slate-500 font-sans">{mat.seq}</td>
                          <td className="py-3 px-3 font-bold text-slate-900">{mat.matCode}</td>
                          <td className="py-3 px-4 font-sans font-bold text-slate-800">{mat.matName}</td>
                          <td className="py-3 px-3 text-right text-slate-600">{mat.targetQty.toFixed(1)}</td>
                          <td className="py-3 px-3 text-right font-black text-blue-700">{mat.inputQty.toFixed(1)}</td>
                          <td className="py-3 px-3 text-slate-700">
                            <span className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[11px]">
                              {mat.lotNo}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center font-sans">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              <Check className="w-3 h-3 text-blue-600" />
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
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>설비 가동 시작</span>
                  </h3>
                  <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200 animate-pulse">
                    ● 설비 구동 중 (RUN)
                  </span>
                </div>

                <div className="space-y-3 mt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-600 mb-1 block">설비 작업 시작 시간</label>
                    <input
                      type="text"
                      readOnly
                      value={equipStartTime}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-mono text-blue-700 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 mb-1 block">현재 배합/교반조 설비</label>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="text-sm font-black text-slate-900">{selectedEquipment}</div>
                      <div className="text-xs text-slate-500 mt-1">PLC Node: 192.168.10.42 (Rockwell ControlLogix L83E)</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">가동 경과 시간:</span>
                      <span className="font-mono font-bold text-slate-900">{elapsedMinutes}분 24초</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">교반 목표 시간:</span>
                      <span className="font-mono font-bold text-blue-700">45분 00초 (진행률 85%)</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={handleEquipmentCompleteAction}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-sm shadow-xs transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>설비 교반 작업 완료 처리</span>
                    </button>
                    <button
                      onClick={() => setIsChecklistModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300"
                    >
                      <ClipboardCheck className="w-4 h-4 text-blue-600" />
                      <span>공정 중 체크리스트</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 중앙: 실시간 PLC 게이지 & 텔레메트리 (단정한 블루 인디케이터) */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-blue-600" />
                    <span>실시간 설비 텔레메트리 (PLC)</span>
                  </h3>
                  <span className="text-xs font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    실시간 연동중
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-1">
                  {/* RPM 카드 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-600 mb-1">교반기 회전속도</span>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-blue-700">
                      {rpm} <span className="text-xs text-slate-500 font-sans">RPM</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">목표: 1,250 RPM (±15)</span>
                  </div>

                  {/* 온도 카드 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-600 mb-1">배합조 내부 온도</span>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-blue-800">
                      {temperature} <span className="text-xs text-slate-500 font-sans">℃</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">관리상한: 60.0 ℃</span>
                  </div>

                  {/* 모터 토크 부하 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-600 mb-1">모터 토크 부하율</span>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-slate-800">
                      {torque} <span className="text-xs text-slate-500 font-sans">%</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">정상 범위 (50~80%)</span>
                  </div>

                  {/* 인버터 전류 */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-slate-600 mb-1">인버터 구동 전류</span>
                    <div className="text-2xl sm:text-3xl font-black font-mono text-slate-800">
                      {currentAmp} <span className="text-xs text-slate-500 font-sans">A</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1">정격: 55.0 A 이하</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-1">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-blue-900">방폭 환기팬 & 냉각수 칠러</span>
                    <span className="text-blue-700 font-bold">정상 가동 (NORMAL)</span>
                  </div>
                  <p className="text-[11px] text-blue-800 leading-relaxed">
                    도료 고속 분산 공정 시 발생하는 마찰열을 칠러 냉각수로 제어 중이며, 배기 압력 120 Pa을 정상 유지하고 있습니다.
                  </p>
                </div>
              </div>

              {/* 우측: DowntimeSection (비가동 등록 섹션) */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span>비가동 / 유실 사유 등록</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">가동률: 98.2%</span>
                </div>

                <div className="space-y-3 mt-1">
                  <div>
                    <label className="text-xs font-bold text-slate-600 mb-1 block">비가동 대분류</label>
                    <select className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-500">
                      <option value="DT-MECH">설비 보전 (기계/전기 이상 점검)</option>
                      <option value="DT-LINE">공정 대기 (원료 지연 및 QC 승인 대기)</option>
                      <option value="DT-CLEAN">세척 및 제품 교체 (CIP 세척)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 mb-1 block">상세 사유</label>
                    <input
                      type="text"
                      placeholder="비가동 발생 시 상세 원인 기재"
                      defaultValue="정상 가동 중 (특이 비가동 내역 없음)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => alert('비가동 등록 내역이 없습니다.')}
                      className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition-colors"
                    >
                      비가동 발생 즉시 등록
                    </button>
                  </div>

                  <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block mb-1">【설비 가동 요약】</span>
                    <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                      <li>분산 블레이드: High-Shear Disc (Φ600mm)</li>
                      <li>윤활유 압력: 0.35 MPa (정상 범위)</li>
                      <li>베어링 진동: 1.8 mm/s (안정 상태)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===================== [서브스텝 4: 설비 완료 (EquipmentComplete)] ===================== */}
          {currentSubStep === 'equipmentComplete' && (
            <motion.div
              key="equipmentComplete"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="max-w-3xl mx-auto space-y-4"
            >
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    <span>설비 교반 공정 완료 확인</span>
                  </h3>
                  <span className="text-xs font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded font-bold">
                    교반 정지됨 (STOP)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">설비 시작 시간</span>
                    <span className="font-mono font-bold text-slate-900">{equipStartTime}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">설비 완료 시간</span>
                    <span className="font-mono font-bold text-blue-700">{equipEndTime}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">총 교반 시간</span>
                    <span className="font-mono font-bold text-slate-900">45분 00초 (적합)</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">최종 배합조 온도</span>
                    <span className="font-mono font-bold text-slate-900">{temperature} ℃</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentSubStep('inspection')}
                    className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xs flex items-center justify-center gap-2"
                  >
                    <span>다음 단계 (중간 품질 검사) 진행</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
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
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <ClipboardCheck className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">중간 품질 검사 성적서 연동 (LIMS 연계)</h3>
                    <p className="text-xs text-slate-500 mt-0.5">점도, 비중, 입도, 색차 등 5대 화학 품질 지표 시험 전 항목 적합 판정</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('품질관리실(QC Lab)로 검사의뢰가 접수되었습니다.')}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300"
                  >
                    검사의뢰 재요청
                  </button>
                  <button
                    onClick={() => alert('대체 검사값 수기 입력 모달이 열립니다.')}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300"
                  >
                    검사결과 수기입력
                  </button>
                  <button
                    onClick={() => {
                      setSubSteps(prev => prev.map(s => s.key === 'inspection' ? { ...s, status: 'End' } : s));
                      setCurrentSubStep('workComplete');
                    }}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                  >
                    <span>검사 마감 ➔ 작업 완료 단계 이동</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 검사항목 그리드 */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>도료 품질 검사 성적서 (품질 판정 항목)</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">검사원: 책임연구원 한승우 (승인완료)</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-3 text-center">차수</th>
                        <th className="py-3 px-4">검사항목</th>
                        <th className="py-3 px-3 text-center">Target</th>
                        <th className="py-3 px-3 text-right">하한값</th>
                        <th className="py-3 px-3 text-right">상한값</th>
                        <th className="py-3 px-3 text-right font-black text-blue-700">실측 검사값</th>
                        <th className="py-3 px-3 text-center">판정</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono">
                      {inspectionData.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 text-center font-sans text-slate-500">{item.count}</td>
                          <td className="py-3 px-4 font-sans font-bold text-slate-900">{item.item}</td>
                          <td className="py-3 px-3 text-center text-slate-600">{item.target}</td>
                          <td className="py-3 px-3 text-right text-slate-500">{item.min}</td>
                          <td className="py-3 px-3 text-right text-slate-500">{item.max}</td>
                          <td className="py-3 px-3 text-right font-black text-blue-700 text-sm">{item.value}</td>
                          <td className="py-3 px-3 text-center font-sans">
                            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
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
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Scale className="w-6 h-6 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-black text-slate-900">공정 실적 집계 및 최종 작업 완료</h3>
                      <p className="text-xs text-slate-500 mt-0.5">양품 완성량 계량 및 비관적 락(Pessimistic Lock) 최종 확정</p>
                    </div>
                  </div>
                  <button
                    onClick={handleMeasureWeight}
                    disabled={isMeasuringWeight}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-500 text-white font-bold text-xs shadow-xs transition-all border border-blue-500"
                  >
                    <Scale className="w-4 h-4" />
                    <span>{isMeasuringWeight ? '로드셀 무게 수신중...' : '무게 실시간 계량 수신'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">지시 수량</span>
                    <span className="text-xl font-black text-slate-900 font-mono">{totalOrderQty.toFixed(2)} KG</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">원료 실투입량</span>
                    <span className="text-xl font-black text-blue-700 font-mono">{totalInputQty.toFixed(2)} KG</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">완성량 (양품 실적)</span>
                    <span className="text-xl font-black text-blue-800 font-mono">{completeGoodQty.toFixed(2)} KG</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 block mb-1">공정 LOSS량</span>
                    <span className="text-xl font-black text-slate-700 font-mono">{lossQty.toFixed(2)} KG (0.4%)</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="secondCooling"
                      checked={isSecondCoolingRequired}
                      onChange={e => setIsSecondCoolingRequired(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="secondCooling" className="text-xs font-bold text-slate-700 cursor-pointer">
                      2차 추가 냉각 필요 여부 (필요 시 조제 탱크 2시간 정치)
                    </label>
                  </div>
                  <span className="text-xs font-mono text-slate-500">연동 저울: {scaleDeviceName}</span>
                </div>

                {/* 대형 작업 완료 확정 버튼 (선명한 블루) */}
                <div className="pt-2">
                  <button
                    onClick={handleFinalWorkComplete}
                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-black text-base sm:text-lg shadow-md flex items-center justify-center gap-3 transition-all cursor-pointer"
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

      {/* 6. WorkOperationBottomNavigation (하단 고정 내비게이션 바 - 화이트 & 블루) */}
      <div className="bg-white border-t border-slate-200 px-3 py-2.5 shadow-md">
        <div className="max-w-[1700px] mx-auto grid grid-cols-4 sm:grid-cols-7 gap-2">
          <button
            onClick={() => {
              setCurrentSubStep('preparation');
              setSelectedProcessStep('2_DISP');
            }}
            className="py-2.5 px-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 active:scale-95 text-xs font-bold text-slate-700 flex flex-col items-center justify-center gap-1 border border-slate-200 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-blue-600" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setIsInspectionResultModalOpen(true)}
            className="py-2.5 px-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 active:scale-95 text-xs font-bold text-slate-700 flex flex-col items-center justify-center gap-1 border border-slate-200 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>검사 결과</span>
          </button>

          <button
            onClick={() => setIsSopModalOpen(true)}
            className="py-2.5 px-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 active:scale-95 text-xs font-bold text-slate-700 flex flex-col items-center justify-center gap-1 border border-slate-200 transition-all cursor-pointer"
          >
            <ClipboardCheck className="w-4 h-4 text-blue-600" />
            <span>S.O.P 지침</span>
          </button>

          <button
            onClick={() => setCurrentSubStep('equipmentStart')}
            className="py-2.5 px-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 active:scale-95 text-xs font-bold text-slate-700 flex flex-col items-center justify-center gap-1 border border-slate-200 transition-all cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Trend 곡선</span>
          </button>

          <button
            onClick={() => setIsPerformanceModalOpen(true)}
            className="py-2.5 px-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 active:scale-95 text-xs font-bold text-slate-700 flex flex-col items-center justify-center gap-1 border border-slate-200 transition-all cursor-pointer"
          >
            <History className="w-4 h-4 text-blue-600" />
            <span>실적 조회</span>
          </button>

          <button
            onClick={() => setIsSolventModalOpen(true)}
            className="py-2.5 px-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 active:scale-95 text-xs font-bold text-slate-700 flex flex-col items-center justify-center gap-1 border border-slate-200 transition-all cursor-pointer"
          >
            <Droplet className="w-4 h-4 text-blue-600" />
            <span>청소 용제</span>
          </button>

          <button
            onClick={() => setIsCommentModalOpen(true)}
            className="py-2.5 px-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 active:scale-95 text-xs font-bold text-slate-700 flex flex-col items-center justify-center gap-1 border border-slate-200 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Comment</span>
          </button>
        </div>
      </div>

      {/* ======================= 모달 팝업들 (클린 화이트 & 블루 테마) ======================= */}

      {/* 1. 공정 비고 / 주의사항 모달 */}
      <AnimatePresence>
        {isRemarksModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Info className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-black text-slate-900">공정 주의사항 및 특이사항 (비고)</h3>
                </div>
                <button
                  onClick={() => setIsRemarksModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="font-bold text-blue-900 block mb-1">【정전기 방지 및 방폭 주의】</span>
                  용제(자일렌) 투입 시 접지선(Earth Clip) 체결 상태를 육안 검증하고, 유속을 1.5 m/s 이하로 유지하여 인화 위험을 방지하십시오.
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">【안료 분산 기준】</span>
                  티타늄 디옥사이드 투입 후 15분간 저속(500 RPM) 예비 교반 후, 고속(1,250 RPM)으로 본 교반을 수행하여 입도 6.5 Hegman 이상을 확보하십시오.
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">【온도 관리 기준】</span>
                  에폭시 수지의 급격한 반응열 상승을 방지하기 위해 배합조 내부 온도가 55℃를 초과할 경우 냉각수 밸브 V-201을 100% 개방하십시오.
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsRemarksModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs cursor-pointer"
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
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-black text-slate-900">S.O.P 표준작업지침서 (속건 에폭시 프라이머)</h3>
                </div>
                <button
                  onClick={() => setIsSopModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 max-h-[60vh] overflow-y-auto">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">1단계: 설비 점검 및 캐리어 용기 소독</h4>
                  <p className="text-slate-600">교반기 블레이드 마모도, 축 패킹 오일 누유, 방폭 모터 절연 상태 확인.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">2단계: 원료 바코드 스캔 및 투입 순서</h4>
                  <p className="text-slate-600">1) 베이스 수지 850KG ➔ 2) 자일렌 200KG(1차) ➔ 3) TiO2 안료 380KG ➔ 4) 잔여 자일렌 220KG ➔ 5) 첨가제 순서 준수.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">3단계: 고속 분산 및 품질 채취</h4>
                  <p className="text-slate-600">1,250 RPM으로 45분간 분산 후 게이지 블록으로 입도 측정(6.5 이상 합격).</p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsSopModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 cursor-pointer"
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
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-blue-600" />
                  <span>공정 안전 및 품질 체크리스트</span>
                </h3>
                <button
                  onClick={() => setIsChecklistModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-800">
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:bg-blue-50/50">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" />
                  <span>교반기 날개 체결 볼트 토크 및 회전 방향 정상 확인</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:bg-blue-50/50">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" />
                  <span>배합조 탱크 어스 접지선 저항치 10Ω 이하 확인</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:bg-blue-50/50">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" />
                  <span>국소 배기 방폭 팬 작동 음압 형성 확인</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:bg-blue-50/50">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500" />
                  <span>원자재 LOT 바코드 일치 여부 및 포장 결함 여부 확인</span>
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsChecklistModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs cursor-pointer"
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
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>현장 조원 편성 관리</span>
                </h3>
                <button
                  onClick={() => setIsWorkerGroupModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 block">김재선 (정/책임)</span>
                    <span className="text-slate-500">사번: EMP-202104 | 화학생산1팀</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                    주작업자
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 block">박민우 (부/선임)</span>
                    <span className="text-slate-500">사번: EMP-202319 | 화학생산1팀</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-300">
                    보조
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsWorkerGroupModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs cursor-pointer"
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
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-blue-600" />
                  <span>세척/청소 용제 투입 이력</span>
                </h3>
                <button
                  onClick={() => setIsSolventModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-600 block mb-1 font-bold">세척 용제 품번</label>
                  <input
                    type="text"
                    readOnly
                    value="RM-SOLV-WASH01 (재생 톨루엔/자일렌 세척액)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1 font-bold">투입 용제량 (KG)</label>
                  <input
                    type="text"
                    defaultValue="45.0 KG"
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-blue-700 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsSolventModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
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
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span>현장 인수인계 코멘트 (Comment)</span>
                </h3>
                <button
                  onClick={() => setIsCommentModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                rows={4}
                defaultValue="[2교대 인계사항] 점도 81.4 KU로 상한 기준 내 안정적이며, 3단계 반응조 이송 펌프 P-04 토출 압력 정상임."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 font-sans"
              />

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setIsCommentModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  코멘트 등록
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. 실적 조회 모달 (새로 정돈된 실적 확인창) */}
      <AnimatePresence>
        {isPerformanceModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <History className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-black text-slate-900">당일 생산 실적 현황 조회</h3>
                </div>
                <button
                  onClick={() => setIsPerformanceModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">당일 목표 생산량 (Target)</span>
                  <span className="font-mono font-bold text-slate-900">7,400.00 KG (4 LOT)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">현재 누적 달성량</span>
                  <span className="font-mono font-bold text-blue-700">5,528.50 KG (진척율 74.7%)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">데이터 무결성 검증율</span>
                  <span className="font-mono font-bold text-blue-800">100.0% (Zero Data Loss)</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsPerformanceModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs cursor-pointer"
                >
                  확인
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. 최종 작업 완료 성공 팝업 */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white border-2 border-blue-600 rounded-3xl max-w-lg w-full p-8 shadow-2xl text-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-blue-600" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">공정 작업 완료 및 실적 확정</h3>
                <p className="text-sm text-slate-600 mt-2 font-mono">
                  LOT NO: <span className="text-blue-700 font-bold">25A0123-B01</span>
                </p>
                <p className="text-xs text-blue-600 mt-1 font-semibold">
                  비관적 락(Pessimistic Lock) 트랜잭션 정상 커밋 완료
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs font-mono space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">실투입량:</span>
                  <span className="font-bold text-slate-900">1,850.00 KG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">양품 완성량:</span>
                  <span className="font-bold text-blue-700">1,842.50 KG (99.59%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">LOSS량:</span>
                  <span className="font-bold text-slate-600">7.50 KG (0.41%)</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5">
                  <span className="text-slate-500 font-sans">다음 이관 공정:</span>
                  <span className="font-bold text-blue-700 font-sans">3_반응 (조정 및 첨가제 숙성)</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsSuccessModalOpen(false)}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 cursor-pointer"
                >
                  POP 화면 계속 확인
                </button>
                <button
                  onClick={onBack}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md cursor-pointer"
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
