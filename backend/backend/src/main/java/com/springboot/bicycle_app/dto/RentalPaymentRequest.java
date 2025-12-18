package com.springboot.bicycle_app.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter @Setter
public class RentalPaymentRequest {
    private long paymentAmount;
    private String userId; // 프론트의 userId와 매칭
    private String stationId;
    private String stationName;
    private String paymentMethod;

    public long getPaymentAmount() { return paymentAmount; }
    public void setPaymentAmount(long paymentAmount) { this.paymentAmount = paymentAmount; }
}