// src/utils/getApiBase.js
export function getApiBase() {
  const LOCAL = "http://localhost:9000";
  const PROD = "http://54.180.89.176:9000";

  // 서버(SSR)에서는 window 없으니 PROD로 두되, 필요하면 LOCAL로 바꿔도 됨
  if (typeof window === "undefined") return PROD;

  const hostname = window.location.hostname;

  const isLocal =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.");

  const base = isLocal ? LOCAL : PROD;

  // ✅ 안전장치: base가 이상하면 무조건 LOCAL로
  if (!base || !/^https?:\/\/.+:\d+$/i.test(base)) {
    console.warn("[getApiBase] invalid base =>", base, "fallback =>", LOCAL);
    return LOCAL;
  }

  return base;
}
