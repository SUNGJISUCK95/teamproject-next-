package com.springboot.bicycle_app.service.purchase;

import com.springboot.bicycle_app.dto.purchase.CartItemDto;
import com.springboot.bicycle_app.dto.purchase.CartItemRequestDto;
import com.springboot.bicycle_app.dto.purchase.CartListResponseDto;

import java.util.List;

public interface CartService {
    int deleteItem(CartItemRequestDto requestDto);
    List<CartListResponseDto> findList(CartItemRequestDto requestDto);
    int updateQty(CartItemRequestDto requestDto);
    int add(CartItemRequestDto requestDto);
    int toggleCheck(CartItemRequestDto requestDto);
}
