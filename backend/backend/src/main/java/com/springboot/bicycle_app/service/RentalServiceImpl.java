package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.RentalPayment;
import com.springboot.bicycle_app.dto.RentalPaymentRequest;
import com.springboot.bicycle_app.dto.kakaopaydto.RentalHistory;
import com.springboot.bicycle_app.dto.kakaopaydto.RentalStatusDetails;
import com.springboot.bicycle_app.repository.kakaopayrepository.KakaoPayRepository;
import com.springboot.bicycle_app.repository.kakaopayrepository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RentalServiceImpl implements RentalService{

    private final RentalRepository rentalRepository;
    private final KakaoPayRepository kakaoPayRepository;

    @Autowired
    public RentalServiceImpl(RentalRepository rentalRepository, KakaoPayRepository kakaoPayRepository) {
        this.rentalRepository = rentalRepository;
        this.kakaoPayRepository = kakaoPayRepository;
    }

    @Transactional
    @Override
    public RentalPayment processPayment(RentalPaymentRequest request) {

        // DB 저장 로직 수행
        String generatedId = rentalRepository.saveRental(request);

        if(generatedId == null){
            return new RentalPayment("FAILURE", "대여 기록 저장에 실패했습니다.", null);
        }

        return new RentalPayment("SUCCESS", "자전거 대여 및 결제가 완료되었습니다.", generatedId);
    }

    @Override
    public RentalStatusDetails getFinalRentalDetails(String orderId) {
        // 1. 카카오페이 기록 및 사용자 ID 조회
        String partnerUserId = kakaoPayRepository.findUserIdByOrderId(orderId);
        if (partnerUserId == null) {
            throw new RuntimeException("결제 기록을 찾을 수 없습니다. (orderId: " + orderId + ")");
        }

        // 2. 렌탈 기록 조회 (rental_history 테이블)
        RentalHistory history = rentalRepository.findByOrderId(orderId);
        if (history == null) {
            throw new RuntimeException("대여 기록(rental_history)을 찾을 수 없습니다. 결제는 되었으나, 기록 저장이 실패했을 수 있습니다.");
        }

        // 3. 모든 정보가 조회되었으므로 DTO를 구성하여 반환 (프론트엔드가 원하는 정보)
        return RentalStatusDetails.builder()
                .finalStatus("APPROVED") // 결제 성공 상태
                .rentalState(history.getStatus()) // DB에서 가져온 대여 상태
                .partnerOrderId(orderId)
                .userId(partnerUserId)
                .bikeId(history.getBikeId())
                .stationName(history.getStationName())
                .startTime(history.getStartTime())
                .build();
    }
}