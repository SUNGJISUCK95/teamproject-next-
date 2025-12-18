package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.travel.Map;

import java.util.List;

public interface MapService {
    List<Map> findAll();
}
