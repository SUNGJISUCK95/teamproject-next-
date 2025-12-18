package com.springboot.bicycle_app.dto.purchase;

import com.springboot.bicycle_app.entity.purchase.CartItem;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Setter @Getter
public class CartListResponseDto {
    private long cid;
    private String uid;
    private String uname;
    private String uphone;
    private String uemail;
    private String uaddress;
    private String postcode;
    private long product_id;
    private String category;
    private String name;
    private String subinfo;
    private List<String> desciption;
    private String image;
    private long price;
    private String color;
    private int qty;
    private long totalPrice;

    private CartListResponseDto(){}
    public CartListResponseDto(CartItem entity, long totalPrice){
        this.cid = entity.getCid();
        this.uid = entity.getUser().getUid();
        this.uname = entity.getUser().getUname();
        this.uphone = entity.getUser().getUphone();
        this.uemail = entity.getUser().getUemail();
        this.uaddress = entity.getUser().getUaddress();
        this.postcode = entity.getUser().getPostcode();
        this.product_id = entity.getProduct().getProduct_id();
        this.category = entity.getProduct().getCategory();
        this.name = entity.getProduct().getName();
        this.subinfo = entity.getProduct().getSubinfo();
        this.desciption = entity.getProduct().getDescription();
        this.image = entity.getProduct().getImage();
        this.price = entity.getProduct().getPrice();
        this.color = entity.getProduct().getColor();
        this.qty = entity.getQty();
        this.totalPrice = totalPrice;
    }
}
