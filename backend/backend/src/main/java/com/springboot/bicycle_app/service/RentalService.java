package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.RentalPayment;
import com.springboot.bicycle_app.dto.RentalPaymentRequest;
import com.springboot.bicycle_app.dto.kakaopaydto.RentalStatusDetails;

public interface RentalService {
    RentalPayment processPayment(RentalPaymentRequest request);
    RentalStatusDetails getFinalRentalDetails(String orderId);
}