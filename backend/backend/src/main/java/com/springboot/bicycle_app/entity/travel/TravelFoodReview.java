package com.springboot.bicycle_app.entity.travel;

import com.springboot.bicycle_app.dto.travel.TravelFoodReviewDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="travel_food_review")
@Getter
@Setter
public class TravelFoodReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int frid;

    @Column(name="uid", length = 100, nullable = false)
    private String uid;

    @Column(name="fid")
    private int fid;

    @Column(name="userImage", length = 100)
    private String userImage;

    @Column(name="userFllowers", length = 100)
    private String userFllowers;

    @Column(name="star")
    private Double star;

    @Column(name="content", columnDefinition = "TEXT")
    private String content;

    @Column(name="date")
    private LocalDate date;

    @Column(name="imageList", columnDefinition = "JSON")
    private String imageList;
}
