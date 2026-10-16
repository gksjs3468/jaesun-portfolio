import React from 'react';
import { ArrowLeft, ShieldCheck, Cpu, Code2 } from 'lucide-react';

interface MesCaseStudyProps {
  onBack: () => void;
}

export const MesCaseStudy: React.FC<MesCaseStudyProps> = ({ onBack }) => {
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
          <span className="px-2 py-0.5 rounded text-[11px] accent-pill font-bold">심층 아키텍처 & 코드 리뷰</span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
            <span className="h-4.5 w-auto bg-white px-1 py-0.5 rounded flex items-center justify-center border border-slate-200 shrink-0">
              <img src="/ci_ko.png" alt="조광페인트" className="h-3 w-auto object-contain" />
            </span>
            <span className="font-medium text-[11px] text-[var(--text-heading)]">에잇핀 / 조광페인트 화학공정 MES 생산 파트</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-heading)]">
          조광페인트 화학공정 MES 생산 파트: 설비 장애 방어 & 생산 실적 데이터 무결성 100%
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          현장 터치 POP 생산 실적 등록부터 Tank Mapping, 설비 통신 인터페이스 연동 및 네트워크 단절 시 롤백 방어 아키텍처
        </p>
      </header>

      {/* Main Content */}
      <main className="py-8 space-y-8">
        {/* Architecture Flowchart Card */}
        <div className="editorial-card p-5 sm:p-6 rounded-2xl">
          <h2 className="text-base font-bold text-[var(--text-heading)] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            1. 전체 시스템 아키텍처 및 데이터 흐름 다이어그램
          </h2>
          <div className="p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)] overflow-x-auto">
            <div className="min-w-[620px] text-xs font-mono space-y-3">
              <div className="flex items-center justify-between text-center gap-2">
                <div className="flex-1 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-heading)] font-bold">
                  [현장 POP 터치 단말]
                  <div className="text-[10px] font-normal mt-1 text-slate-600 dark:text-slate-400">React + DevExtreme</div>
                  <div className="text-[10px] font-normal text-[var(--text-muted)]">작업자 터치 / 바코드 스캔</div>
                </div>
                <div className="accent-text font-bold">⇄ (REST API / SSE) ⇄</div>
                <div className="flex-1 p-3 rounded-xl bg-[var(--bg-card)] border-2 border-[var(--accent)] text-[var(--text-heading)] font-bold shadow-xs">
                  [MES Core Backend]
                  <div className="text-[10px] font-semibold mt-1 accent-text">Java Spring Boot 3.x</div>
                  <div className="text-[10px] font-normal text-[var(--text-muted)]">상태 전이 & 트랜잭션 롤백</div>
                </div>
                <div className="accent-text font-bold">⇄ (PLC / Modbus) ⇄</div>
                <div className="flex-1 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-heading)] font-bold">
                  [공장 설비 & PLC]
                  <div className="text-[10px] font-normal mt-1 text-slate-600 dark:text-slate-400">교반기 / Tank 센서</div>
                  <div className="text-[10px] font-normal text-[var(--text-muted)]">실시간 RPM, 온도, 유량 계측</div>
                </div>
              </div>

              {/* Fallback Box */}
              <div className="p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-body)] text-[11px] leading-relaxed">
                <span className="font-bold text-[var(--text-heading)]">🛡️ 통신 장애 방어 메커니즘:</span>{' '}
                현장 설비 통신 지연 또는 센서 단절 발생 시 즉각 에러를 발생시키지 않고,{' '}
                백엔드 상태 머신이 <span className="underline font-bold accent-text">`STAGING_BUFFER`</span> 상태로 전환하여 최대 3회 재시도(Exponential Backoff)를 수행하며,{' '}
                실패 확정 시 작업자의 오투입을 방지하기 위해 원자적 트랜잭션 롤백을 단행합니다.
              </div>
            </div>
          </div>
        </div>

        {/* Code Review */}
        <div className="editorial-card p-5 sm:p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--border-subtle)]">
            <h2 className="text-base font-bold text-[var(--text-heading)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              2. 핵심 코드 리뷰: 작업 실적 등록 및 설비 연동 롤백 방어 로직 (Java Spring Boot)
            </h2>
            <span className="text-xs px-2 py-0.5 rounded accent-pill font-bold">Production Architecture</span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-3">
            열악한 화학 공장 현장의 설비 통신 단절 및 작업자의 중복 클릭(더블 서브밋)을 원천 방지하는 트랜잭션 격리 및 멱등성 보장 코드입니다.
          </p>

          <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950 text-slate-200 text-xs">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>ProductionExecutionService.java</span>
              <span>Spring Boot / JPA / Retryable</span>
            </div>
            <pre className="p-4 overflow-x-auto leading-relaxed font-mono"><code>{`@Service
@RequiredArgsConstructor
@Slf4j
public class ProductionExecutionService {

    private final WorkOrderRepository workOrderRepo;
    private final TankMappingService tankMappingService;
    private final EquipmentGatewayClient equipmentGateway;
    private final ProductionAuditRepository auditRepo;

    /**
     * 공정 실적 완료 및 설비 실시간 계측 데이터 원자적 반영
     * 1. 멱등성 검증 (중복 완료 방지)
     * 2. Tank 재고 차감 및 락 획득
     * 3. 설비 계측 패킷 전송 (네트워크 장애 시 선제적 Retry & Rollback)
     */
    @Transactional(rollbackFor = Exception.class, isolation = Isolation.READ_COMMITTED)
    @Retryable(value = { EquipmentCommunicationException.class }, maxAttempts = 3, backoff = @Backoff(delay = 1000, multiplier = 2))
    public WorkOrderResultResponse completeProductionProcess(Long workOrderId, ProductionResultRequest request) {
        
        // Step 1. 멱등성 검증 및 작업 상태 검사
        WorkOrder workOrder = workOrderRepo.findByIdWithPessimisticLock(workOrderId)
                .orElseThrow(() -> new EntityNotFoundException("작업 지시 정보를 찾을 수 없습니다: " + workOrderId));

        if (workOrder.getStatus() != ProcessStatus.RUNNING) {
            log.warn("[MES-POP] 유효하지 않은 공정 상태 전이 시도: current={}, target=COMPLETED", workOrder.getStatus());
            throw new InvalidProcessStateException("현재 작업이 진행 중(RUNNING) 상태가 아닙니다.");
        }

        // Step 2. Tank Mapping 검증 및 화학 원료 소모 차감
        tankMappingService.verifyAndDeductRawMaterial(
            workOrder.getLineCode(), 
            request.getAssignedTankNo(), 
            request.getConsumedQuantity()
        );

        // Step 3. 설비 I/F 연동 (장비 종료 신호 전송 및 계측치 수신)
        try {
            EquipmentTelemetry telemetry = equipmentGateway.requestProcessCompletion(workOrder.getEquipmentId());
            workOrder.recordTelemetry(telemetry.getFinalRpm(), telemetry.getFinalTemperature());
        } catch (Exception e) {
            log.error("[MES-POP-FAIL] 설비 통신 인터페이스 연동 실패 - 원자적 롤백 트리거: workOrderId={}", workOrderId, e);
            throw new EquipmentCommunicationException("설비 통신 오류로 인해 실적 등록이 중단되었습니다. 현장 장비 상태를 확인하세요.", e);
        }

        // Step 4. 최종 실적 등록 및 공정 완료 확정
        workOrder.complete(request.getActualQuantity(), request.getDefectQuantity());
        auditRepo.save(new ProductionAuditLog(workOrderId, "COMPLETE", request.getOperatorId()));

        log.info("[MES-POP-SUCCESS] 조광페인트 작업 완료 정상 등록: orderId={}, tank={}", workOrderId, request.getAssignedTankNo());
        return WorkOrderResultResponse.from(workOrder);
    }
}`}</code></pre>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              💡 비관적 락(Pessimistic Lock)으로 동시성 제어
            </span>
            <p className="text-[var(--text-body)] leading-relaxed">
              현장 태블릿과 메인 PC에서 동일 작업지시에 대해 동시에 '완료' 버튼을 누르더라도 데이터 정합성이 깨지지 않도록 DB 비관적 락을 적용하여 트랜잭션 충돌을 차단했습니다.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--bg-muted)] border border-[var(--border-subtle)]">
            <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
              🛡️ 장애 복구 자동화로 현장 대기시간 단축
            </span>
            <p className="text-[var(--text-body)] leading-relaxed">
              통신 스파이크에 의한 일시 단절은 지수 백오프(Exponential Backoff)로 무인 복구하고, 영구 단절 시에는 즉시 안전 롤백 후 원인 코드를 POP 화면에 즉각 표시합니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
