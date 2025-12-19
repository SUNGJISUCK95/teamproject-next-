'use client';

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { getApiBase } from "@/src/utils/getApiBase";
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
        </div>
    );
}
