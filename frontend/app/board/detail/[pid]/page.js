'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter, useParams } from "next/navigation";

import {
    getCurrentUser,
    isAdmin,
    isOwner,
    getCsrfToken,
} from "@/src/utils//session.js";
import { getApiBase } from "@/src/utils/getApiBase";

// import "@/styles/board.css";
// import "@/styles/board/board_detail.css";

/**
 * BoardDetail (Next.js)
 *
 * 기능:
 * - 게시글 상세 조회
 * - 본문 이미지 + 텍스트 출력
 * - 관리자 / 작성자 본인일 경우 수정 & 삭제 버튼 활성화
 * - 삭제 시 CSRF 토큰 포함 DELETE 요청
 *
 * 경로:
 * /board/detail/[pid]
 */
export default function BoardDetailPage() {
    const { pid } = useParams();          // ✅ Next 방식 params
    const router = useRouter();           // ✅ Next router
    const API_BASE = getApiBase();

    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);

    /**
     * 로그인 사용자 정보
     */
    useEffect(() => {
        getCurrentUser().then(setUser);
    }, []);

    /**
     * 게시글 상세 조회
     */
    useEffect(() => {
        if (!pid) return;

        axios
            .get(`${API_BASE}/api/board/detail/${pid}`)
            .then((res) => setPost(res.data))
            .catch(() => {
                Swal.fire("오류", "게시글을 불러오지 못했습니다.", "error");
                router.push("/board/news");
            });
    }, [pid]);

    /**
     * 관리자 또는 작성자 여부
     */
    const canManage = isAdmin(user) || isOwner(user, post);

    /**
     * 삭제
     */
    const handleDelete = async () => {
        if (!confirm("정말 삭제할까요?")) return;

        try {
            await axios.delete(`${API_BASE}/api/board/delete/${pid}`, {
                headers: { "X-XSRF-TOKEN": getCsrfToken() },
                withCredentials: true,
            });

            Swal.fire("삭제 완료", "게시글이 삭제되었습니다.", "success");

            const backTab = post?.categoryTag || "news";
            router.push(`/board/${backTab}`);
        } catch (e) {
            console.error(e);
            Swal.fire("오류", "삭제 중 오류가 발생했습니다.", "error");
        }
    };

    /**
     * 수정 페이지 이동
     * React Router의 state(fromBoard) 개념은
     * Next에서는 사용하지 않음
     */
    const handleEdit = () => {
        router.push(`/board/edit/${pid}`);
    };

    /**
     * 로딩 상태
     */
    if (!post) {
        return (
            <p style={{ textAlign: "center", marginTop: "100px" }}>
                게시글을 불러오는 중입니다...
            </p>
        );
    }

    return (
        <div className="board-detail">
            {/* 제목 */}
            <h1 className="detail-title">{post.title}</h1>

            {/* 메타 정보 */}
            <div className="detail-meta">
                <span>작성자: {post.writer || "관리자"}</span>
                <span>{post.createdAt?.slice(0, 10)}</span>
                <span>조회수: {post.viewCount}</span>
            </div>

            <hr className="detail-divider" />

            {/* 본문 */}
            <div className="detail-content">
                {post.imageUrl && (
                    <div className="detail-image-box">
                        <img
                            src={post.imageUrl}
                            alt="본문 이미지"
                            className="detail-image"
                        />
                    </div>
                )}

                <p className="detail-text">{post.content}</p>
            </div>

            {/* 하단 버튼 */}
            <div className="detail-footer">
                <button
                    className="btn-back"
                    onClick={() => router.push(`/board/${post.categoryTag}`)}
                >
                    목록으로
                </button>

                {canManage && (
                    <>
                        <button className="btn-back" onClick={handleEdit}>
                            수정
                        </button>
                        <button className="btn-back" onClick={handleDelete}>
                            삭제
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
