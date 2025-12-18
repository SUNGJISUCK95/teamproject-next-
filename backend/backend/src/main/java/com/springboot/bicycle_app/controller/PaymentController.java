package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.purchase.OrderRequestDto;
import com.springboot.bicycle_app.dto.purchase.OrderResponseDto;
import com.springboot.bicycle_app.dto.purchase.TossPayDto;
import com.springboot.bicycle_app.service.purchase.OrderService;
import com.springboot.bicycle_app.service.purchase.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    private final OrderService orderService;

    @Autowired
    public PaymentController(OrderService orderService){
        this.orderService = orderService;
    }

    @PostMapping("/request")
    public ResponseEntity<?> requestPayment(@RequestBody OrderRequestDto dto) {
        try {
            var order = orderService.createOrder(dto);
            return ResponseEntity.ok(Map.of(
                    "message", "주문 생성 완료",
                    "orderId", order.getOrderId()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmPayment(@RequestBody TossPayDto dto) {
        try {
            Object response = orderService.confirmPayment(dto);
            return ResponseEntity.ok(response);

        } catch (PaymentFailedException e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", e.getMessage(), "code", "PAYMENT_ERR"));

        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(Map.of("message", "서버 내부 오류가 발생했습니다."));
        }
    }
    @PostMapping("/order")
    public List<OrderResponseDto> findList(@RequestBody OrderRequestDto dto){
        return orderService.findList(dto);
    }
}
