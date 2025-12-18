package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.entity.board.BoardPost;
import com.springboot.bicycle_app.entity.board.BoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * BoardPost 엔티티 전용 Repository
 *
 * 게시글 CRUD, 정렬, 검색 등의 기능을 처리한다.
 * Spring Data JPA의 메서드 이름 규칙을 이용하여
 * 별도의 JPQL 없이도 원하는 조회 기능을 구현할 수 있다.
 */
public interface BoardPostRepository extends JpaRepository<BoardPost, Integer> {

    /**
     * 특정 카테고리에 속하며, 지정된 상태(Status)의 게시글 목록을
     * pid 기준 내림차순(최신순)으로 조회한다.
     *
     * 사용 예:
     *   category = "news"
     *   status = PUBLIC
     *
     * 검색 조건:
     *  WHERE boardCategory = :category AND status = :status
     * 정렬 조건:
     *  ORDER BY pid DESC
     *
     * -> 최신 글이 위에 나타나는 게시판 목록에 적합하다.
     */
    List<BoardPost> findByBoardCategoryAndStatusOrderByPidDesc(
            BoardCategory category,
            BoardPost.Status status
    );

    /**
     * 게시글 제목의 중복 여부 확인
     *
     * 사용 예:
     *   existsByTitle("첼로 신제품 출시")
     *
     * 반환:
     *   true  = 동일 제목의 게시글 존재
     *   false = 중복 없음
     *
     * 게시글 등록 시 제목 중복 방지 또는 초기 JSON 데이터 로딩 시 활용 가능
     */
    boolean existsByTitle(String title);
}
