"use client";

import Header from "@/components/commons/Header";
import Footer from "@/components/commons/Footer";
import ScrollToTop from "@/components/commons/ScrollToTop";

export default function AppShell({ children }) {
    return (
        <>
            <ScrollToTop />
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
