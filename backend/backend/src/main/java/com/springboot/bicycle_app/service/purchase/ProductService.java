package com.springboot.bicycle_app.service.purchase;

import com.springboot.bicycle_app.dto.purchase.ProductDto;

import java.util.List;

public interface ProductService {
    ProductDto findByCategoryAndPid(String category, String pid);
    List<ProductDto> findByCategory(String category);
}
