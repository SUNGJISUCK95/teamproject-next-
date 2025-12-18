package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.entity.purchase.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaStoreRepository extends JpaRepository<Store,Long> {
    List<Store> findAll();
}
