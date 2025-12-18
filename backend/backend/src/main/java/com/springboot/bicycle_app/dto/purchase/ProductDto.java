package com.springboot.bicycle_app.dto.purchase;

import com.springboot.bicycle_app.entity.purchase.Product;
import lombok.*;

import java.util.List;

@Data
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private long product_id;
    private String pid;
    private String category;
    private String image;
    private String name;
    private long price;
    private String color;
    private String subinfo;
    private List<String> description;


    public ProductDto(Product entity){
        this.product_id = entity.getProduct_id();
        this.pid = entity.getPid();
        this.category = entity.getCategory();
        this.image = entity.getImage();
        this.name = entity.getName();
        this.price = entity.getPrice();
        this.color = entity.getColor();
        this.subinfo = entity.getSubinfo();
        this.description = entity.getDescription();
    }
}

