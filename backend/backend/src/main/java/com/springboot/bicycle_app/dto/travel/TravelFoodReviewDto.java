package com.springboot.bicycle_app.dto.travel;

import com.springboot.bicycle_app.entity.travel.TravelFoodReview;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TravelFoodReviewDto {
    private int frid;
    private String uid;
    private String userImage;
    private String userFllowers;
    private int fid;
    private Double star;
    private String content;
    private LocalDate date;
    private String imageList;

    //Entity <=> Dto 변환
    public TravelFoodReviewDto() {}
    public TravelFoodReviewDto(TravelFoodReview entity) {
        this.frid = entity.getFrid();
        this.uid = entity.getUid();
        this.userImage = entity.getUserImage();
        this.userFllowers = entity.getUserFllowers();
        this.fid = entity.getFid();
        this.star = entity.getStar();
        this.content = entity.getContent();
        this.date = entity.getDate();
        this.imageList = entity.getImageList();
    }
}
