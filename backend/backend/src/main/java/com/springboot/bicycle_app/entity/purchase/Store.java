package com.springboot.bicycle_app.entity.purchase;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Entity
@Table(name = "store_location")
@Getter @Setter
public class Store {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sid; // (int -> Long)

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 150)
    private String address;

    @Column(length = 20)
    private String phone;

    @Column(precision = 10, scale = 8)
    private BigDecimal lat;

    @Column(precision = 11, scale = 8)
    private BigDecimal lng;

    private String url;
}
