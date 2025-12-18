package com.springboot.bicycle_app.service.kakaopayservice;

import com.springboot.bicycle_app.dto.RentalPaymentRequest;
import com.springboot.bicycle_app.dto.kakaopaydto.KakaoPayReadyResponse;

public interface KakaoPayService {
    KakaoPayReadyResponse readyToPay(RentalPaymentRequest request);

    // pg_token 외에, 승인 시 필요한 partner_order_id도 파라미터로 받는다
    void approvePay(String partnerOrderId, String pgToken);
}
