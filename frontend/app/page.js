"use client";

import CsrfTokenInitializer from "@/components/Auth/CsrfTokenInitializer";
import Image from "next/image";
import Link from "next/link";
import '@/styles/commons.css';
import '@/styles/travel.css';
import '@/styles/rental.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
    const [scrollY, setScrollY] = useState(0);

    /** 스크롤 값 감지 → Hero opacity */
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const opacity = Math.max(1 - scrollY / 800, 0);

    return (
        <div className="home">
            {/* Hero */}
            <section className="hero-section" style={{ opacity }}>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop
                    className="hero-swiper"
                >
                    {["hero1.jpg", "hero2.jpg", "hero3.jpg", "hero4.jpg", "hero5.jpg"].map(
                        (img, idx) => (
                            <SwiperSlide key={idx}>
                                <img
                                    src={`/images/home/${img}`}
                                    alt={`Hero ${idx + 1}`}
                                    className="hero-image"
                                />
                            </SwiperSlide>
                        )
                    )}
                </Swiper>

                <div className="hero-text">
                    <h1>Explore the World on Two Wheels</h1>
                    <p>당신의 라이딩 여정을 지금 시작하세요</p>
                </div>
            </section>

            {/* 자전거 판매 */}
            <section className="section sale">
                <span className="section-subtitle">Products</span>
                <h2>인기 자전거</h2>

                <div className="bike-grid">
                    {[
                        { img: "product1.png", name: "산악", category: "mountain", desc: "험난한 지형도 두렵지 않은 강력한 서스펜션과 견고한 프레임으로 완벽한 산악 주행을 즐겨보세요." },
                        { img: "product2.png", name: "로드", category: "road", desc: "속도와 퍼포먼스를 극대화한 초경량 프레임, 장거리 라이딩에 최적화된 로드 바이크입니다." },
                        { img: "product3.png", name: "라이프스타일", category: "lifestyle", desc: "출퇴근부터 주말 나들이까지, 일상 속 라이딩을 스타일리시하게 완성하는 도심형 자전거입니다." },
                        { img: "product4.png", name: "전기", category: "electric", desc: "페달링의 부담을 줄여주는 강력한 전동 모터 탑재, 어디서나 손쉽게 즐기는 스마트 라이딩 경험." },
                    ].map((bike, idx) => (
                        <div className="bike-card" key={idx}>
                            <img src={`/images/home/${bike.img}`} alt={bike.name} />
                            <h3>{bike.name}</h3>
                            <p>{bike.desc}</p>
                            <Link href={`/products/${bike.category}`} className="btn-outline">
                                구매하기
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* 대여 */}
            <section className="section rental">
                <span className="section-subtitle">Rental</span>
                <h2>자전거 대여 서비스</h2>
                <p>가볍게 떠나고 싶을 때, 가까운 대여소에서 손쉽게 이용하세요.</p>
                <p>자전거 위치를 한눈에 확인하고, 원하는 장소에서 편리하게 대여할 수 있습니다.</p>
                <Link href="/rental" className="btn-primary">
                    대여하러 가기
                </Link>
            </section>

            {/* 여행 */}
            <section className="section travel">
                <span className="section-subtitle">Travel</span>
                <h2>추천 라이딩 코스</h2>

                <div className="travel-cards">
                    {[
                        { img: "travel1.jpg", name: "한강 라이딩 코스", desc: "서울의 중심을 따라 흐르는 한강을 따라 달리며 도시 속 여유를 만끽해보세요." },
                        { img: "travel2.jpg", name: "미시령 코스", desc: "굽이진 산길을 오르내리며 짜릿한 업힐과 아름다운 산맥 경관을 즐길 수 있는 코스입니다." },
                        { img: "travel3.jpg", name: "남이섬 코스", desc: "호수와 숲길을 함께 달리며 낭만적인 풍경 속 라이딩을 경험해보세요." },
                    ].map((course, idx) => (
                        <div className="travel-card" key={idx}>
                            <img src={`/images/home/${course.img}`} alt={course.name} />
                            <h3>{course.name}</h3>
                            <p>{course.desc}</p>
                        </div>
                    ))}
                </div>

                <Link href="/travel" className="btn-outline">
                    더보기
                </Link>
            </section>

            {/* 게시판 */}
            <section className="section board">
                <span className="section-subtitle">Board</span>
                <h2>라이더 커뮤니티</h2>

                <div className="board-container">
                    {[
                        { img: "board1.jpg", title: "뉴스", desc: "브랜드의 최신 소식과 업데이트를 확인하세요.", link: "/board/news" },
                        { img: "board2.jpg", title: "이벤트", desc: "다양한 이벤트에 참여하고 특별한 혜택을 누려보세요.", link: "/board/event" },
                        { img: "board3.jpg", title: "리뷰", desc: "실제 라이더들의 생생한 사용 후기를 만나보세요.", link: "/board/review" },
                    ].map((b, i) => (
                        <div className="board-item" key={i}>
                            <img src={`/images/home/${b.img}`} alt={b.title} />
                            <div className="board-text">
                                <h3>{b.title}</h3>
                                <p>{b.desc}</p>
                                <Link href={b.link} className="btn-outline">
                                    바로가기
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 고객센터 */}
            <section className="section support">
                <span className="section-subtitle">Support</span>
                <h2>도움이 필요하신가요?</h2>
                <p>자주 묻는 질문에서 빠르게 답을 찾고,</p>
                <p>A/S 안내와 자료실로 필요한 정보를 확인하세요.</p>
                <p>궁금한 점은 챗봇이 실시간으로 도와드립니다.</p>
                <Link href="/support" className="btn-outline2">
                    고객센터 바로가기
                </Link>
            </section>
        </div>
    );

  // return (
  //
  //   <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
  //       <CsrfTokenInitializer/>
  //       <Link href="/login">로그인</Link>
  //     <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
  //       <Image
  //         className="dark:invert"
  //         src="/next.svg"
  //         alt="Next.js logo"
  //         width={100}
  //         height={20}
  //         priority
  //       />
  //       <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
  //         <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
  //           To get started, edit the page.jsx file.
  //         </h1>
  //         <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
  //           Looking for a starting point or more instructions? Head over to{" "}
  //           <a
  //             href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //             className="font-medium text-zinc-950 dark:text-zinc-50"
  //           >
  //             Templates
  //           </a>{" "}
  //           or the{" "}
  //           <a
  //             href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //             className="font-medium text-zinc-950 dark:text-zinc-50"
  //           >
  //             Learning
  //           </a>{" "}
  //           center.
  //         </p>
  //       </div>
  //       <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
  //         <a
  //           className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
  //           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           <Image
  //             className="dark:invert"
  //             src="/vercel.svg"
  //             alt="Vercel logomark"
  //             width={16}
  //             height={16}
  //           />
  //           Deploy Now
  //         </a>
  //         <a
  //           className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
  //           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Documentation
  //         </a>
  //       </div>
  //     </main>
  //   </div>
  // );
}
