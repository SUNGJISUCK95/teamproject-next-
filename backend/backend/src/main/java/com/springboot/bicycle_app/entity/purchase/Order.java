package com.springboot.bicycle_app.entity.purchase;

import com.springboot.bicycle_app.entity.userinfo.UserInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    private String orderId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid", nullable = false)
    private UserInfo user;
    private String orderName;
    private int totalPrice;
    private String status;
    private String paymentKey;
    private String uaddress;
    private String postcode;
    private LocalDateTime odate;
}

