package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.travel.Map;

import java.util.List;

public interface MapRepository {
    List<Map> findAll();
}
