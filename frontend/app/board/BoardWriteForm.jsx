'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { getCurrentUser, getLoginUser } from "@/src/utils/session";
import { getApiBase } from "@/src/utils/getApiBase";

export default function BoardWriteForm({ mode = "write", pid }) {
    const router = useRouter();
    const API_BASE = getApiBase();
    const isEdit = mode === "edit";

    const [user, setUser] = useState(null);

    /* ===============================
       로그인 / 세션 검증
    =============================== */
    useEffect(() => {
        const local = getLoginUser();

        if (!local) {
            Swal.fire({
                icon: "info",
                title: "로그인 필요",
                text: "로그인이 필요한 서비스입니다.",
            });
            router.push("/login");
            return;
        }

        getCurrentUser().then((sessionUser) => {
            if (!sessionUser?.isLogin) {
                Swal.fire({
                    icon: "warning",
                    title: "세션 만료",
                    text: "다시 로그인해주세요.",
                });
                router.push("/login");
                return;
            }
            setUser(sessionUser);
        });
    }, []);

    /* ===============================
       CSRF Token
    =============================== */
    const getCsrfToken = () =>
        document.cookie
            .split("; ")
            .find((row) => row.startsWith("XSRF-TOKEN="))
            ?.split("=")[1];

    /* ===============================
       form state
    =============================== */
    const [form, setForm] = useState({
        title: "",
        content: "",
        uid: "",
        writer: "",
        imageUrl: "",
        thumbnailUrl: "",
        categoryTag: "review",
        status: "PUBLIC",
    });

    /* 로그인 사용자 반영 */
    useEffect(() => {
        if (user) {
            setForm((s) => ({
                ...s,
                uid: user.uid,
                writer: user.uid,
            }));
        }
    }, [user]);

    /* ===============================
       수정 모드: 기존 글 불러오기
    =============================== */
    useEffect(() => {
        if (!isEdit || !pid) return;

        axios
            .get(`${API_BASE}/api/board/detail/${pid}`, {
                withCredentials: true,
            })
            .then((res) => {
                const p = res.data;
                setForm({
                    title: p.title,
                    content: p.content,
                    uid: p.uid,
                    writer: p.writer || p.uid,
                    imageUrl: p.imageUrl,
                    thumbnailUrl: p.thumbnailUrl,
                    categoryTag: p.categoryTag,
                    status: p.status,
                });
            })
            .catch(() => {
                Swal.fire("오류", "게시글을 불러오지 못했습니다.", "error");
                router.push("/board/news");
            });
    }, [isEdit, pid]);

    /* ===============================
       input change
    =============================== */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    };

    /* ===============================
       이미지 업로드
    =============================== */
    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(
                `${API_BASE}/api/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-XSRF-TOKEN": getCsrfToken(),
                    },
                    withCredentials: true,
                }
            );

            setForm((s) => ({
                ...s,
                [type]: res.data.url,
            }));
        } catch (err) {
            console.error(err);
            Swal.fire("오류", "이미지 업로드 실패", "error");
        }
    };

    /* ===============================
       submit
    =============================== */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await axios.put(
                    `${API_BASE}/api/board/update/${pid}`,
                    { ...form, uid: user.uid },
                    {
                        headers: { "X-XSRF-TOKEN": getCsrfToken() },
                        withCredentials: true,
                    }
                );

                Swal.fire("성공", "게시글이 수정되었습니다.", "success");
                router.push(`/board/detail/${pid}`);
            } else {
                await axios.post(
                    `${API_BASE}/api/board/write`,
                    {
                        ...form,
                        uid: user.uid,
                        writer: user.uid,
                        boardCategory: { bname: form.categoryTag },
                    },
                    {
                        headers: { "X-XSRF-TOKEN": getCsrfToken() },
                        withCredentials: true,
                    }
                );

                Swal.fire("성공", "게시글이 등록되었습니다.", "success");
                router.push(`/board/${form.categoryTag}`);
            }
        } catch (err) {
            console.error(err);
            Swal.fire("오류", "처리 중 오류가 발생했습니다.", "error");
        }
    };

    /* ===============================
       render
    =============================== */
    return (
        <div className="board-page">
            <h1 className="board-title">
                {isEdit ? "게시글 수정" : "게시글 작성"}
            </h1>

            <form className="board-write-form" onSubmit={handleSubmit}>
                {/* 제목 */}
                <input
                    name="title"
                    placeholder="제목을 입력하세요"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                {/* 본문 */}
                <textarea
                    name="content"
                    placeholder="내용을 입력하세요"
                    value={form.content}
                    onChange={handleChange}
                    required
                />

                {/* 썸네일 */}
                <label className="upload-label">썸네일 이미지 첨부</label>
                <label className="upload-box">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            handleFileUpload(e, "thumbnailUrl")
                        }
                    />
                    <span>클릭하여 이미지 선택</span>
                </label>

                {form.thumbnailUrl && (
                    <div className="preview-container">
                        <img
                            src={form.thumbnailUrl}
                            alt="thumbnail preview"
                            className="preview-img"
                        />
                        <button
                            type="button"
                            className="delete-image-btn"
                            onClick={() =>
                                setForm((s) => ({
                                    ...s,
                                    thumbnailUrl: "",
                                }))
                            }
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* 본문 이미지 */}
                <label className="upload-label">본문 이미지 첨부</label>
                <label className="upload-box">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            handleFileUpload(e, "imageUrl")
                        }
                    />
                    <span>클릭하여 이미지 선택</span>
                </label>

                {form.imageUrl && (
                    <div className="preview-container">
                        <img
                            src={form.imageUrl}
                            alt="content preview"
                            className="preview-img"
                        />
                        <button
                            type="button"
                            className="delete-image-btn"
                            onClick={() =>
                                setForm((s) => ({
                                    ...s,
                                    imageUrl: "",
                                }))
                            }
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* 카테고리 */}
                <select
                    name="categoryTag"
                    value={form.categoryTag}
                    onChange={handleChange}
                >
                    <option value="news">뉴스</option>
                    <option value="event">이벤트</option>
                    <option value="review">리뷰</option>
                </select>

                {/* 버튼 */}
                <button type="submit" className="btn-back">
                    {isEdit ? "수정하기" : "등록"}
                </button>
            </form>
        </div>
    );
}
