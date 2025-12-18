package com.springboot.bicycle_app.dto;

import com.springboot.bicycle_app.entity.userinfo.UserInfo;
import lombok.Data;

@Data
public class UserInfoDto {
    private String uid;
    private String upass;
    private String uname;
    private int uage;
    private String ugender;
    private String uaddress;
    private String postcode;
    private String uemail;
    private String uphone;
    private boolean socialDupl;
    private String jwToken;

    private boolean loggedIn;
    private String includedId;
    private String role; 

    private String selectedTap;
    private String authCodeIdPw;

    public UserInfoDto(){}
    public UserInfoDto(String uid, String upass) {
        this.uid = uid;
        this.upass = upass;
    }
    public UserInfoDto(UserInfo entity){
        this.uid = entity.getUid();
        this.upass = entity.getUpass();
        this.uname = entity.getUname();
        this.uage = entity.getUage();
        this.ugender = entity.getUgender();
        this.uaddress = entity.getUaddress();
        this.postcode = entity.getPostcode();
        this.uemail = entity.getUemail();
        this.uphone = entity.getUphone();
        this.role = entity.getRole();
    }
}
