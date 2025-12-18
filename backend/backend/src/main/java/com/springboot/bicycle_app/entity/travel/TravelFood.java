package com.springboot.bicycle_app.entity.travel;

import com.springboot.bicycle_app.dto.travel.TravelFoodDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="travel_food")
@Getter
@Setter
public class TravelFood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fid;

    @Column(name="region", length = 100, nullable = false)
    private String region;

    @Column(name="fname", length = 30, nullable = false)
    private String fname;

    @Column(name="lat")
    private Double lat;

    @Column(name="lng")
    private Double lng;

    @Column(name="flike") 
    private Double flike; 

    @Column(name="score")
    private int score;

    @Column(name="evaluation")
    private int evaluation;

    @Column(name="tag", columnDefinition = "JSON")
    private String tag;

    @Column(name="image1", length = 100)
    private String image1;

    @Column(name="image2", length = 100)
    private String image2;

    @Column(name="image3", length = 100)
    private String image3;

    @Column(name="fullImage1", length = 100)
    private String fullImage1;

    @Column(name="fullImage2", length = 100)
    private String fullImage2;

    @Column(name="fullImage3", length = 100)
    private String fullImage3;

    @Column(name="description", length = 300)
    private String description;
}