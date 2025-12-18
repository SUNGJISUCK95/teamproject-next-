package com.springboot.bicycle_app.repository.kakaopayrepository;

import com.springboot.bicycle_app.dto.RentalPaymentRequest;
import com.springboot.bicycle_app.dto.kakaopaydto.RentalHistory;

public interface RentalRepository {
    void updateRentalStatus(String rentalId, String status);
    String saveRental(RentalPaymentRequest request);
    RentalHistory findByOrderId(String orderId);
}