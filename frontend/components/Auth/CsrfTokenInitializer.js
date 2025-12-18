'use client';

import { useEffect } from 'react';
// 1단계에서 만든 클라이언트 함수 임포트
import { createCsrfToken } from "@/utils/csrf/manageCsrfToken";

export default function CsrfTokenInitializer() {
    useEffect(() => {
        // 이 함수는 오직 브라우저(클라이언트)에서만 실행됩니다.
        createCsrfToken();
    }, []);

    // 이 컴포넌트는 UI를 렌더링하지 않습니다.
    return null;
}