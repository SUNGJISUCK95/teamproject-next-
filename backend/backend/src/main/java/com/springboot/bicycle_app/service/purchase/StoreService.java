package com.springboot.bicycle_app.service.purchase;

import com.springboot.bicycle_app.dto.purchase.StoreDto;

import java.util.List;

public interface StoreService {
    List<StoreDto> findAll();
}
