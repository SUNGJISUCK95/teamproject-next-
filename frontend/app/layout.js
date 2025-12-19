import AppShell from "@/app/AppShell";

import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
// import "./globals.css";
import '@/styles/commons.css';
import "@/styles/home.css";
import "@/styles/purchaseheader.css";
import "@/styles/support.css";
import "@/styles/board/board.css"
import "@/styles/board/board_list.css"
import "@/styles/board/board_detail.css"
import "@/styles/board/board_write.css"
import '@/styles/travel.css';
import '@/styles/rental.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import "@/styles/travel.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
    title: "Bicycle App",
    description: "Next.js Migration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*{children}*/}
        <AppShell>{children}</AppShell>

        <Script
            src="//dapi.kakao.com/v2/maps/sdk.js?appkey=13052c0aa951d8be4109ba36bf555930&autoload=false"
            strategy="beforeInteractive" // 페이지 렌더 전에 로드
        />
      </body>
    </html>
  );
}
