package com.springboot.bicycle_app.entity.travel;

import com.springboot.bicycle_app.dto.travel.TravelRepairReviewDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="travel_repair_review")
@Getter
@Setter
public class TravelRepairReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rrid;

    @Column(name="uid", length = 100, nullable = false)
    private String uid;

    @Column(name="rid")
    private int rid;

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
