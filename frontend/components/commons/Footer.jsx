"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaInstagram, FaYoutube, FaBlog } from "react-icons/fa";

/**
 * Footer 컴포넌트 (Next.js 버전)
 */
export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    /** 스크롤 위치 감지 */
    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /** Top 이동 */
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer">
            <div className="footer-container">

                {/* 로고 */}
                <div className="footer-logo">
                    <img src="/logo.png" alt="Bicycle Logo" />
                </div>

                {/* 링크 영역 */}
                <div className="footer-links">

                    <div>
                        <h4>게시판</h4>
                        <ul>
                            <li><Link href="/board/news">뉴스</Link></li>
                            <li><Link href="/board/event">이벤트</Link></li>
                            <li><Link href="/board/review">리뷰</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4>고객센터</h4>
                        <ul>
                            <li><Link href="/support/faq">자주 묻는 질문</Link></li>
                            <li><Link href="/support/asinfo">A/S 안내</Link></li>
                            <li><Link href="/support/resources">자료실</Link></li>
                        </ul>
                    </div>
                </div>

                {/* 회사 정보 */}
                <div className="footer-info">

                    <div className="footer-social">
                        <a href="https://www.instagram.com/cellobike_official/" target="_blank" rel="noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://www.youtube.com/channel/UCgb2432J7dUqZXaWe39FqQw" target="_blank" rel="noreferrer">
                            <FaYoutube />
                        </a>
                        <a href="https://blog.naver.com/celloblog" target="_blank" rel="noreferrer">
                            <FaBlog />
                        </a>
                    </div>

                    <p>
                        대표 홍길동 | 사업자등록번호 123-45-67890 <br />
                        대표번호 02-1234-5678 <br />
                        서울특별시 강남구 테헤란로 123
                    </p>

                    <div className="footer-policy">
                        <Link href="/policies/terms">이용약관</Link>
                        <Link href="/policies/privacy">개인정보 처리방침</Link>
                        <Link href="/policies/internal">내부정보 관리규정</Link>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                © 2025 Bicycle-App. All rights reserved.
            </div>

            {showTop && (
                <button className="top-btn" onClick={scrollToTop}>
                    ▲
                </button>
            )}
        </footer>
    );
}
