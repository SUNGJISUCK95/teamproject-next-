package com.springboot.bicycle_app.dto.purchase;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OrderListDto {
    //user
    private String userId;
    private String userName;
    //product
    private String image;
    //order
    private String orderName;
    private int totalPrice;
    private LocalDateTime odate;
    private String postcode;
    private String uaddress;
    //orderItem
    private long price;
    private int qty;
}
