package com.springboot.bicycle_app.dto.kakaopaydto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KakaoPayApproveResponse {
    private String cid;             // 가맹점 코드
    private String tid;             // 결제 준비 단계에서 받은 TID (필수)
    private String partner_order_id;// 가맹점 주문 번호 (rentalId 사용)
    private String partner_user_id; // 가맹점 회원 ID (userId 사용)
    private String pg_token;        // 카카오페이 리다이렉트로 받은 PG Token (필수)
}
