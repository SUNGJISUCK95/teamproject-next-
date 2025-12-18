package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.purchase.CartItemDto;
import com.springboot.bicycle_app.entity.purchase.CartItem;
import com.springboot.bicycle_app.entity.userinfo.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface JpaCartRepository extends JpaRepository<CartItem, Long> {
    //장바구니 조회
    @Query("""
            select c
                from CartItem c
                    join fetch c.product p
                    join fetch c.user u
                        where u.uid = :uid
            """)
    List<CartItem> findList(@Param("uid")String uid);
    //장바구니 아이템 삭제
    @Modifying
    @Query("delete from CartItem c where c.cid =:cid")
    int deleteItem(@Param("cid")long cid);
    //장바구니 수량 업데이트
    @Modifying
    @Query("update CartItem c set c.qty = c.qty + 1 where c.cid =:cid")
    int increaseQty(@Param("cid") long cid);
    @Modifying
    @Query("update CartItem c set c.qty = c.qty - 1 where c.cid =:cid")
    int decreaseQty(@Param("cid") long cid);
    //장바구니 상품 추가
//    Cart save(Cart cartItem);
    @Transactional
    @Modifying
    @Query("UPDATE CartItem c SET c.checked = (CASE WHEN c.checked = true THEN false ELSE true END) WHERE c.cid = :cid")
    int toggleCheck(@Param("cid") long cid);
    @Query("SELECT c FROM CartItem c WHERE c.user.uid = :unum AND c.product.product_id = :productId")
    Optional<CartItem> findByUidAndProductId(@Param("unum") String uid, @Param("productId") long productId);

    void deleteByUser(UserInfo user);
}
