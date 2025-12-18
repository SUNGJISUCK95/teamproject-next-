package com.springboot.bicycle_app.entity.travel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="travel_repair_detail")
@Getter
@Setter
public class TravelRepairDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int did;

    @Column(name="rname", length = 30, nullable = false)
    private String rname;

    @Column(name="rlike")
    private Double rlike;

    @Column(name="score")
    private int score;

    @Column(name="tag", columnDefinition = "JSON")
    private String tag;

    @Column(name="location", length = 100)
    private String location;

    @Column(name="repair", length = 100)
    private String repair;

    @Column(name="address", length = 100)
    private String address;

    @Column(name="localAddress", length = 100)
    private String localAddress;

    @Column(name="business", columnDefinition = "JSON")
    private String business;

    @Column(name="phone", length = 100)
    private String phone;

    @Column(name="other", columnDefinition = "JSON")
    private String other;

    @Column(name="menu", columnDefinition = "JSON")
    private String menu;

    @Column(name="mainImages", columnDefinition = "JSON")
    private String mainImages;

    @Column(name="imageList", columnDefinition = "JSON")
    private String imageList;
}