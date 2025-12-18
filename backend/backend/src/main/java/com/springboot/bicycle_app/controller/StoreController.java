package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.purchase.StoreDto;
import com.springboot.bicycle_app.service.purchase.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/location")
public class StoreController {
    public final StoreService storeService;
    @Autowired
    public StoreController(StoreService storeService){
        this.storeService = storeService;
    }
    @GetMapping("")
    public List<StoreDto> getStore(){
        return storeService.findAll();
    }
}
