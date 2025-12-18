package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.entity.purchase.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaOrderServiceRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderId(String orderId);
    List<Order> findByUserUidOrderByOdateDesc(String userId);
}
