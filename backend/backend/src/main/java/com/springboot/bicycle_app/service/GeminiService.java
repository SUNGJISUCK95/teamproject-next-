package com.springboot.bicycle_app.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpStatusCodeException;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class GeminiService {

    @Value("${gemini.api-key}")
    private String apiKey;

    @Value("${gemini.url}")
    private String geminiUrl;

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

    private String maskKey(String k) {
        if (!StringUtils.hasText(k) || k.length() < 8) return "(empty)";
        return k.substring(0, 4) + "..." + k.substring(k.length() - 4);
    }

    public String askGemini(String prompt) {
        // ✅ 어떤 키를 쓰는지 마스킹해서 로그 출력
        log.info("Using GEMINI_API_KEY = {}", maskKey(apiKey));
        log.info("Gemini URL = {}", geminiUrl);

        try {
            // 요청 JSON 데이터 구성
            Map<String, Object> request = Map.of(
                    "contents", List.of(
                            Map.of("parts", List.of(Map.of("text", prompt)))
                    )
            );

            // 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // ✅ curl과 동일하게 URL에 key로 붙이는 방식(가장 확실)
            String url = geminiUrl + "?key=" + apiKey;

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

            // Gemini API POST 요청
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            Map body = response.getBody();
            if (body == null || !body.containsKey("candidates")) {
                log.error("Gemini 응답에 candidates 없음. body={}", body);
                return "AI 응답을 가져오는 중 오류가 발생했습니다.";
            }

            // 응답 구조에서 text 필드까지 추출
            Map candidate = (Map) ((List) body.get("candidates")).get(0);
            Map content = (Map) candidate.get("content");
            Map part = (Map) ((List) content.get("parts")).get(0);

            return (String) part.get("text");

        } catch (HttpStatusCodeException e) {
            log.error("Gemini HTTP 오류. status={}, body={}", e.getStatusCode(), e.getResponseBodyAsString());

            if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                return "현재 Gemini 무료 쿼터/요율 제한으로 AI 답변을 제공할 수 없습니다. (429)";
            }
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED || e.getStatusCode() == HttpStatus.FORBIDDEN) {
                return "Gemini API 키 권한/플랜 문제로 호출이 차단되었습니다.";
            }
            if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                return "Gemini 요청 형식/모델명 오류(400)입니다. 서버 로그를 확인하세요.";
            }
            return "AI 응답을 가져오는 중 오류가 발생했습니다.";
        } catch (Exception e) {
            log.error("Gemini 호출 예외: {}", e.getMessage(), e);
            return "AI 응답을 가져오는 중 오류가 발생했습니다.";
        }
    }
}
