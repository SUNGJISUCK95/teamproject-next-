package com.springboot.bicycle_app.dto.travel;

import com.springboot.bicycle_app.entity.travel.TravelFoodDetail;
import lombok.Data;

import java.util.List;

@Data
public class TravelFoodDetailDto {
    private int did;
    private String fname;
    private Double flike;
    private int score;
    private String tag;
    private String location;
    private String food;
    private String address;
    private String localAddress;
    private String business;
    private String phone;
    private String other;
    private String menu;
    private String mainImages;
    private String imageList;

    //Entity <=> Dto 변환
    public TravelFoodDetailDto() {}
    public TravelFoodDetailDto(TravelFoodDetail entity) {
        this.did = entity.getDid();
        this.fname = entity.getFname();
        this.flike = entity.getFlike();
        this.score = entity.getScore();
        this.tag = entity.getTag();
        this.location = entity.getLocation();
        this.food = entity.getFood();
        this.address = entity.getAddress();
        this.localAddress = entity.getLocalAddress();
        this.business = entity.getBusiness();
        this.phone = entity.getPhone();
        this.other = entity.getOther();
        this.menu = entity.getMenu();
        this.mainImages = entity.getMainImages();
        this.imageList = entity.getImageList();
    }
}
