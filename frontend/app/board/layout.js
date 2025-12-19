'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { key: "news", label: "뉴스" },
    { key: "event", label: "이벤트" },
    { key: "review", label: "리뷰" },
];

export default function BoardLayout({ children }) {
    const pathname = usePathname();

    /**
     * ✅ 상세 / 수정 페이지 여부
     * - /board/detail/[pid]
     * - /board/edit/[pid]
     */
    const isDetailPage =
        pathname.startsWith("/board/detail") ||
        pathname.startsWith("/board/edit");

    return (
        <div className="board-page">
            {/* ✅ 목록 페이지에서만 게시판 제목 표시 */}
            {!isDetailPage && (
                <h1 className="board-title">게시판</h1>
            )}

            {/* ✅ 목록 페이지에서만 탭 표시 */}
            {!isDetailPage && (
                <div className="board-tabs">
                    {tabs.map(tab => (
                        <Link key={tab.key} href={`/board/${tab.key}`}>
                            <button
                                className={
                                    pathname === `/board/${tab.key}`
                                        ? "active"
                                        : ""
                                }
                            >
                                {tab.label}
                            </button>
                        </Link>
                    ))}
                </div>
            )}

            {children}
        </div>
    );
}
