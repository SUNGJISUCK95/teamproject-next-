'use client';

import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { getApiBase } from "@/src/utils/getApiBase";
import { getCurrentUser } from "@/src/utils/session";
import Pagination from "@/components/support/Pagination";

/**
 * BoardList Page (Next.js)
 *
 * 경로:
 * /board/[category]
 *
 * category:
 * - news | event | review
 */
export default function BoardCategoryPage({ params }) {
    const { category } = React.use(params);

    const router = useRouter();
    const [user, setUser] = useState(null);

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;
    const API_BASE = getApiBase();


    /**
     * 카테고리 변경 시 게시글 목록 조회
     */
    useEffect(() => {
        if (!category) return;

        axios
            .get(`${API_BASE}/api/board/${category}`)
            .then((res) => {
                setPosts(res.data);
                setCurrentPage(1);
            })
            .catch((err) => {
                console.error("게시글 목록 불러오기 실패:", err);
            });
    }, [category]);

    /**
     * 로그인 사용자 정보 로드
     * - 세션 기반이므로 새로고침하거나 페이지 이동해도 유지
     * - user.role 에 관리자 여부 포함
     */
    useEffect(() => {
        async function load() {
            const session = await getCurrentUser();

            if (session.isLogin) {
                setUser(session);
            } else {
                setUser(null);
            }
        }
        load();
    }, []);

    /**
     * 관리자 여부
     * - role: [{ authority: "ROLE_ADMIN" }]
     */
    const isAdmin = user?.role?.some((r) => r.authority === "ROLE_ADMIN");


    /**
     * 글 작성 가능 조건
     *
     * - 리뷰(review) → 모든 로그인 유저 가능
     * - 뉴스/이벤트 → 관리자만 가능
     */
    const canWrite =
        (category === "review" && user?.isLogin) ||
        ((category === "news" || category === "event") && isAdmin);

    /**
     * 페이지네이션 계산
     */
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPosts = posts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="board-list">

            {/* 게시글 카드 영역 */}
            <div className="board-cards">
                {currentPosts.length === 0 ? (
                    <p>등록된 게시글이 없습니다.</p>
                ) : (
                    currentPosts.map((post) => (
                        <div
                            key={post.pid}
                            className="board-card"
                            onClick={() =>
                                router.push(`/board/detail/${post.pid}`)
                            }
                        >
                            {/* 썸네일 */}
                            <img
                                src={post.thumbnailUrl || "/images/board/noimage.png"}
                                alt={post.title}
                                className="board-thumb"
                            />

                            {/* 제목 + 날짜 */}
                            <div className="board-info">
                                <h3>{post.title}</h3>
                                <p className="board-date">
                                    {post.createdAt?.slice(0, 10)}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}

            {/**
             * 글 작성 버튼 영역
             * - 로그인 O + 권한을 만족해야 노출
             */}
            {user ? (
                canWrite ? (
                    <div className="detail-footer">
                        <button
                            className="btn-back"
                            onClick={() =>
                                router.push(`/board/${category}/write`)
                            }
                        >
                            글 작성하기
                        </button>
                    </div>
                ) : (
                    // 로그인했지만 작성 권한이 없는 경우
                    <p className="detail-footer-case">
                        ※ 이 게시판은 관리자만 글을 작성할 수 있습니다.
                    </p>
                )
            ) : (
                // 비로그인 유저
                <p className="detail-footer-case">
                    ※ 로그인 후 글 작성이 가능합니다.
                </p>
            )}

        </div>
    );
}
