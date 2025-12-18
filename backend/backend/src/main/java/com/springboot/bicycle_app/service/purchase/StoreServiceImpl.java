package com.springboot.bicycle_app.service.purchase;

import com.springboot.bicycle_app.dto.purchase.StoreDto;
import com.springboot.bicycle_app.entity.purchase.Store;
import com.springboot.bicycle_app.repository.JpaStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class StoreServiceImpl implements StoreService{
    private final JpaStoreRepository jpaStoreRepository;

    @Autowired
    public StoreServiceImpl(JpaStoreRepository jpaStoreRepository){
        this.jpaStoreRepository = jpaStoreRepository;
    }

    @Override
    public List<StoreDto> findAll(){
        List<Store> entityList = jpaStoreRepository.findAll();
        List<StoreDto> list = entityList.stream()
                .map(StoreDto::new) // StoreDto::new 는 entity -> new StoreDto(entity) 와 동일
                .collect(Collectors.toList());
        return list;
    }
}
