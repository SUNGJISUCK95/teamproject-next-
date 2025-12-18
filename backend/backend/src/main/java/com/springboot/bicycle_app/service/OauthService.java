package com.springboot.bicycle_app.service;


import com.springboot.bicycle_app.dto.Token;
import com.springboot.bicycle_app.dto.UserInfoDto;
import com.springboot.bicycle_app.entity.userinfo.UserInfo;

public interface OauthService {
    String getSocialAccessToken(Token token);
    String socialIdCatcher(String authcode,String social);
    boolean idDuplChecker(String id);
    int signUp(UserInfoDto userInfo);
    String encryptString(String socialId);
    UserInfoDto findInfo(UserInfoDto userInfoDto);
    int updateUser(UserInfoDto userInfoDto);
    int updateuserId(UserInfoDto userInfoDto);
    int deleteuserId(UserInfoDto userInfoDto);
    boolean searchuserinfo(UserInfoDto userInfoDto);
    String compareauthcode(UserInfoDto userInfoDto);
    void printInTime();
}
