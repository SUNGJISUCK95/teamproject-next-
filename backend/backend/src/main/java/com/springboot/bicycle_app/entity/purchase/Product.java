package com.springboot.bicycle_app.entity.purchase;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long product_id;
    @Column(nullable = false, length = 50)
    private String pid;
    @Column(nullable = false, length = 100)
    private String category;
    @Column(nullable = false, length = 600)
    private String image;
    @Column(nullable = false, length = 300)
    private String name;
    private long price;
    @Column(length = 100)
    private String color;
    @Column(length = 150)
    private String subinfo;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private List<String> description;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CartItem> cartItemList = new ArrayList<>();
}
