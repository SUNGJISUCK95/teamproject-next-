package com.springboot.bicycle_app.dto.purchase;

import lombok.*;

import java.time.LocalDate;

@Data
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {
    private long cid;
    private int qty;
    private long product_id;
    private int unum;
    private LocalDate cdate;
    private boolean checked;
    private String category;
    private Long checkQty;
    private String type;
    private int sumQty;
    private String name;
    private long price;
    private String image;

    public CartItemDto(long cid, int qty, long product_id, int unum, LocalDate cdate, boolean checked, String name, long price, String image) {
        this.cid = cid;
        this.qty = qty;
        this.product_id = product_id;
        this.unum = unum;
        this.cdate = cdate;
        this.checked = checked;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}
