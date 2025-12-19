// chatbot.js
// 챗봇 API 요청 함수 모음

import axios from "axios";
import { getApiBase } from "@/src/utils/getApiBase.js";

// 백엔드 API 기본 URL (개발 환경별 자동 변경)
const API_BASE = getApiBase();

/**
 * 사용자 메시지를 백엔드 챗봇 API에 전달하고,
 * 응답(reply, linkText, linkUrl 등)을 받아오는 함수.
 *
 * 호출 흐름:
 * 1. 브라우저의 쿠키에서 CSRF 토큰(XSRF-TOKEN)을 읽어옴
 * 2. axios.post()로 백엔드 "/api/chatbot" 엔드포인트 호출
 * 3. 응답 JSON을 그대로 반환
 * 4. 오류 발생 시 기본 메시지 반환
 *
 * 반환 형식:
 * {
 *   reply: "응답 메시지",
 *   linkText: "링크 텍스트(있을 수도 있음)",
 *   linkUrl: "/some/path"
 * }
 */
export const getChatbotResponse = async (userMessage) => {
    try {
        // CSRF Token(XSRF-TOKEN 쿠키) 추출
        const csrfToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1];

        // 백엔드에 POST 요청 전송
        const response = await axios.post(
            `${API_BASE}/api/chatbot`,
            { message: userMessage }, // Request Body
            {
                headers: {
                    "X-XSRF-TOKEN": csrfToken || "", // Spring Security CSRF 대응
                },
                withCredentials: true, // 세션 쿠키 포함 전송
            }
        );

        // 정상 응답 반환
        return response.data;

    } catch (error) {
        console.error("Chatbot API Error:", error);

        // 오류 발생 시 기본 응답 반환
        return {
            reply: "서버 연결에 문제가 발생했습니다.",
        };
    }
};