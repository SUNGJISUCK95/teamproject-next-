package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.entity.purchase.Order;
import com.springboot.bicycle_app.entity.purchase.OrderItem;
import com.springboot.bicycle_app.entity.userinfo.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JpaOrderItemServiceRepository extends JpaRepository<OrderItem,Long> {
    @Modifying
    @Query("""
            insert into OrderItem (order, product, productName, price, qty)
                select :order, c.product, c.product.name, c.product.price, c.qty
                    from CartItem c
                        where c.user =:user
            """)
    int insertOrderItem(@Param("order") Order order, @Param("user") UserInfo user);
}
