package com.springboot.bicycle_app.service.kakaopayservice;

import com.springboot.bicycle_app.repository.kakaopayrepository.RentalRepository;
import com.springboot.bicycle_app.dto.RentalPaymentRequest;
import com.springboot.bicycle_app.dto.kakaopaydto.KakaoPayApproveResponse;
import com.springboot.bicycle_app.dto.kakaopaydto.KakaoPayReadyResponse;
import com.springboot.bicycle_app.repository.kakaopayrepository.KakaoPayRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoPayServiceImpl implements KakaoPayService {
    // application.yml에서 값 로드
    @Value("${kakaopay.pay.host}") private String HOST;
    @Value("${kakaopay.pay.admin-key}") private String ADMIN_KEY;
    @Value("${kakaopay.pay.cid}") private String CID;
    @Value("${kakaopay.pay.ready-url}") private String READY_URL;
    @Value("${kakaopay.pay.approve-url}") private String APPROVE_URL;
    @Value("${kakaopay.pay.success-redirect-url}") private String SUCCESS_URL;
    @Value("${kakaopay.pay.cancel-redirect-url}") private String CANCEL_URL;
    @Value("${kakaopay.pay.fail-redirect-url}") private String FAIL_URL;

    private final RentalRepository rentalRepository;
    private final KakaoPayRepository kakaoPayRepository;
    private final RestTemplate restTemplate =  new RestTemplate();

    @Autowired
    public KakaoPayServiceImpl(RentalRepository rentalRepository, KakaoPayRepository kakaoPayRepository) {
        this.rentalRepository = rentalRepository;
        this.kakaoPayRepository = kakaoPayRepository;
    }

    // ----------------------------------------------------
    // 1. 결제 준비 로직
    // ----------------------------------------------------
    @Override
    public KakaoPayReadyResponse readyToPay(RentalPaymentRequest request) {

        //1. DB에 대여 기록 저장 후, partner_order_id로 사용할 rentalId 획득
        String rentalId = rentalRepository.saveRental(request);
        if(rentalId == null) throw new RuntimeException("대여 정보 DB저장 실패");

        // 2. HTTP Herders 설정 (403 에러 방지)
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + ADMIN_KEY);
        headers.add("Content-type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=utf-8");

        //3. HTTP Body 설정(카카오페이 요청 파라미터)
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", CID);
        params.add("partner_order_id", rentalId); // DB에서 생성된 ID 사용
        params.add("partner_user_id", request.getUserId());
        params.add("item_name", "자전거 대여료");
        params.add("quantity", "1");
        params.add("total_amount", String.valueOf(request.getPaymentAmount()));
        params.add("tax_free_amount", "0");
        params.add("approval_url", SUCCESS_URL + "?partner_order_id=" + rentalId); // 승인 후 orderId를 다시 받기 위해 추가
        params.add("cancel_url", CANCEL_URL);
        params.add("fail_url", FAIL_URL);

        //4. API 호출 및 응답
        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(params, headers);

        try{
            ResponseEntity<KakaoPayReadyResponse> response = restTemplate.exchange(
                    READY_URL,
                    HttpMethod.POST,
                    body,
                    KakaoPayReadyResponse.class
            );

            KakaoPayReadyResponse readyResponse = response.getBody();
            if(readyResponse != null) {
                // 5. DB에 TID 저장 (kakaopay_history 테이블 호출)
                kakaoPayRepository.saveReadyPayment(
                        readyResponse.getTid(),
                        rentalId,
                        request.getUserId(),
                        (int)request.getPaymentAmount()
                );
                System.out.println("✅ KakaoPay History 테이블 저장 성공!");
            }
            return readyResponse;
        }catch(Exception e){
            System.err.println("Kakao Ready API 호출 실패: " + e.getMessage());
            throw new RuntimeException("카카오페이 서버와의 통신에 실패했습니다.", e);
        }
    }

    // ----------------------------------------------------
    // 2. 최종 결제 승인 로직
    // ----------------------------------------------------
    @Transactional
    @Override
    public void approvePay(String partnerOrderId, String pgToken) {

        // 1. DB에서 TID 및 사용자 ID 조회
        String tid = kakaoPayRepository. findTidByOrderId(partnerOrderId);
        String userId = kakaoPayRepository. findUserIdByOrderId(partnerOrderId);

        if (tid == null) throw new RuntimeException("유효하지 않거나 만료된 주문 ID입니다.");

//        // 2. HTTP Headers 설정 (Ready와 동일)
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "KakaoAK" + ADMIN_KEY);
//        headers.add("Content-type", MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8");

        // 2. HTTP Headers 설정 (수정됨: 공백 추가 및 Content-type 변경)
        HttpHeaders headers = new HttpHeaders();
        // KakaoAK 뒤에 공백 추가
        headers.add("Authorization", "KakaoAK " + ADMIN_KEY);
        // Content-type을 FORM_URLENCODED로 변경
        headers.add("Content-type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 3. HTTP Body 설정
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", CID);

        params.add("tid", tid); // Ready 단계에서 DB에 저장한 TID
        params.add("partner_order_id", partnerOrderId);
        params.add("partner_user_id", userId);
        params.add("pg_token", pgToken); // URL 파라미터로 받은 PG Token

        // 4. API 호출 및 응답
        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<KakaoPayApproveResponse> response = restTemplate.exchange(
                    APPROVE_URL,
                    HttpMethod.POST,
                    body,
                    KakaoPayApproveResponse.class
            );

            // 5. DB상태 업데이트
            if (response.getStatusCode() == HttpStatus.OK) {
//                kakaoPayRepository.updatePaymentStatus(partnerOrderId, "SUCCESS");

                // 🚨 수정 3-1: KakaoPayHistory 상태 업데이트
                kakaoPayRepository.updatePaymentStatus(partnerOrderId, "SUCCESS");

                // 🚨 수정 3-2: 렌탈/대여 기록의 상태 업데이트 (필수)
                rentalRepository.updateRentalStatus(partnerOrderId, "대여 중"); // 👈 고객님 로직에 맞게 메서드 이름 확인

            } else {
                //HTTP OK (200)가 아니거나 응답에 문제가 있을 경우
                kakaoPayRepository.updatePaymentStatus(partnerOrderId, "FAILED_APPROVE");
                throw new RuntimeException("카카오페이 최종 승인 실패");
            }
        } catch (Exception e) {
            System.err.println("KakaoPay Approve API 호출 실패: " + e.getMessage());
            kakaoPayRepository.updatePaymentStatus(partnerOrderId, "ERROR");// 통신 에러 시 상태 업데이트
            throw new RuntimeException("결제 승인 과정에서 서버 통신 오류 발생");
        }
    }
}
