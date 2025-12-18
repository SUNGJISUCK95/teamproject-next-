package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.purchase.ProductDto;
import com.springboot.bicycle_app.service.purchase.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    public final ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/{category}")
    public List<ProductDto> getProductList(@PathVariable String category){
        System.out.println("1111"+category);
        return productService.findByCategory(category);
    }

    @GetMapping("/{category}/{pid}")
    public ProductDto getProduct(@PathVariable String category,@PathVariable String pid){
        return productService.findByCategoryAndPid(category, pid);
    }
}
