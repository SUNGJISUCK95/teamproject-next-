package com.springboot.bicycle_app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

/**
 * Gemini API 호출 서비스.
 *
 * 역할:
 *  - 사용자의 질문(prompt)을 Gemini API로 전송
 *  - Gemini가 생성한 텍스트 응답을 파싱하여 문자열로 반환
 *
 * 설정값:
 *  - gemini.api-key : Google API Key
 *  - gemini.url     : Gemini 모델 엔드포인트 URL
 */
@Service
@RequiredArgsConstructor
public class GeminiService {

    @Value("${gemini.api-key}")
    private String apiKey;

    @Value("${gemini.url}")
    private String geminiUrl;

    // Spring RestTemplate을 사용한 HTTP 요청 수행
    private final RestTemplate restTemplate = new RestTemplate();


    /**
     * 사용자 입력(prompt)을 Gemini API로 전달하고,
     * 생성된 텍스트 응답을 반환한다.
     *
     * 요청 형식(JSON):
     *  {
     *    "contents": [
     *      {
     *        "parts": [
     *          { "text": "<사용자 메시지>" }
     *        ]
     *      }
     *    ]
     *  }
     *
     * 응답 형식(JSON 예시):
     *  {
     *    "candidates": [
     *      {
     *        "content": {
     *          "parts": [
     *            { "text": "AI 응답 내용" }
     *          ]
     *        }
     *      }
     *    ]
     *  }
     *
     * 반환:
     *   Gemini가 생성한 텍스트 문자열
     */
    public String askGemini(String prompt) {
        try {
            // 요청 JSON 데이터 구성
            Map<String, Object> request = Map.of(
                    "contents",
                    List.of(Map.of("parts", List.of(Map.of("text", prompt))))
            );

            // 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("x-goog-api-key", apiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

            // Gemini API POST 요청
            ResponseEntity<Map> response =
                    restTemplate.postForEntity(geminiUrl, entity, Map.class);

            // 응답 구조에서 text 필드까지 추출
            Map candidate = (Map) ((List) response.getBody().get("candidates")).get(0);
            Map content = (Map) candidate.get("content");
            Map part = (Map) ((List) content.get("parts")).get(0);

            return (String) part.get("text");

        } catch (Exception e) {
            // 오류 시 기본 응답
            return "AI 응답을 가져오는 중 오류가 발생했습니다.";
        }
    }
}
