// src/utils/getApiBase.js

export function getApiBase() {
  if (typeof window === "undefined") {
    return "http://54.180.89.176:9000"; // 서버사이드 렌더링 시에도 EC2로
  }

  const hostname = window.location.hostname;
  const isLocal =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.");

  // 로컬은 로컬 백엔드로
  if (isLocal) return "http://localhost:9000";

  // 배포(공인IP 접속)는 EC2 백엔드로
  return "http://54.180.89.176:9000";
}
