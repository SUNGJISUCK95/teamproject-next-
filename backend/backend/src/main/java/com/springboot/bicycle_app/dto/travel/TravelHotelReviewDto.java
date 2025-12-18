package com.springboot.bicycle_app.dto.travel;

import com.springboot.bicycle_app.entity.travel.TravelHotelReview;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TravelHotelReviewDto {
    private int hrid;
    private String uid;
    private String userImage;
    private String userFllowers;
    private int hid;
    private Double star;
    private String content;
    private LocalDate date;
    private String imageList;

    //Entity <=> Dto 변환
    public TravelHotelReviewDto() {}
    public TravelHotelReviewDto(TravelHotelReview entity) {
        this.hrid = entity.getHrid();
        this.uid = entity.getUid();
        this.userImage = entity.getUserImage();
        this.userFllowers = entity.getUserFllowers();
        this.hid = entity.getHid();
        this.star = entity.getStar();
        this.content = entity.getContent();
        this.date = entity.getDate();
        this.imageList = entity.getImageList();
    }
}
