package com.springboot.bicycle_app.dto.purchase;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CartItemRequestDto {
    private long cid;
    private long product_id;
    private int qty;
    private String type;
    private boolean checked;
    private LocalDate cdate;
    private String uid;
}
