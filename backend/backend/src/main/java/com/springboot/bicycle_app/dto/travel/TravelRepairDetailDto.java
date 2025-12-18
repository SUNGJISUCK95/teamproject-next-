package com.springboot.bicycle_app.dto.travel;

import com.springboot.bicycle_app.entity.travel.TravelRepairDetail;
import lombok.Data;

@Data
public class TravelRepairDetailDto {
    private int did;
    private String rname;
    private Double rlike;
    private int score;
    private String tag;
    private String location;
    private String repair;
    private String address;
    private String localAddress;
    private String business;
    private String phone;
    private String other;
    private String menu;
    private String mainImages;
    private String imageList;

    //Entity <=> Dto 변환
    public TravelRepairDetailDto() {}
    public TravelRepairDetailDto(TravelRepairDetail entity) {
        this.did = entity.getDid();
        this.rname = entity.getRname();
        this.rlike = entity.getRlike();
        this.score = entity.getScore();
        this.tag = entity.getTag();
        this.location = entity.getLocation();
        this.repair = entity.getRepair();
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
