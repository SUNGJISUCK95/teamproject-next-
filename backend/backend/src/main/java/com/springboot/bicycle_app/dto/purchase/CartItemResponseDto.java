package com.springboot.bicycle_app.dto.purchase;

import com.springboot.bicycle_app.entity.purchase.Product;
import com.springboot.bicycle_app.entity.userinfo.UserInfo;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CartItemResponseDto {
    private long cid;
    private Product product;
    private UserInfo user;
    private int sumQty;
    private long checkQty;
    private LocalDate cdate;
}
