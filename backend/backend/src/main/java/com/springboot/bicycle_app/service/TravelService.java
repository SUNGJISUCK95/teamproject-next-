package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.travel.TravelFoodDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairDto;
import com.springboot.bicycle_app.dto.travel.TravelFoodDetailDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDetailDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairDetailDto;
import com.springboot.bicycle_app.dto.travel.TravelFoodReviewDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelReviewDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairReviewDto;
import com.springboot.bicycle_app.dto.UserInfoDto;
import com.springboot.bicycle_app.dto.travel.TravelSaveDto;

import java.util.List;

public interface TravelService {
    List<TravelFoodDto> findFood();
    List<TravelHotelDto> findHotel();
    List<TravelRepairDto> findRepair();
    TravelFoodDetailDto findFoodDetail(int did);
    TravelHotelDetailDto findHotelDetail(int did);
    TravelRepairDetailDto findRepairDetail(int did);
    List<TravelFoodReviewDto> findFoodReview(int fid);
    List<TravelHotelReviewDto> findHotelReview(int hid);
    List<TravelRepairReviewDto> findRepairReview(int rid);
    int insertFoodReview(TravelFoodReviewDto dto);
    int insertHotelReview(TravelHotelReviewDto dto);
    int insertRepairReview(TravelRepairReviewDto dto);
    int insertSave(String uid);
    TravelSaveDto findSave(String uid);
    TravelSaveDto updateFoodSave(String uid, String fid);
    TravelSaveDto updateHotelSave(String uid, String hid);
    TravelSaveDto updateRepairSave(String uid, String rid);
}
