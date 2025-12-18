package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.entity.board.BoardPost;
import java.util.List;
import java.util.Optional;

/**
 * 게시판 비즈니스 로직을 위한 Service 인터페이스.
 *
 * 역할:
 * - 게시판 조회, 상세보기, 글 작성/수정/삭제, 조회수 증가 등의
 *   핵심 로직을 정의하며, 구현체(BoardServiceImpl)에서 실제 처리 수행.
 *
 * 컨트롤러(BoardController)에서 이 인터페이스를 의존하고
 * 실제 구현체는 @Service로 DI 되어 사용된다.
 */
public interface BoardService {

    /**
     * 특정 카테고리의 게시글 목록을 반환한다.
     *
     * categoryName : "news", "event", "review"
     *
     * 반환:
     *   BoardPost 리스트 (최신순 정렬은 구현체에서 수행)
     */
    List<BoardPost> getPostList(String categoryName);

    /**
     * 게시글 상세 정보를 pid 기준으로 조회한다.
     *
     * 반환:
     *   Optional<BoardPost>  
     *   존재하지 않을 수도 있으므로 Optional로 감싼다.
     */
    Optional<BoardPost> getPostDetail(int pid);

    /**
     * 게시글 저장 또는 수정 처리.
     * 새 글은 INSERT, 기존 글은 UPDATE 동작을 수행한다.
     *
     * 사용 예:
     * - 글 작성 (pid = 0)
     * - 글 수정 (pid 존재)
     */
    BoardPost savePost(BoardPost post);

    /**
     * 게시글 삭제 처리.
     *
     * 실제 DELETE 또는 상태변경(Soft Delete)은
     * 구현체에서 정책에 따라 결정한다.
     */
    void deletePost(int pid);

    /**
     * 게시글 조회수 증가 처리.
     *
     * 구현체에서:
     * - findById(pid) 후 viewCount +1
     * - DB 저장(update)
     */
    void increaseViewCount(int pid);
}
