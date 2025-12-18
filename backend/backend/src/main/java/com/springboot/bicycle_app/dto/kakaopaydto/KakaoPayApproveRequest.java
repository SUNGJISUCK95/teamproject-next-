package com.springboot.bicycle_app.dto.kakaopaydto;

public class KakaoPayApproveRequest {
    private String aid;             // 요청 고유 번호
    private String tid;             // 결제 고유 번호 (Ready 단계와 동일)
    private String cid;             // 가맹점 코드
    private String sid;             // 정기결제용 SID (정기결제 사용 시)
    private String partner_order_id;// 가맹점 주문 번호 (rentalId)
    private String partner_user_id; // 가맹점 회원 ID (userId)
    private String payment_method_type; // 결제 수단 (CARD/MONEY)
    private String item_name;       // 상품 이름
    private int amount;             // 총 결제 금액

    // 금액 상세 정보 (Amount 객체로 상세 구현 가능)
    // private Amount amount;

    private String created_at;      // 결제 준비 요청 시각
    private String approved_at;     // 결제 승인 완료 시각
    private String payload;         // 기타 정보

    // Amount 객체는 보통 별도로 정의하지만, 단순화를 위해 필드에 포함할 경우
    // final class Amount {
    //     private Integer total;
    //     // ... tax_free 등
    // }
}
