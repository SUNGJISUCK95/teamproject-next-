package com.springboot.bicycle_app.dto.travel;

import com.springboot.bicycle_app.entity.travel.TravelRepairReview;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TravelRepairReviewDto {
    private int rrid;
    private String uid;
    private String userImage;
    private String userFllowers;
    private int rid;
    private Double star;
    private String content;
    private LocalDate date;
    private String imageList;

    //Entity <=> Dto 변환
    public TravelRepairReviewDto() {}
    public TravelRepairReviewDto(TravelRepairReview entity) {
        this.rrid = entity.getRrid();
        this.uid = entity.getUid();
        this.userImage = entity.getUserImage();
        this.userFllowers = entity.getUserFllowers();
        this.rid = entity.getRid();
        this.star = entity.getStar();
        this.content = entity.getContent();
        this.date = entity.getDate();
        this.imageList = entity.getImageList();
    }
}
