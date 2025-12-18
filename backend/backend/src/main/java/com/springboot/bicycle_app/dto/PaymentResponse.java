package com.springboot.bicycle_app.dto;

import lombok.Builder;
import lombok.Getter;

// 카카오페이 API 응답 중 프론트엔드에 필요한 정보를 담는 DTO
@Getter
@Builder
public class PaymentResponse {
    private final String nextRedirectPcUrl;
    private final String nextRedirectMobileUrl;
    private final String qrCodeUrl;
}
