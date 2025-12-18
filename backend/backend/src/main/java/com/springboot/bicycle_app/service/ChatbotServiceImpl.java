package com.springboot.bicycle_app.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.bicycle_app.dto.ChatbotFaq;
import com.springboot.bicycle_app.repository.ChatbotRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ChatbotService 구현체.
 *
 * 주요 기능:
 *  - 챗봇 FAQ 초기 데이터(JSON → DB) 자동 로드
 *  - 사용자 메시지 기반 FAQ 검색
 *  - FAQ에서 찾지 못한 경우 Gemini AI로 응답 생성
 */
@Service
@RequiredArgsConstructor
public class ChatbotServiceImpl implements ChatbotService {

    private final ChatbotRepository chatbotRepository;
    private final GeminiService geminiService; // FAQ 검색 실패 시 백업으로 사용
    private final ObjectMapper mapper = new ObjectMapper();


    /**
     * 서버 시작 시 chatbot_data.json 파일을 읽어
     * chatbot_faq 테이블에 초기 데이터를 자동으로 삽입한다.
     *
     * 동작 조건:
     *  - DB가 비어 있을 경우에만 실행한다.
     *
     * JSON 위치:
     *  resources/data/chatbot_data.json
     */
    @PostConstruct
    public void initChatbotData() {
        try {
            // DB가 비어 있을 경우에만 초기 데이터 로드
            if (chatbotRepository.count() == 0) {

                InputStream is =
                        new ClassPathResource("data/chatbot_data.json").getInputStream();

                List<ChatbotFaq> list =
                        mapper.readValue(is, new TypeReference<List<ChatbotFaq>>() {});

                list.forEach(chatbotRepository::save);

                System.out.println("chatbot_data.json → DB 로드 완료 (" + list.size() + "건)");

            } else {
                System.out.println("chatbot_faq 테이블에 기존 데이터 존재");
            }

        } catch (Exception e) {
            System.err.println("chatbot_data.json 로드 실패: " + e.getMessage());
        }
    }

    /**
     * 사용자 메시지를 분석하여 챗봇 응답을 생성한다.
     *
     * 처리 순서:
     *  1. 키워드를 이용해 DB FAQ 검색
     *     - 일치하는 FAQ가 있으면 해당 답변을 반환
     *  2. FAQ 검색 실패 시 Gemini AI를 사용해 답변 생성
     *  3. 에러 발생 시 기본 안내 메시지 반환
     *
     * 반환 형식(Map):
     *  - reply     : 챗봇 응답 메시지 (필수)
     *  - linkText  : 추천 링크 버튼 텍스트 (선택)
     *  - linkUrl   : 추천 링크 URL (선택)
     */
    @Override
    public Map<String, Object> getChatResponse(String userMessage) {

        Map<String, Object> result = new HashMap<>();

        try {
            // 1. FAQ DB 검색
            ChatbotFaq faq = chatbotRepository.findByKeyword(userMessage);

            if (faq != null) {
                result.put("reply", faq.getAnswer());
                result.put("linkText", faq.getLinkText());
                result.put("linkUrl", faq.getLinkUrl());
                return result;
            }

            // 2. DB에 FAQ가 없을 경우 Gemini AI로 답변 생성
            String aiReply = geminiService.askGemini(userMessage);
            result.put("reply", aiReply);

        } catch (Exception e) {
            // 예외 발생 시 기본 안내 메시지 세팅
            result.put("reply",
                    "관련 정보를 찾지 못했습니다. ‘A/S’, ‘배송’, ‘환불’과 같은 키워드를 입력해보세요.");
        }

        return result;
    }
}
