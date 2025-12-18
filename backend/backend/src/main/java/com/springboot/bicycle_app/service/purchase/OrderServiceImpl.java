package com.springboot.bicycle_app.service.purchase;

import com.springboot.bicycle_app.controller.PaymentFailedException;
import com.springboot.bicycle_app.dto.purchase.OrderRequestDto;
import com.springboot.bicycle_app.dto.purchase.OrderResponseDto;
import com.springboot.bicycle_app.dto.purchase.TossPayDto;
import com.springboot.bicycle_app.entity.purchase.Order;
import com.springboot.bicycle_app.entity.userinfo.UserInfo;
import com.springboot.bicycle_app.repository.JpaCartRepository;
import com.springboot.bicycle_app.repository.JpaOrderItemServiceRepository;
import com.springboot.bicycle_app.repository.JpaOrderServiceRepository;
import com.springboot.bicycle_app.repository.JpaUserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    private final JpaOrderServiceRepository jpaOrderServiceRepository;
    private final JpaUserInfoRepository jpaUserInfoRepository;
    private final JpaCartRepository jpaCartRepository;
    private final JpaOrderItemServiceRepository jpaOrderItemServiceRepository;
    private final RestClient restClient;
    @Value("${toss.widget.secret-key}")
    private String widgetSecretKey;

    @Autowired
    public OrderServiceImpl(JpaOrderServiceRepository jpaOrderServiceRepository, JpaUserInfoRepository jpaUserInfoRepository, JpaCartRepository jpaCartRepository, JpaOrderItemServiceRepository jpaOrderItemServiceRepository) {
        this.jpaOrderItemServiceRepository = jpaOrderItemServiceRepository;
        this.jpaOrderServiceRepository = jpaOrderServiceRepository;
        this.jpaUserInfoRepository = jpaUserInfoRepository;
        this.jpaCartRepository = jpaCartRepository;
        this.restClient = RestClient.create();
    }

    @Override
    public Order createOrder(OrderRequestDto requestDto) {
        Optional<UserInfo> userInfo = jpaUserInfoRepository.findById(requestDto.getUserId());
        String orderId = "ORDER-" + UUID.randomUUID();
        Order order = new Order();
        order.setOrderId(orderId);
        order.setUser(userInfo.get());
        order.setOrderName(requestDto.getOrderName());
        order.setTotalPrice((int) requestDto.getAmount());
        order.setStatus("PENDING");
        order.setUaddress(requestDto.getUaddress());
        order.setPostcode(requestDto.getPostcode());
        order.setOdate(LocalDateTime.now());
        return jpaOrderServiceRepository.save(order);
    }

    @Override
    public Object confirmPayment(TossPayDto dto) {
        Order order = jpaOrderServiceRepository.findByOrderId(dto.getOrderId())
                .orElseThrow(() -> new PaymentFailedException("주문 정보를 찾을 수 없습니다."));
        if (dto.getAmount() != order.getTotalPrice()) {
            throw new PaymentFailedException("결제 금액이 주문 금액과 일치하지 않습니다.");
        }
        String encodedAuth = Base64.getEncoder()
                .encodeToString((widgetSecretKey + ":").getBytes(StandardCharsets.UTF_8));
        try {
            Map response = restClient.post()
                    .uri("https://api.tosspayments.com/v1/payments/confirm")
                    .header("Authorization", "Basic " + encodedAuth)
                    .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
                    .body(Map.of(
                            "paymentKey", dto.getPaymentKey(),
                            "orderId", dto.getOrderId(),
                            "amount", dto.getAmount()
                    ))
                    .retrieve()
                    .body(Map.class);

            order.setPaymentKey(dto.getPaymentKey());
            order.setStatus("DONE");
            UserInfo user = order.getUser();
            int count = jpaOrderItemServiceRepository.insertOrderItem(order, user);
            if (count == 0) {
                throw new RuntimeException("주문할 상품이 없습니다.");
            }
            jpaCartRepository.deleteByUser(user);

            return response;

        } catch (Exception e) {
            throw new PaymentFailedException("결제 승인 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
    @Override
    public List<OrderResponseDto> findList(OrderRequestDto dto){
        List<Order> orders = jpaOrderServiceRepository.findByUserUidOrderByOdateDesc(dto.getUserId());
        List<OrderResponseDto> orderList = new ArrayList<>();
        for(Order order : orders) {
            orderList.add(new OrderResponseDto(order));
        }
        return orderList;
    }
}

