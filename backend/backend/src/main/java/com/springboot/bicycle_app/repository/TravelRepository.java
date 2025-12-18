package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.travel.TravelFoodDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairDto;
import com.springboot.bicycle_app.dto.travel.TravelFoodDetailDto;

import java.util.List;

public interface TravelRepository {
    List<TravelFoodDto> findFood();
    List<TravelHotelDto> findHotel();
    List<TravelRepairDto> findRepair();
    // List<TravelDetail> findFoodDetail();
}
