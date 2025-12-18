package com.springboot.bicycle_app.dto.purchase;

import com.springboot.bicycle_app.entity.purchase.Order;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
@NoArgsConstructor
public class OrderResponseDto {
    private String orderId;
    private String odate;
    private String orderName;
    private int totalPrice;

    //Entity => Dto
    public OrderResponseDto(Order order){
        this.orderId = order.getOrderId();
        this.odate = order.getOdate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        this.orderName = order.getOrderName();
        this.totalPrice = order.getTotalPrice();
    }
}
