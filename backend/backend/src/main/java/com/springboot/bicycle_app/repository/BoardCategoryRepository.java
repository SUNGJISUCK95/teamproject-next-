package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.entity.board.BoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * BoardCategory 엔티티 전용 Repository 인터페이스
 *
 * JpaRepository를 상속하여 CRUD 및 페이징 기능 제공.
 * 기본적으로 save, findById, delete 등 다양한 메서드를 사용 가능하며,
 * 필요한 경우 메서드 이름 기반 쿼리 생성 기능을 이용해 커스텀 조회를 구현할 수 있다.
 */
public interface BoardCategoryRepository extends JpaRepository<BoardCategory, Integer> {

    /**
     * 카테고리 영문명(bname)으로 카테고리를 조회하는 메서드
     *
     * 예:
     *  - "news"  → 뉴스 카테고리
     *  - "event" → 이벤트 카테고리
     *  - "review" → 리뷰 카테고리
     *
     * Spring Data JPA의 메서드 이름 규칙에 따라 자동으로 쿼리가 생성된다.
     */
    BoardCategory findByBname(String bname);
}
