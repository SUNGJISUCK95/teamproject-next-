package com.springboot.bicycle_app.dto.purchase;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TossPayDto {
    private String orderId;
    private String paymentKey;
    private long amount;
    private String userId;
    private String orderName;
}
