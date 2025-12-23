package com.springboot.bicycle_app.controller.kakaopaycontroller;

import com.springboot.bicycle_app.dto.RentalPaymentRequest;
import com.springboot.bicycle_app.dto.kakaopaydto.KakaoPayReadyResponse;
import com.springboot.bicycle_app.service.kakaopayservice.KakaoPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/kakaopay")
public class KakaoPayController {
    private final KakaoPayService kakaoPayService;

    @Autowired
    public KakaoPayController(KakaoPayService kakaoPayService) {
        this.kakaoPayService = kakaoPayService;
    }

    // ----------------------------------------------------
    // 1. 결제 준비 요청 (클라이언트 -> 백엔드)
    // ----------------------------------------------------
    @PostMapping("/ready")
    public ResponseEntity<KakaoPayReadyResponse> readyToPay(@RequestBody RentalPaymentRequest request) {

        System.out.println("결제 준비 요청 수신: " + request.getUserId());

        try {
            KakaoPayReadyResponse response = kakaoPayService.readyToPay(request);

            // 🚨 핵심: API 응답을 JSON으로 프론트엔드에 반환
            System.out.println("결제 준비 성공. 리다이렉트 URL JSON 반환: " + response.getNextRedirectPcUrl());

            return new ResponseEntity<>(response, HttpStatus.OK); // 200 OK와 함께 DTO 반환

        } catch (RuntimeException e) {
            System.err.println("결제 준비 중 오류 발생: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ----------------------------------------------------
    // 2. 결제 승인 (카카오페이 -> 백엔드 리다이렉트)
    // GET /kakaopay/success?pg_token=...
    // ----------------------------------------------------\
    @GetMapping("/success")
    public RedirectView afterPaySuccess(
            @RequestParam("pg_token") String pgToken,
            @RequestParam("partner_order_id") String partnerOrderId) {

        try {
            // 최종 승인 로직 호출
            kakaoPayService.approvePay(partnerOrderId, pgToken);

            // 절대 경로 사용 (React 앱 포트 3000으로 리다이렉트)
            // 브라우저가 Spring Boot 포트(8080) 대신 React 포트(3000)로 이동하도록 지시
            String frontendUrl = "http://localhost:3000/rental/payment/complete?orderId=" + partnerOrderId;

            return new RedirectView(frontendUrl); // 성공 시, React 라우트로 리다이렉트

        } catch (Exception e) {
            System.err.println("결제 승인 실패: " + e.getMessage());
            // 실패 시, 에러 페이지로 리다이렉트
            return new RedirectView("/payment/error?message= " + e.getMessage());

        }
    }

    // ----------------------------------------------------
    // 3. 취소/실패 핸들러 (카카오페이 -> 백엔드 리다이렉트)
    // ----------------------------------------------------
    @GetMapping("/cancel")
    public RedirectView payCancel() {
        return new RedirectView("/pqyment/cancel"); // 취소 페이지로 이동
    }
    
    @GetMapping("/fail")
    public RedirectView payFail() {
        return new RedirectView("/payment/fail"); // 실패 페이지로 이동
    }
}