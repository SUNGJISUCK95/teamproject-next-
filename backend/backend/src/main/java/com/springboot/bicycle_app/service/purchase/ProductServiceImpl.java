package com.springboot.bicycle_app.service.purchase;

import com.springboot.bicycle_app.dto.purchase.ProductDto;
import com.springboot.bicycle_app.entity.purchase.Product;
import com.springboot.bicycle_app.repository.JpaProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    private final JpaProductRepository jpaProductRepository;
    @Autowired
    public ProductServiceImpl(JpaProductRepository jpaProductRepository){
        this.jpaProductRepository = jpaProductRepository;
    }
    @Override
    public ProductDto findByCategoryAndPid(String category, String pid){
        Product entity = jpaProductRepository.findByCategoryAndPid(category, pid);
        return new ProductDto(entity);
    }

    @Override
    public List<ProductDto> findByCategory(String category){
        List<ProductDto> plist = new ArrayList<>();
//        System.out.println("2222");
        List<Product> list =jpaProductRepository.findByCategory(category);
//        System.out.println("3333" + list);
        list.forEach(product -> plist.add(new ProductDto(product)));
        return plist;
    }
}
