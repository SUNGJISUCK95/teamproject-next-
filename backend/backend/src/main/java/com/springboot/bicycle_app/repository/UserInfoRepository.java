package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.UserInfoDto;

public interface UserInfoRepository {

    boolean idDuplChecker(String id);
    int signup(UserInfoDto userInfo);
}
