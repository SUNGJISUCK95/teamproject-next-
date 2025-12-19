"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop (Next.js App Router)
 *
 * - 페이지 경로(pathname)가 변경될 때마다
 *   스크롤을 자동으로 최상단으로 이동
 */
export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [pathname]);

    return null;
}
