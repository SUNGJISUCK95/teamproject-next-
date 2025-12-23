//package com.springboot.bicycle_app.controller.tosspaycontroller;
//
//import com.springboot.bicycle_app.dto.tosspaydto.TossConfirmRequest;
//import com.springboot.bicycle_app.dto.tosspaydto.TossConfirmResponse;
//import com.springboot.bicycle_app.service.tosspayservice.TossPaymentService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Controller;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.io.*;
//
//@Controller
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/toss")
//public class TossPayController {
//
//    private final TossPaymentService tossPaymentService;
//
//    @PostMapping("/confirm")
//    public ResponseEntity<TossConfirmResponse> confirm(
//            @RequestBody TossConfirmRequest request
//    ) {
//        TossConfirmResponse response = tossPaymentService.confirm(request);
//        return ResponseEntity.ok(response);
//    }
//}