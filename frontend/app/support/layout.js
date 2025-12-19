"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Chatbot } from "@/components/support/Chatbot.jsx";

export default function SupportLayout({ children }) {
    const [showChatbot, setShowChatbot] = useState(false);
    const pathname = usePathname();

    return (
        <div className="support-page">
            <h1 className="support-title">고객센터</h1>

            {/* 탭 네비게이션 */}
            <div className="support-tabs">
                <Link href="/support/faq">
                    <button className={pathname === "/support/faq" ? "active" : ""}>
                        자주 묻는 질문
                    </button>
                </Link>

                <Link href="/support/asinfo">
                    <button className={pathname === "/support/asinfo" ? "active" : ""}>
                        A/S 안내
                    </button>
                </Link>

                <Link href="/support/resources">
                    <button className={pathname === "/support/resources" ? "active" : ""}>
                        자료실
                    </button>
                </Link>
            </div>

            {/* 탭 콘텐츠 */}
            <div className="tab-content">
                {children}
            </div>

            {/* 고객센터 안내 */}
            <div className="support-contact">
                <p className="support-label">고객센터</p>
                <h2>02-1234-5678</h2>
                <p>평일 오전 9시 ~ 오후 6시</p>
                <p>토요일, 일요일, 공휴일 휴무</p>

                <div className="support-buttons">
                    <button onClick={() => setShowChatbot(true)}>
                        챗봇 상담
                    </button>
                </div>
            </div>

            {/* Chatbot 팝업 */}
            {showChatbot && (
                <Chatbot onClose={() => setShowChatbot(false)} />
            )}
        </div>
    );
}
