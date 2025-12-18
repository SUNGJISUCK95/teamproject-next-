package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Chatbot Controller
 * 프론트엔드(Chatbot.jsx)의 메시지를 받아
 * ChatbotService를 통해 응답을 생성하여 반환하는 API 컨트롤러.
 */
@RestController
@RequestMapping("/api/chatbot")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // React에서의 요청 허용
public class ChatbotController {

    private final ChatbotService chatbotService;

    /**
     * 챗봇 메시지 처리 API
     * 프론트엔드 -> { "message": "사용자가 입력한 문장" }
     * 백엔드   -> { "response": "챗봇의 답변" } 형태로 반환
     *
     * 예: POST /api/chatbot
     *
     * request:
     *  {
     *      "message": "A/S 신청하려면 어떻게 해야 하나요?"
     *  }
     *
     * response:
     *  {
     *      "response": "A/S 신청은 고객센터 A/S 안내 페이지에서 가능합니다!"
     *  }
     */
    @PostMapping
    public Map<String, Object> chat(@RequestBody Map<String, String> request) {

        // 클라이언트에서 보낸 메시지 가져오기
        String message = request.get("message");
        
        // 서비스에서 챗봇 응답 생성
        return chatbotService.getChatResponse(message);
    }
}
