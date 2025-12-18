package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.travel.TravelFoodDto;
import com.springboot.bicycle_app.entity.travel.TravelFood;
import com.springboot.bicycle_app.dto.travel.TravelHotelDto;
import com.springboot.bicycle_app.entity.travel.TravelHotel;
import com.springboot.bicycle_app.dto.travel.TravelRepairDto;
import com.springboot.bicycle_app.entity.travel.TravelRepair;
import com.springboot.bicycle_app.dto.travel.TravelFoodDetailDto;
import com.springboot.bicycle_app.entity.travel.TravelFoodDetail;
import com.springboot.bicycle_app.dto.travel.TravelHotelDetailDto;
import com.springboot.bicycle_app.entity.travel.TravelHotelDetail;
import com.springboot.bicycle_app.dto.travel.TravelRepairDetailDto;
import com.springboot.bicycle_app.entity.travel.TravelRepairDetail;
import com.springboot.bicycle_app.dto.travel.TravelFoodReviewDto;
import com.springboot.bicycle_app.entity.travel.TravelFoodReview;
import com.springboot.bicycle_app.dto.travel.TravelHotelReviewDto;
import com.springboot.bicycle_app.entity.travel.TravelHotelReview;
import com.springboot.bicycle_app.dto.travel.TravelRepairReviewDto;
import com.springboot.bicycle_app.entity.travel.TravelRepairReview;
import com.springboot.bicycle_app.dto.travel.TravelSaveDto;
import com.springboot.bicycle_app.entity.travel.TravelSave;
import com.springboot.bicycle_app.repository.JpaTravelRepository;
import com.springboot.bicycle_app.repository.TravelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TravelServiceImpl implements TravelService{
    private TravelRepository travelRepository;
    private final JpaTravelRepository jpaTravelRepository;

    @Autowired
    public TravelServiceImpl(TravelRepository travelRepository,
                             JpaTravelRepository jpaTravelRepository) {
        this.travelRepository = travelRepository;
        this.jpaTravelRepository = jpaTravelRepository;
    }

    @Override
    public List<TravelFoodDto> findFood(){
        List<TravelFoodDto> flist = new ArrayList<>();
        List<TravelFood> list = jpaTravelRepository.findFood();
        list.forEach((travel_food) -> flist.add(new TravelFoodDto(travel_food)));
        return flist;
    }

    @Override
    public List<TravelHotelDto> findHotel(){
        List<TravelHotelDto> hlist = new ArrayList<>();
        List<TravelHotel> list = jpaTravelRepository.findHotel();
        list.forEach((travel_hotel) -> hlist.add(new TravelHotelDto(travel_hotel)));
        return hlist;
    }

    @Override
    public List<TravelRepairDto> findRepair(){
        List<TravelRepairDto> rlist = new ArrayList<>();
        List<TravelRepair> list = jpaTravelRepository.findRepair();
        list.forEach((travel_repair) -> rlist.add(new TravelRepairDto(travel_repair)));
        return rlist;
    }

    @Override
    public TravelFoodDetailDto findFoodDetail(int did){
        TravelFoodDetail entity = jpaTravelRepository.findFoodDetail(did);
        return new TravelFoodDetailDto(entity);
    }

    @Override
    public TravelHotelDetailDto findHotelDetail(int did){
        TravelHotelDetail entity = jpaTravelRepository.findHotelDetail(did);
        return new TravelHotelDetailDto(entity);
    }

    @Override
    public TravelRepairDetailDto findRepairDetail(int did){
        TravelRepairDetail entity = jpaTravelRepository.findRepairDetail(did);
        return new TravelRepairDetailDto(entity);
    }

    @Override
    public List<TravelFoodReviewDto> findFoodReview(int fid){
        List<TravelFoodReviewDto> frlist = new ArrayList<>();
        List<TravelFoodReview> list = jpaTravelRepository.findFoodReview(fid);
        list.forEach((travel_food_review) -> frlist.add(new TravelFoodReviewDto(travel_food_review)));
        return frlist;
    }

    @Override
    public List<TravelHotelReviewDto> findHotelReview(int hid){
        List<TravelHotelReviewDto> hrlist = new ArrayList<>();
        List<TravelHotelReview> list = jpaTravelRepository.findHotelReview(hid);
        list.forEach((travel_hotel_review) -> hrlist.add(new TravelHotelReviewDto(travel_hotel_review)));
        return hrlist;
    }

    @Override
    public List<TravelRepairReviewDto> findRepairReview(int rid){
        List<TravelRepairReviewDto> rrlist = new ArrayList<>();
        List<TravelRepairReview> list = jpaTravelRepository.findRepairReview(rid);
        list.forEach((travel_repair_review) -> rrlist.add(new TravelRepairReviewDto(travel_repair_review)));
        return rrlist;
    }

    @Override
    public int insertFoodReview(TravelFoodReviewDto dto){
        int result = 0;
        TravelFoodReview entity = new TravelFoodReview();
        entity.setUid(dto.getUid());
        entity.setUserImage(dto.getUserImage());
        entity.setUserFllowers(dto.getUserFllowers());
        entity.setFid(dto.getFid());
        entity.setStar(dto.getStar());
        entity.setContent(dto.getContent());
        entity.setDate(LocalDate.now());
        entity.setImageList(dto.getImageList());
        result = jpaTravelRepository.insertFoodReview(
                entity.getUid(),
                entity.getFid(),
                entity.getUserImage(),
                entity.getUserFllowers(),
                entity.getStar(),
                entity.getContent(),
                entity.getDate(),
                entity.getImageList()
        );
        return result;
    }

    @Override
    public int insertHotelReview(TravelHotelReviewDto dto){
        int result = 0;
        TravelHotelReview entity = new TravelHotelReview();
        entity.setUid(dto.getUid());
        entity.setUserImage(dto.getUserImage());
        entity.setUserFllowers(dto.getUserFllowers());
        entity.setHid(dto.getHid());
        entity.setStar(dto.getStar());
        entity.setContent(dto.getContent());
        entity.setDate(LocalDate.now());
        entity.setImageList(dto.getImageList());
        result = jpaTravelRepository.insertHotelReview(
                entity.getUid(),
                entity.getHid(),
                entity.getUserImage(),
                entity.getUserFllowers(),
                entity.getStar(),
                entity.getContent(),
                entity.getDate(),
                entity.getImageList()
        );
        return result;
    }

    @Override
    public int insertRepairReview(TravelRepairReviewDto dto){
        int result = 0;
        TravelRepairReview entity = new TravelRepairReview();
        entity.setUid(dto.getUid());
        entity.setUserImage(dto.getUserImage());
        entity.setUserFllowers(dto.getUserFllowers());
        entity.setRid(dto.getRid());
        entity.setStar(dto.getStar());
        entity.setContent(dto.getContent());
        entity.setDate(LocalDate.now());
        entity.setImageList(dto.getImageList());
        result = jpaTravelRepository.insertRepairReview(
                entity.getUid(),
                entity.getRid(),
                entity.getUserImage(),
                entity.getUserFllowers(),
                entity.getStar(),
                entity.getContent(),
                entity.getDate(),
                entity.getImageList()
        );
        return result;
    }

    @Transactional
    @Override
    public int insertSave(String uid){
        int result;
        result = jpaTravelRepository.insertSave(uid);
        return 0;
    }

    @Override
    public TravelSaveDto findSave(String uid){
        TravelSave entity = jpaTravelRepository.findSave(uid);
        return new TravelSaveDto(entity);
    }

    @Override
    public TravelSaveDto updateFoodSave(String uid, String fid){
        int result = jpaTravelRepository.updateFoodSave(uid, fid);
        TravelSave entity = jpaTravelRepository.findSave(uid);
        return new TravelSaveDto(entity);
    }

    @Override
    public TravelSaveDto updateHotelSave(String uid, String hid){
        int result = jpaTravelRepository.updateHotelSave(uid, hid);
        TravelSave entity = jpaTravelRepository.findSave(uid);
        return new TravelSaveDto(entity);
    }

    @Override
    public TravelSaveDto updateRepairSave(String uid, String rid){
        int result = jpaTravelRepository.updateRepairSave(uid, rid);
        TravelSave entity = jpaTravelRepository.findSave(uid);
        return new TravelSaveDto(entity);
    }
}
