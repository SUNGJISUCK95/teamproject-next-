package com.springboot.bicycle_app.dto;

import lombok.Data;

/**
 * 챗봇 FAQ 데이터 모델
 *
 * ChatbotService에서 FAQ 목록을 불러오거나,
 * 사용자가 입력한 메시지와 일치하는 FAQ를 검색할 때 사용하는 DTO.
 *
 * 필드 설명:
 * - id        : FAQ 고유 ID (JSON 또는 DB 기준)
 * - keyword   : 검색 키워드 (예: "배송", "환불", "A/S")
 * - question  : FAQ 질문 내용
 * - answer    : FAQ 답변 내용
 * - linkText  : FAQ와 함께 제공할 링크 버튼 텍스트
 * - linkUrl   : 관련 페이지 URL (예: "/support/as", "/products/best")
 *
 * 실제 챗봇 응답 구성 시:
 * - answer는 챗봇 메시지로 출력되고,
 * - linkText + linkUrl은 "자세히 보기" 버튼 같은 형태로 프론트에서 활용된다.
 */
@Data
public class ChatbotFaq {
    private int id;
    private String keyword;
    private String question;
    private String answer;
    private String linkText;
    private String linkUrl;
}
