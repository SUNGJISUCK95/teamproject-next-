package com.springboot.bicycle_app.dto.kakaopaydto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KakaoPayReadyRequest {
    private String cid;
    private String partner_order_id; // rentalId 사용
    private String partner_user_id;  // userId 사용
    private String item_name;
    private int quantity;
    private int total_amount;
    private int tax_free_amount;
    private String approval_url;
    private String cancel_url;
    private String fail_url;
}
