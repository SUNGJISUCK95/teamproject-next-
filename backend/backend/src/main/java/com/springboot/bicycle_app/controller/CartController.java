package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.purchase.CartItemDto;
import com.springboot.bicycle_app.dto.purchase.CartItemRequestDto;
import com.springboot.bicycle_app.dto.purchase.CartListResponseDto;
import com.springboot.bicycle_app.service.purchase.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService){
        this.cartService = cartService;
    }

    @PostMapping("/delete")
    public int deleteItem(@RequestBody CartItemRequestDto requestDto){
        return cartService.deleteItem(requestDto);
    }

    @PostMapping("/list")
    public List<CartListResponseDto> findList(@RequestBody CartItemRequestDto requestDto){
        return cartService.findList(requestDto);
    }

    @PostMapping("/updateCart")
    public int updateQty(@RequestBody CartItemRequestDto requestDto){
        return cartService.updateQty(requestDto);
    }

    @PostMapping("/add")
    public int add(@RequestBody CartItemRequestDto requestDto){
        return cartService.add(requestDto);
    }
    @PostMapping("/toggleCheck")
    public int toggleCheck(@RequestBody CartItemRequestDto requestDto) {
        return cartService.toggleCheck(requestDto);
    }
}
