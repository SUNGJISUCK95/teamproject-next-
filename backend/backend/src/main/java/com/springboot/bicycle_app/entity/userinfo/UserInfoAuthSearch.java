package com.springboot.bicycle_app.entity.userinfo;

import com.springboot.bicycle_app.dto.UserInfoDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;


@Entity
@Table(name="userinfoauthsearch")
@Setter
@Getter
@DynamicUpdate
public class UserInfoAuthSearch {
    @Id
    private String authcode;
    private String uid;
    private String uname;
    private String uemail;
    private LocalDateTime deadtime;

    public UserInfoAuthSearch(){}
    public UserInfoAuthSearch(UserInfoDto userInfoDto){
        this.uid = userInfoDto.getUid();
        this.uname = userInfoDto.getUname();
        this.uemail = userInfoDto.getUemail();
        this.authcode = userInfoDto.getAuthCodeIdPw();
    }

}
