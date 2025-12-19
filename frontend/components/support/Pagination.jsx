"use client";

/**
 * Pagination 컴포넌트 (Support 전용)
 *
 * - FAQ / Resources 공용
 * - 페이지 변경 시 상단 스크롤
 */

export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
    /**
     *  스크롤을 최상단으로 부드럽게 이동
     */
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /**
     *  페이지 번호 클릭 시 동작
     *  - 페이지 업데이트
     *  - 화면을 위로 올려 리스트의 시작 지점으로 이동
     */
    const handlePageChange = (page) => {
        setCurrentPage(page);
        scrollToTop();
    };

    return (
        <div className="pagination">
            {/* 이전 버튼 */}
            <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
            >
                이전
            </button>

            {/* 페이지 번호 */}
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    className={currentPage === i + 1 ? "active" : ""}
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </button>
            ))}

            {/* 다음 버튼 */}
            <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
            >
                다음
            </button>
        </div>
    );
}
