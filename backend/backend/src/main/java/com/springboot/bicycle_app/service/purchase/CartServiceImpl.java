package com.springboot.bicycle_app.service.purchase;

import com.springboot.bicycle_app.dto.purchase.CartItemDto;
import com.springboot.bicycle_app.dto.purchase.CartItemRequestDto;
import com.springboot.bicycle_app.dto.purchase.CartListResponseDto;
import com.springboot.bicycle_app.entity.purchase.CartItem;
import com.springboot.bicycle_app.entity.userinfo.UserInfo;
import com.springboot.bicycle_app.entity.purchase.Product;
import com.springboot.bicycle_app.repository.JpaCartRepository;
import com.springboot.bicycle_app.repository.JpaProductRepository;
import com.springboot.bicycle_app.repository.JpaUserInfoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartServiceImpl implements CartService{
//    private final int TEST_USER_UNUM = 1;
    public final JpaCartRepository jpaCartRepository;
    private final JpaProductRepository jpaProductRepository;
    private final JpaUserInfoRepository jpaUserInfoRepository;
    @Autowired
    public CartServiceImpl(JpaCartRepository jpaCartRepository, JpaProductRepository jpaProductRepository, JpaUserInfoRepository jpaUserInfoRepository){
        this.jpaCartRepository = jpaCartRepository;
        this.jpaProductRepository = jpaProductRepository;
        this.jpaUserInfoRepository = jpaUserInfoRepository;
    }
    @Override
    public int deleteItem(CartItemRequestDto requestDto){
        return jpaCartRepository.deleteItem(requestDto.getCid());
    }
    @Override
    public List<CartListResponseDto> findList(CartItemRequestDto requestDto){
        List<CartListResponseDto> list = new ArrayList<>();
        List<CartItem> cartItemList = jpaCartRepository.findList(requestDto.getUid());
        long totalPrice = cartItemList.stream()
                .mapToLong(item -> item.getQty() * item.getProduct().getPrice())
                .sum();
        cartItemList.forEach(cartItem -> {
            CartListResponseDto dto = new CartListResponseDto(cartItem, totalPrice);
            list.add(dto);
        });
        return list;
    }
    @Override
    public int updateQty(CartItemRequestDto requestDto){
        int result =0;
        if(requestDto.getType().equals("+")){
            result = jpaCartRepository.increaseQty(requestDto.getCid());
        } else {
            result = jpaCartRepository.decreaseQty(requestDto.getCid());
        }
        return result;
    }
    @Override
    public int add(CartItemRequestDto requestDto) {
        Optional<CartItem> existingCartItem = jpaCartRepository.findByUidAndProductId(
                requestDto.getUid(),
                requestDto.getProduct_id()
        );
        CartItem entity;
        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            cartItem.setQty(cartItem.getQty() + requestDto.getQty());
            entity = jpaCartRepository.save(cartItem);
        } else {
            Product product = jpaProductRepository.findByPid(requestDto.getProduct_id());
            UserInfo user = jpaUserInfoRepository.findById(requestDto.getUid())
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));
            CartItem newCartItem = new CartItem(requestDto, product, user);
            entity = jpaCartRepository.save(newCartItem);
        }
        if(entity != null) return 1;
        return 0;
    }

    @Override
    public int toggleCheck(CartItemRequestDto requestDto) {
        return jpaCartRepository.toggleCheck(requestDto.getCid());
    }

}
