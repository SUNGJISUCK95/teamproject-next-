// src/utils/getApiBase.js

export function getApiBase() {
    // 🚨 서버 컴포넌트에서 실행 방지
    if (typeof window === "undefined") {
        // return "http://localhost:9000";
        return "http://54.180.89.176:9000";
    }

    let API_BASE = null;

    try {
        const API_BASES = JSON.parse(
            process.env.NEXT_PUBLIC_API_BASES || "[]"
        );

        const hostname = window.location.hostname;

        // 1) hostname 포함된 주소 매칭
        API_BASE = API_BASES.find((url) => url.includes(hostname));

        // 2) 로컬 환경 강제 localhost
        const isLocal =
            hostname === "localhost" ||
            hostname === "127.0.0.1" ||
            hostname === "::1" ||
            hostname.startsWith("192.168.") ||
            hostname.startsWith("10.");

        if (isLocal) {
            API_BASE = "http://localhost:9000";
        }

        // 3) fallback
        if (!API_BASE) {
            // API_BASE = "http://localhost:9000";
            API_BASE = "http://54.180.89.176:9000";
        }

    } catch (e) {
        console.error("API_BASE 파싱 실패:", e);
        // API_BASE = "http://localhost:9000";
        API_BASE = "http://54.180.89.176:9000";
    }

    return API_BASE;
}
