package com.springboot.bicycle_app.service;

import java.util.Map;

/**
 * 챗봇 응답 생성 로직을 정의하는 서비스 인터페이스.
 *
 * 역할:
 * - 사용자가 입력한 메시지를 분석하여
 *   적절한 FAQ 답변 또는 기본 메시지를 반환한다.
 *
 * 반환 형식(Map<String, Object>):
 *   {
 *     "response": "챗봇이 사용자에게 보낼 메시지",
 *     "linkText": "버튼 텍스트 (옵션)",
 *     "linkUrl":  "버튼 링크 (옵션)"
 *   }
 *
 * 구현체(ChatbotServiceImpl)에서:
 * - FAQ DB 조회
 * - 유사 키워드 매칭
 * - 기본 답변 처리
 * 등의 로직을 수행한다.
 */
public interface ChatbotService {

    /**
     * 입력 메시지에 대해 챗봇 응답을 생성한다.
     *
     * message:
     *   사용자가 챗봇 UI에 입력한 문장.
     *
     * 반환:
     *   챗봇 메시지 + (필요 시) 추천 링크를 포함한 정보 Map.
     *   필드 구성은 구현체에서 정의한다.
     */
    Map<String, Object> getChatResponse(String message);
}
