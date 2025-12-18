package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.entity.travel.TravelFood;
import com.springboot.bicycle_app.entity.travel.TravelHotel;
import com.springboot.bicycle_app.entity.travel.TravelRepair;
import com.springboot.bicycle_app.entity.travel.TravelFoodDetail;
import com.springboot.bicycle_app.entity.travel.TravelHotelDetail;
import com.springboot.bicycle_app.entity.travel.TravelRepairDetail;
import com.springboot.bicycle_app.entity.travel.TravelFoodReview;
import com.springboot.bicycle_app.entity.travel.TravelHotelReview;
import com.springboot.bicycle_app.entity.travel.TravelRepairReview;
import com.springboot.bicycle_app.entity.travel.TravelSave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface JpaTravelRepository extends JpaRepository<TravelFood, Integer> {

    @Query("select f from TravelFood f")
    List<TravelFood> findFood();

    @Query("select h from TravelHotel h")
    List<TravelHotel> findHotel();

    @Query("select r from TravelRepair r")
    List<TravelRepair> findRepair();

    @Query("select d from TravelFoodDetail d where d.did = :did")
    TravelFoodDetail findFoodDetail(@Param("did") int did);

    @Query("select d from TravelHotelDetail d where d.did = :did")
    TravelHotelDetail findHotelDetail(@Param("did") int did);

    @Query("select d from TravelRepairDetail d where d.did = :did")
    TravelRepairDetail findRepairDetail(@Param("did") int did);

    @Query("select r from TravelFoodReview r where r.fid = :fid")
    List<TravelFoodReview> findFoodReview(@Param("fid") int fid);

    @Query("select r from TravelHotelReview r where r.hid = :hid")
    List<TravelHotelReview> findHotelReview(@Param("hid") int hid);

    @Query("select r from TravelRepairReview r where r.rid = :rid")
    List<TravelRepairReview> findRepairReview(@Param("rid") int rid);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO travel_food_review (uid, fid, user_image, user_fllowers, star, content, date, image_list) " +
            "VALUES (:uid, :fid, :userImage, :userFllowers, :star, :content, :date, :imageList)", nativeQuery = true)
    int insertFoodReview(@Param("uid") String uid,
                                            @Param("fid") int fid,
                                            @Param("userImage") String userImage,
                                            @Param("userFllowers") String userFllowers,
                                            @Param("star") Double star,
                                            @Param("content") String content,
                                            @Param("date") LocalDate date,
                                            @Param("imageList") String imageList);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO travel_hotel_review (uid, hid, user_image, user_fllowers, star, content, date, image_list) " +
            "VALUES (:uid, :hid, :userImage, :userFllowers, :star, :content, :date, :imageList)", nativeQuery = true)
    int insertHotelReview(@Param("uid") String uid,
                         @Param("hid") int hid,
                         @Param("userImage") String userImage,
                         @Param("userFllowers") String userFllowers,
                         @Param("star") Double star,
                         @Param("content") String content,
                         @Param("date") LocalDate date,
                         @Param("imageList") String imageList);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO travel_repair_review (uid, rid, user_image, user_fllowers, star, content, date, image_list) " +
            "VALUES (:uid, :rid, :userImage, :userFllowers, :star, :content, :date, :imageList)", nativeQuery = true)
    int insertRepairReview(@Param("uid") String uid,
                          @Param("rid") int rid,
                          @Param("userImage") String userImage,
                          @Param("userFllowers") String userFllowers,
                          @Param("star") Double star,
                          @Param("content") String content,
                          @Param("date") LocalDate date,
                          @Param("imageList") String imageList);

    @Modifying
    @Transactional
    @Query(
            value = "INSERT INTO travel_save (uid, fid, hid, rid) VALUES (:uid, '[]', '[]', '[]')",
            nativeQuery = true
    )
    int insertSave(@Param("uid") String uid);


    @Query("select s from TravelSave s where s.uid = :uid")
    TravelSave findSave(@Param("uid") String uid);

    @Modifying
    @Transactional
    @Query("update TravelSave s set s.fid = :fid where s.uid = :uid")
    int updateFoodSave(@Param("uid") String uid, @Param("fid") String fid);

    @Modifying
    @Transactional
    @Query("update TravelSave s set s.hid = :hid where s.uid = :uid")
    int updateHotelSave(@Param("uid") String uid, @Param("hid") String hid);

    @Modifying
    @Transactional
    @Query("update TravelSave s set s.rid = :rid where s.uid = :uid")
    int updateRepairSave(@Param("uid") String uid, @Param("rid") String rid);
}
