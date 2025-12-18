package com.springboot.bicycle_app.dto.travel;

import com.springboot.bicycle_app.entity.travel.TravelRepair;
import lombok.Data;

import java.util.List;

@Data
public class TravelRepairDto {
    private int rid;
    private String region;
    private String rname;
    private Double lat;
    private Double lng;
    private Double rlike;
    private int score;
    private int evaluation;
    private String tag;
    private String image1;
    private String image2;
    private String image3;
    private String fullImage1;
    private String fullImage2;
    private String fullImage3;
    private String description;

    //Entity <=> Dto 변환
    public TravelRepairDto() {}
    public TravelRepairDto(TravelRepair entity) {
        this.rid = entity.getRid();
        this.region = entity.getRegion();
        this.rname = entity.getRname();
        this.lat = entity.getLat();
        this.lng = entity.getLng();
        this.rlike = entity.getRlike();
        this.score = entity.getScore();
        this.evaluation = entity.getEvaluation();
        this.tag = entity.getTag();
        this.image1 = entity.getImage1();
        this.image2 = entity.getImage2();
        this.image3 = entity.getImage3();
        this.fullImage1 = entity.getFullImage1();
        this.fullImage2 = entity.getFullImage2();
        this.fullImage3 = entity.getFullImage3();
        this.description = entity.getDescription();
    }
}
