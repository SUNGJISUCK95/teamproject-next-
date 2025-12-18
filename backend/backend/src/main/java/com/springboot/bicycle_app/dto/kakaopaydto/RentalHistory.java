package com.springboot.bicycle_app.dto.kakaopaydto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RentalHistory {
    private Long bid;
    private String userId;
    private String stationName;
    private String bikeId;
    private Long amount;
    private String method;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status;
}
