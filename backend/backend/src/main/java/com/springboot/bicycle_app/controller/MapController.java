package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.travel.Map;
import com.springboot.bicycle_app.service.MapService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/map")
public class MapController {
    private MapService mapService;

    @Autowired
    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/all")
    public List<Map> all(){
        return mapService.findAll();
    }
}
