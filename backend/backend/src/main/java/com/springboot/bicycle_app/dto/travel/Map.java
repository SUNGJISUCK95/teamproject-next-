package com.springboot.bicycle_app.dto.travel;

import lombok.Data;

@Data
public class Map {
    private int    mid;
    private String mname;
    private double lat;
    private double lng;
    private String mlink;
    private String type;
}
