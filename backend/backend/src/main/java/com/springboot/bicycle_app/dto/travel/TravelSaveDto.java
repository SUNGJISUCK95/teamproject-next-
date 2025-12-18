package com.springboot.bicycle_app.dto.travel;

import com.springboot.bicycle_app.entity.travel.TravelSave;
import lombok.Data;

import java.util.List;

@Data
public class TravelSaveDto {
    private int sid;
    private String uid;
    private String fid;
    private String hid;
    private String rid;

    //Entity <=> Dto 변환
    public TravelSaveDto() {}
    public TravelSaveDto(TravelSave entity) {
        this.sid = entity.getSid();
        this.uid = entity.getUid();
        this.fid = entity.getFid();
        this.hid = entity.getHid();
        this.rid = entity.getRid();
    }
}