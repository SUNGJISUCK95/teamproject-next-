package com.springboot.bicycle_app.dto.travel;

import com.springboot.bicycle_app.entity.travel.TravelHotelDetail;
import lombok.Data;

import java.util.List;

@Data
public class TravelHotelDetailDto {
    private int did;
    private String hname;
    private Double hlike;
    private int score;
    private String tag;
    private String location;
    private String hotel;
    private String address;
    private String localAddress;
    private String business;
    private String phone;
    private String other;
    private String menu;
    private String mainImages;
    private String imageList;

    //Entity <=> Dto 변환
    public TravelHotelDetailDto() {}
    public TravelHotelDetailDto(TravelHotelDetail entity) {
        this.did = entity.getDid();
        this.hname = entity.getHname();
        this.hlike = entity.getHlike();
        this.score = entity.getScore();
        this.tag = entity.getTag();
        this.location = entity.getLocation();
        this.hotel = entity.getHotel();
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
