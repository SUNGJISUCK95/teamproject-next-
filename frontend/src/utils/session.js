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
    const res = await axios.get(`${API_BASE}/auth/me`, {
      withCredentials: true, // 세션 쿠키 포함
    });

    let user = res.data;

    /** --- uid 보정 로직 --- */
    // userId 라는 이름으로 전달되는 경우가 있을 수 있으므로 uid로 통일
    // (초기 구조나 API 변경 시 호환성 확보)
    if (!user.uid && user.userId) {
      user.uid = user.userId;
    }

    /** --- role 보정 로직 --- */
    // role이 null/undefined면 기본값 세팅
    // (백엔드 오류 또는 정보 누락 시 빈 배열로 처리)
    if (!user.role) {
      user.role = [];
    }

    /** --- admin 계정 보정 로직 --- */
    // uid 또는 username이 "admin"이면서 role에 관리자 권한이 없다면 강제로 추가
    if (
      (user.uid === "admin" || user.username === "admin") &&
      !user.role.some((r) => r.authority === "ROLE_ADMIN")
    ) {
      user.role.push({ authority: "ROLE_ADMIN" });
    }

    return user;

  } catch (err) {
    // 로그인 안 되어 있으면 기본값 반환
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
  user?.role?.some((r) => r.authority === "ROLE_ADMIN");

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
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
};

/**
 * getLoginUser()
 *
 * LocalStorage 에 저장된 loginInfo를 가져옴.
 * 로그인 시 Redux/Session 동기화 이슈 때문에 보정 로직 포함.
 *
 * - userId → uid 보정
 * - role 값 없을 경우 기본 배열 세팅
 */
export function getLoginUser() {
  const info = localStorage.getItem("loginInfo");
  const parsed = info ? JSON.parse(info) : null;

  if (!parsed) return null;

  // uid 보정
  if (!parsed.uid && parsed.userId) {
    parsed.uid = parsed.userId;
  }

  // role 보정
  if (!parsed.role) {
    parsed.role = [];
  }

  return parsed;
}
