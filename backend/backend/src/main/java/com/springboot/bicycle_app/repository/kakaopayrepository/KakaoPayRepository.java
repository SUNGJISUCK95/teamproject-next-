package com.springboot.bicycle_app.repository.kakaopayrepository;

public interface KakaoPayRepository {
    //결제 준비 후 TID와 주문 정보를 DB에 저장 (초기 상태: READY)
    void saveReadyPayment(String tid, String partnerOrderId, String partnerUserId, int amount);

    //최종 승인 시 필요한 TID 및 사용자 ID를 조회
    String findTidByOrderId(String partnerOrderId);

    // 최종 승인 시 필요한 사용자 ID를 조회
    String findUserIdByOrderId(String partnerOrderId);

    String findOrderIdByUserId(String partnerUserId);

    //최종 승인 후 결제 상태 업데이트
    void updatePaymentStatus(String partnerOrderId, String status);
}
