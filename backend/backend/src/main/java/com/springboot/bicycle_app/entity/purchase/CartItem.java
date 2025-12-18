package com.springboot.bicycle_app.entity.purchase;

import com.springboot.bicycle_app.dto.purchase.CartItemRequestDto;
import com.springboot.bicycle_app.entity.userinfo.UserInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "cart")
@AllArgsConstructor
@Getter @Setter
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cid;
    @Column(nullable = false)
    private int qty;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid", nullable = false)
    private UserInfo user;
    @Column(nullable = false)
    private LocalDate cdate;
    @Column(nullable = false)
    private boolean checked;

    public CartItem() {
    }

    public CartItem(CartItem cartItem) {
    }

    public CartItem(CartItemRequestDto requestDto, Product product, UserInfo user) {
        this.qty = requestDto.getQty();
        this.checked = requestDto.isChecked();
        this.cdate = LocalDate.now();
        this.product = product;
        this.user = user;
        this.cid = requestDto.getCid();
    }

}
