"use client";

import Header from "@/components/commons/Header";
import Footer from "@/components/commons/Footer";
import ScrollToTop from "@/components/commons/ScrollToTop";
import AuthHydrator from "@/app/providers/AuthHydrator.js";
import { useAuthStore } from "@/store/authStore.js";
import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
    const authChecked = useAuthStore((s) => s.authChecked);
    const pathname = usePathname();

    /** Footer 숨길 경로 */
    const hideFooterPaths = [
        "/travel",
        "/travel/",
        "/rental",
        "/rental/"
    ];

    const hideFooter = hideFooterPaths.some((path) =>
        pathname.startsWith(path)
    );

    return (
        <>
            <AuthHydrator />

            {!authChecked ? (
                <div className="app-loading">
                    <p style={{ textAlign: "center", paddingTop: "50px" }}>
                        🚀 Loading...
                    </p>
                </div>
            ) : (
                <>
                    <ScrollToTop />
                    <Header />
                    <main>{children}</main>

                    {/* 조건 처리 */}
                    {!hideFooter && <Footer />}
                </>
            )}
        </>
    );
}

