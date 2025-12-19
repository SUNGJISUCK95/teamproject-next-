/**
 * Chatbot 컴포넌트
 *
 * 역할:
 * - 사용자와 챗봇 간의 대화 UI 제공
 * - 메시지 저장(localStorage), 스크롤 유지, 링크 이동 등 포함
 * - 백엔드 API(/api/chatbot) → DB/AI(Gemini) → 답변 반환
 *
 * 주요 특징:
 * - localStorage로 메시지, 입력 내용, 스크롤 위치까지 모두 영구 저장
 * - 창 닫았다가 다시 열어도 이전 대화 그대로 유지
 * - linkText, linkUrl 기반으로 챗봇이 페이지 이동 버튼 제공 가능
 * - CSRF 토큰 포함 (Spring Security)
 *
 * 전달 props:
 * - onClose: 챗봇 창 닫기 함수 (Header에서 제어)
 */

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getChatbotResponse } from "@/src/api/chatbot.js";
import { FaRedoAlt, FaTimes } from "react-icons/fa";

export function Chatbot({ onClose }) {
    const router = useRouter();
    const chatBodyRef = useRef(null);

    /* 1) CSRF Token 가져오기 */
    const getCsrfToken = () => {
        return document.cookie
            .split("; ")
            .find((row) => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1];
    };

    /*
     * 2) 메시지 상태 (localStorage 유지)
     *  - 브라우저 리프레시/창 닫기 후에도 유지됨
     */
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("chatMessages");

        // 저장된 메시지가 있으면 그대로 불러오기
        return saved
            ? JSON.parse(saved)
            : [
                {
                    sender: "bot",
                    text: `안녕하세요 😊 Bicycle-App 고객센터입니다.
  다음과 같은 키워드를 입력하시면 빠르게 답변을 받을 수 있어요!
  👉 예: '배송', '환불', 'A/S', '자료실', '회원가입'`,
                },
            ];
    });

    /* 입력창 내용 저장 */
    const [input, setInput] = useState(localStorage.getItem("chatInput") || "");
    /* 챗봇 응답 로딩 여부 */
    const [loading, setLoading] = useState(false);
    /* 저장된 스크롤 위치 */
    const [scrollPos, setScrollPos] = useState(
        Number(localStorage.getItem("chatScroll")) || 0
    );

    /* -------------------------------
       3) localStorage 업데이트
    --------------------------------*/
    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => localStorage.setItem("chatInput", input), [input]);

    useEffect(() => localStorage.setItem("chatScroll", scrollPos), [scrollPos]);

    /* -------------------------------
       4) 창 닫기 (현재 스크롤 저장 후 닫기)
    --------------------------------*/
    const handleClose = () => {
        if (chatBodyRef.current) {
            const pos = chatBodyRef.current.scrollTop;
            setScrollPos(pos);
            localStorage.setItem("chatScroll", pos);
        }
        onClose();
    };

    /* -------------------------------
       5) 초기화 버튼
    --------------------------------*/
    const handleReset = () => {
        localStorage.removeItem("chatMessages");
        localStorage.removeItem("chatInput");
        localStorage.removeItem("chatScroll");

        setMessages([
            {
                sender: "bot",
                text: `안녕하세요 😊 Bicycle-App 고객센터입니다.
👉 예: '배송', '환불', 'A/S', '자료실', '회원가입'`,
            },
        ]);
        setInput("");
        setScrollPos(0);
    };

    /* -------------------------------
       6) 스크롤 복원
    --------------------------------*/
    useEffect(() => {
        if (chatBodyRef.current) {
            const savedPos = Number(localStorage.getItem("chatScroll")) || 0;
            chatBodyRef.current.scrollTo({ top: savedPos, behavior: "smooth" });
        }
    }, []);

    /* -------------------------------
       7) 메시지가 추가될 때 자동 스크롤 아래로 이동
    --------------------------------*/
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    /* -------------------------------
       8) 메시지 전송
    --------------------------------*/
    const handleSend = async () => {
        if (!input.trim()) return;

        // 사용자 메시지
        const userMsg = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        // 챗봇 응답
        const botRes = await getChatbotResponse(input, getCsrfToken());

        const botMsg = {
            sender: "bot",
            text: botRes.reply,
            linkText: botRes.linkText,
            linkUrl: botRes.linkUrl,
        };

        setMessages((prev) => [...prev, botMsg]);
        setLoading(false);
    };

    /* -------------------------------
       9) 링크 이동 (챗봇에서 버튼 클릭 시)
    --------------------------------*/
    const goToLink = (url) => {
        const finalUrl = url.startsWith("/") ? url : `/${url}`;
        router.push(finalUrl); // ✅ Next.js 이동
    };

    return (
        <div className="chatbot-popup">
            <div className="chatbot-window">

                {/* ---------- 헤더 ---------- */}
                <div className="chatbot-header">
                    <h4>고객센터 챗봇</h4>

                    <div className="chatbot-header-buttons">
                        <button className="refresh-btn" onClick={handleReset}>
                            <FaRedoAlt />
                        </button>
                        <button className="close-btn" onClick={handleClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* ---------- 본문 ---------- */}
                <div className="chatbot-body" ref={chatBodyRef}>
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`chat-msg ${msg.sender}`}>
                            <p>{msg.text}</p>

                            {/* linkText + linkUrl이 있으면 버튼 표시 */}
                            {msg.linkText && msg.linkUrl && (
                                <div className="chatbot-links">
                                    {msg.linkUrl.split(",").map((url, i) => {
                                        const texts = msg.linkText.split(",");
                                        const text = texts[i] || texts[0];

                                        return (
                                            <button
                                                key={i}
                                                className="chatbot-link-btn"
                                                onClick={() => goToLink(url.trim())}
                                            >
                                                {text}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="chat-msg bot loading">
                            ⌛ 답변을 작성 중입니다...
                        </div>
                    )}
                </div>

                {/* ---------- 입력창 ---------- */}
                <div className="chatbot-input">
                    <input
                        type="text"
                        placeholder="메시지를 입력하세요..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />

                    <button onClick={handleSend} disabled={loading}>
                        {loading ? "응답 중" : "전송"}
                    </button>
                </div>
            </div>
        </div>
    );
}
