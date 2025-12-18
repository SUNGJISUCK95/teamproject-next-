package com.springboot.bicycle_app.entity.userinfo;

import com.springboot.bicycle_app.dto.UserInfoDto;
import com.springboot.bicycle_app.entity.purchase.CartItem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="userinfo")
@Setter
@Getter
@DynamicUpdate
public class UserInfo {
    @Id
    private String uid;
    private String upass;
    private String uname;
    private int uage;
    private String ugender;
    private String uaddress;
    private String postcode;
    private String uemail;
    private String uphone;
    private String role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> cartItemList = new ArrayList<>();

    public UserInfo(){}
    public UserInfo(UserInfoDto userInfoDto){
        this.uid = userInfoDto.getUid();
        this.upass = userInfoDto.getUpass();
        this.uname = userInfoDto.getUname();
        this.uage = userInfoDto.getUage();
        this.ugender = userInfoDto.getUgender();
        this.uaddress = userInfoDto.getUaddress();
        this.postcode =userInfoDto.getPostcode();
        this.uemail = userInfoDto.getUemail();
        this.uphone = userInfoDto.getUphone();
        this.role = userInfoDto.getRole();
    }

}
