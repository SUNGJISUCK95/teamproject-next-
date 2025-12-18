package com.springboot.bicycle_app.dto.purchase;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderRequestDto {
    private String userId;
    private long amount;
    private String orderName;
    private String uaddress;
    private String postcode;
}
