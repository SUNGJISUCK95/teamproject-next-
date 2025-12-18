package com.springboot.bicycle_app.controller.kakaopaycontroller;

import com.springboot.bicycle_app.dto.kakaopaydto.RentalStatusDetails;
import com.springboot.bicycle_app.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/rental")
public class KakaoPayRentalController {
    private final RentalService rentalService;

    @Autowired
    public KakaoPayRentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @GetMapping("/status")
    public ResponseEntity<?> getRentalStatus(@RequestParam("orderId") String orderId) {

        System.out.println(orderId);
        try {
            // rental_history에서 orderId를 참조해서 인스턴스를 들고온다
            RentalStatusDetails details = rentalService.getFinalRentalDetails(orderId);

            // 들고온 히스토리의 status 항목이 대기중인지 검사
            if (details.getFinalStatus().equals("APPROVED") && details.getRentalState().equals("대여 중")) {
                // 2-1. 성공 시: HTTP 200 OK와 함께 상세 정보를 반환 (JSON)
                return new ResponseEntity<>(details, HttpStatus.OK);
            } else {
                // 2-2. 결제는 되었으나 렌탈 상태가 불일치하는 등 실패 시
                return new ResponseEntity<>(
                        Map.of("status", "FAILED", "message", details.getFailureReason()),
                        HttpStatus.BAD_REQUEST
                );
            }
        } catch (RuntimeException e) {
            // 주문 ID를 찾을 수 없거나 DB 조회 중 오류 발생 시
            System.err.println("결제 상태 조회 중 오류 발생: " + e.getMessage());
            return new ResponseEntity<>(
                    Map.of("status", "ERROR", "message", "주문 정보 조회 실패 또는 서버 오류"),
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}