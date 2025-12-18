package com.springboot.bicycle_app.service.purchase;

import com.springboot.bicycle_app.dto.purchase.OrderRequestDto;
import com.springboot.bicycle_app.dto.purchase.OrderResponseDto;
import com.springboot.bicycle_app.dto.purchase.TossPayDto;
import com.springboot.bicycle_app.entity.purchase.Order;

import java.util.List;

public interface OrderService {
    Object confirmPayment(TossPayDto dto);
    Order createOrder(OrderRequestDto requestDto);
    List<OrderResponseDto> findList(OrderRequestDto dto);
}
