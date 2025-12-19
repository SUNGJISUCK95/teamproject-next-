"use client";

/**
 * Resources 페이지 (Next.js)
 *
 * - /support/resources
 * - public/data/resources.json 로드
 * - 카테고리 필터 + 페이지네이션
 */

import { useState, useEffect } from "react";
import { FaFolder, FaDownload } from "react-icons/fa";
import Pagination from "../../../components/support/Pagination.jsx";

export default function ResourcesPage() {
    const [resources, setResources] = useState([]); // 전체 자료 리스트
    const [filter, setFilter] = useState("전체"); // 선택된 필터 카테고리
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 번호
    const itemsPerPage = 10;    // 한 페이지에 보여줄 자료 수

    /** 자료실 데이터 로드
     *  public/data/resources.json 에 존재해야 함
     */
    useEffect(() => {
        fetch("/data/support/resources.json")
            .then((res) => res.json())
            .then((data) => {
                const sorted = [...data].sort((a, b) => a.id - b.id);
                setResources(sorted);
            })
            .catch((err) =>
                console.error("❌ 자료실 데이터를 불러오지 못했습니다:", err)
            );
    }, []);

    /** 필터링 */
    const filtered =
        filter === "전체"
            ? resources
            : resources.filter((item) => item.category === filter);

    /** 페이지네이션 */
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="resources-section">
            {/* 필터 드롭다운 */}
            <div className="resources-header">
                <select
                    className="resources-filter"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);  // 새 필터 적용
                        setCurrentPage(1);  // 필터 변경 시 1페이지로 이동
                    }}
                >
                    <option value="전체">전체</option>
                    <option value="카탈로그">카탈로그</option>
                    <option value="사용설명서">사용설명서</option>
                    <option value="기타">기타</option>
                </select>
            </div>

            {/* 자료 리스트 */}
            <ul className="resources-list">
                {currentItems.map((item) => (
                    <li
                        key={item.id}
                        className="resources-item"
                        onClick={() => window.open(item.url, "_blank")} // 새 창에서 파일 열기
                    >
                        <span className="file-icon">
                          <FaFolder />
                        </span>

                        <span className="file-title">{item.title}</span>

                        <span className="file-type">
                          <FaDownload /> PDF
                        </span>
                    </li>
                ))}

                {/* 항목 없음 */}
                {currentItems.length === 0 && (
                    <li className="no-data">자료가 없습니다.</li>
                )}
            </ul>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    );
}
