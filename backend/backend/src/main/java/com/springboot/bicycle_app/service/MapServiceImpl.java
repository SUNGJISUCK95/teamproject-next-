package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.travel.Map;
import com.springboot.bicycle_app.repository.MapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MapServiceImpl implements MapService{
    private MapRepository mapRepository;

    @Autowired
    public MapServiceImpl(MapRepository mapRepository) {
        this.mapRepository = mapRepository;
    }

    @Override
    public List<Map> findAll(){
        // System.out.println("service ==> ");
        List<Map> list = mapRepository.findAll();
        return list;
    }
}
