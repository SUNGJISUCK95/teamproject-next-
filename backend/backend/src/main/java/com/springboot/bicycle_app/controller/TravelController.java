package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.travel.TravelFoodDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairDto;
import com.springboot.bicycle_app.dto.travel.TravelFoodDetailDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDetailDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairDetailDto;
import com.springboot.bicycle_app.dto.travel.TravelFoodReviewDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelReviewDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairReviewDto;
import com.springboot.bicycle_app.dto.travel.TravelSaveDto;
import com.springboot.bicycle_app.service.TravelService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/travel")
public class TravelController {
    private TravelService travelService;

    @Autowired
    public TravelController(TravelService travelService) {
        this.travelService = travelService;
    }

    @GetMapping("/food")
    public List<TravelFoodDto> food(){
        return travelService.findFood();
    }

    @GetMapping("/hotel")
    public List<TravelHotelDto> hotel(){
        return travelService.findHotel();
    }

    @GetMapping("/repair")
    public List<TravelRepairDto> repair(){
        return travelService.findRepair();
    }

    @PostMapping("/foodDetail")
    public TravelFoodDetailDto foodDetail(@RequestBody TravelFoodDetailDto travelFoodDetail){
        return travelService.findFoodDetail(travelFoodDetail.getDid());
    }

    @PostMapping("/hotelDetail")
    public TravelHotelDetailDto hotelDetail(@RequestBody TravelHotelDetailDto travelHotelDetail){
        return travelService.findHotelDetail(travelHotelDetail.getDid());
    }

    @PostMapping("/repairDetail")
    public TravelRepairDetailDto repairDetail(@RequestBody TravelRepairDetailDto travelRepairDetail){
        return travelService.findRepairDetail(travelRepairDetail.getDid());
    }

    @PostMapping("/foodReview")
    public List<TravelFoodReviewDto> foodReview(@RequestBody TravelFoodReviewDto travelFoodReview){
        return travelService.findFoodReview(travelFoodReview.getFid());
    }

    @PostMapping("/hotelReview")
    public List<TravelHotelReviewDto> hotelReview(@RequestBody TravelHotelReviewDto travelHotelReview){
        return travelService.findHotelReview(travelHotelReview.getHid());
    }

    @PostMapping("/repairReview")
    public List<TravelRepairReviewDto> repairReview(@RequestBody TravelRepairReviewDto travelRepairReview){
        return travelService.findRepairReview(travelRepairReview.getRid());
    }

    @PostMapping("/foodReviewInsert")
    public int foodReviewInsert(@RequestBody TravelFoodReviewDto dto){
        return travelService.insertFoodReview(dto);
    }

    @PostMapping("/hotelReviewInsert")
    public int hotelReviewInsert(@RequestBody TravelHotelReviewDto dto){
        return travelService.insertHotelReview(dto);
    }

    @PostMapping("/repairReviewInsert")
    public int repairReviewInsert(@RequestBody TravelRepairReviewDto dto){
        return travelService.insertRepairReview(dto);
    }

    @PostMapping("/save")
    public TravelSaveDto save(@RequestBody TravelSaveDto travelSave){
        return travelService.findSave(travelSave.getUid());
    }

    @PostMapping("/foodSaveUpdate")
    public TravelSaveDto foodSaveUpdate(@RequestBody TravelSaveDto travelSave){
        return travelService.updateFoodSave(travelSave.getUid(), travelSave.getFid());
    }

    @PostMapping("/hotelSaveUpdate")
    public TravelSaveDto hotelSaveUpdate(@RequestBody TravelSaveDto travelSave){
        return travelService.updateHotelSave(travelSave.getUid(), travelSave.getHid());
    }

    @PostMapping("/repairSaveUpdate")
    public TravelSaveDto repairSaveUpdate(@RequestBody TravelSaveDto travelSave){
        return travelService.updateRepairSave(travelSave.getUid(), travelSave.getRid());
    }
}
