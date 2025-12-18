package com.springboot.bicycle_app.dto.kakaopaydto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RentalStatusDetails {
    // 결제 성공 여부 검증용 필드
    private String finalStatus; // 카카오페이 기록의 최종 상태 (e.g., "APPROVED", "FAILED_APPROVE")
    private String rentalState; // 렌탈 기록의 최종 상태 (e.g., "대여 중", "대기")
    private String failureReason; // 실패 시 오류 메시지 (성공 시 null)

    // 프론트엔드에 보여줄 상세 정보
    private String partnerOrderId; // 주문 번호
    private String userId;
    private String bikeId;          // 대여된 자전거의 고유 번호
    private String stationName;     // 대여 스테이션 이름
    private LocalDateTime startTime; // 대여 시작 시각
}