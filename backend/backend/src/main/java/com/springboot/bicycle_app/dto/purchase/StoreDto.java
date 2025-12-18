package com.springboot.bicycle_app.dto.purchase;

import com.springboot.bicycle_app.entity.purchase.Store;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class StoreDto {
    private Long sid;
    private String name;
    private String address;
    private String phone;
    private BigDecimal lat;
    private BigDecimal lng;
    private String url;

    public StoreDto(){}
    public StoreDto(Store entity){
        this.sid = entity.getSid();
        this.name = entity.getName();
        this.address = entity.getAddress();
        this.phone = entity.getPhone();
        this.lat = entity.getLat();
        this.lng = entity.getLng();
        this.url = entity.getUrl();
    }
}
