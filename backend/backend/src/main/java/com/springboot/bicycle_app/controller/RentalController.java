package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.RentalPayment;
import com.springboot.bicycle_app.dto.RentalPaymentRequest;
import com.springboot.bicycle_app.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rental")
public class RentalController {

    private final RentalService rentalService;

    @Autowired
    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @PostMapping("/payment")
    public ResponseEntity<RentalPayment> processPayment(@RequestBody RentalPaymentRequest request) {

        if(request.getUserId() == null || request.getPaymentAmount() <= 0) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new RentalPayment("FAILURE", "필수 요청 데이터가 누락되었습니다.", null));
        }

        try {
            RentalPayment response = rentalService.processPayment(request);

            if("SUCCESS".equals(response.getStatus())) {
                return ResponseEntity.ok(response);
            } else {
                // Service에서 FAILURE를 반환한 경우 (예: saveRental에서 null 반환)
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        } catch (Exception e) {
            // DB 예외 등 처리되지 않은 모든 예외 포착
            System.err.println("Controller Catch: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new RentalPayment("FAILURE", "서버 처리 중 오류가 발생했습니다: " + e.getMessage(), null));
        }
    }
}