import axios from "axios";
import { getApiBase } from "./getApiBase.js";

const API_BASE = getApiBase();

/**
 * getCurrentUser()
 *
 * 목적:
 *  - 백엔드(Spring Security 세션)로부터 현재 로그인한 사용자 정보를 가져온다.
 *  - 세션 인증 기반이기 때문에 withCredentials 옵션으로 쿠키를 전송해야 한다.
 *
 * 백엔드 응답 예시 (/auth/me):
 *  {
 *    isLogin: true,
 *    uid: "test1",
 *    role: [
 *      { authority: "ROLE_USER" },
 *      { authority: "ROLE_ADMIN" }
 *    ]
 *  }
 *
 * 보정 로직 포함:
 *  - userId → uid 정규화
 *  - role 값 없으면 기본 배열 생성
 *  - admin 계정 보정 (관리자 필드 누락 대비)
 */
export const getCurrentUser = async () => {
    try {
        const res = await axios.get(`${API_BASE}/api/board/me`, {
            withCredentials: true,
        });

        const user = res.data;

        if (!user?.isLogin) {
            return { isLogin: false };
        }

        // uid 보정
        if (!user.uid && user.userId) {
            user.uid = user.userId;
        }

        // role 보정
        if (!Array.isArray(user.role)) {
            user.role = [];
        }

        // admin 보정
        if (
            (user.uid === "admin" || user.username === "admin") &&
            !user.role.some((r) => r.authority === "ROLE_ADMIN")
        ) {
            user.role.push({ authority: "ROLE_ADMIN" });
        }

        return user; // ✅ isLogin 유지
    } catch {
        return { isLogin: false };
    }
};


/**
 * isAdmin(user)
 *
 * 사용자 객체 내 role 목록을 검사해 관리자 여부를 반환.
 * 백엔드와 상태 일치 확인용.
 */
export const isAdmin = (user) =>
    Array.isArray(user?.role) &&
    user.role.some((r) => r.authority === "ROLE_ADMIN");

/**
 * isOwner(user, post)
 *
 * user.uid === post.uid 인지 비교하여
 * 글 작성자 본인 여부를 확인.
 */
export const isOwner = (user, post) =>
  user?.uid && post?.uid && user.uid === post.uid;

/**
 * getCsrfToken()
 *
 * 쿠키에 저장된 XSRF-TOKEN 값을 파싱하여 반환.
 * PUT / POST / DELETE 요청 시 X-XSRF-TOKEN 헤더로 전달해야 한다.
 */
export const getCsrfToken = () => {
    if (typeof document === "undefined") return null;

    return document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];
};