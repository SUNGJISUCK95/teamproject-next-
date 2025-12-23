//package com.springboot.bicycle_app.service.tosspayservice;
//
//import com.springboot.bicycle_app.dto.tosspaydto.TossConfirmRequest;
//import com.springboot.bicycle_app.dto.tosspaydto.TossConfirmResponse;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpHeaders;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//
//import java.nio.charset.StandardCharsets;
//import java.util.Base64;
//
//
//@Service
//public class TossPaymentServiceImpl implements TossPaymentService {
//
//    @Value("${toss.secret-key}")
//    private String secretKey;
//
//    @Override
//    public TossConfirmResponse confirm(TossConfirmRequest request) {
//
//        String auth = Base64.getEncoder()
//                .encodeToString((secretKey + ":").getBytes(StandardCharsets.UTF_8));
//
//        WebClient webClient = WebClient.builder()
//                .baseUrl("https://api.tosspayments.com")
//                .defaultHeader(HttpHeaders.AUTHORIZATION, "Basic " + auth)
//                .build();
//
//        return webClient.post()
//                .uri("/v1/payments/confirm")
//                .bodyValue(request)
//                .retrieve()
//                .bodyToMono(TossConfirmResponse.class)
//                .block();
//    }
//}
