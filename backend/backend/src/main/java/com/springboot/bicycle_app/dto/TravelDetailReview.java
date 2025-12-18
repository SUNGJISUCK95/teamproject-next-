package com.springboot.bicycle_app.dto;

import lombok.Data;

import java.util.List;

@Data
public class TravelDetailReview {
    private String userProfile;
    private String userId;
    private String userLike;
    private String userTotalReview;
    private String userFllowers;
    private String reviewImage;
    private String reviewDate;
    private String reviewDescription;
}
