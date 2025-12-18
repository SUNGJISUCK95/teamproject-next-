package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.entity.board.BoardCategory;
import com.springboot.bicycle_app.entity.board.BoardPost;
import com.springboot.bicycle_app.repository.BoardCategoryRepository;
import com.springboot.bicycle_app.repository.BoardPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * BoardService 인터페이스의 실제 구현체.
 *
 * 주요 기능:
 * - 게시글 목록 조회
 * - 게시글 상세 조회
 * - 게시글 작성/수정 저장
 * - 게시글 삭제
 * - 조회수 증가
 *
 * Repository와 상호작용하여 비즈니스 로직을 수행한다.
 */
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardPostRepository boardPostRepository;
    private final BoardCategoryRepository boardCategoryRepository;

    /**
     * 특정 카테고리의 게시글 목록을 반환한다.
     *
     * 처리 과정:
     * 1. categoryName으로 카테고리 조회
     * 2. 카테고리가 존재하지 않으면 예외 발생
     * 3. PUBLIC 상태의 게시글만 최신 pid 순으로 조회
     */
    @Override
    public List<BoardPost> getPostList(String categoryName) {

        BoardCategory category = boardCategoryRepository.findByBname(categoryName);
        if (category == null) {
            throw new IllegalArgumentException("존재하지 않는 게시판입니다: " + categoryName);
        }

        return boardPostRepository
                .findByBoardCategoryAndStatusOrderByPidDesc(
                        category,
                        BoardPost.Status.PUBLIC
                );
    }

    /**
     * 게시글 상세 조회.
     * pid로 게시글을 조회하여 Optional로 반환한다.
     *
     * 조회수 증가는 컨트롤러에서 별도 호출함.
     */
    @Override
    public Optional<BoardPost> getPostDetail(int pid) {
        return boardPostRepository.findById(pid);
    }

    /**
     * 게시글 저장 또는 수정 처리.
     *
     * 처리 과정:
     * 1. 전달된 BoardPost 인스턴스에 카테고리 정보가 포함되어 있으면
     *    해당 카테고리(bname)로 실제 DB 카테고리를 조회해서 연결
     * 2. updatedAt 갱신
     * 3. JPA save() 호출 (신규면 INSERT, 기존이면 UPDATE)
     */
    @Override
    public BoardPost savePost(BoardPost post) {

        // BoardPost 내부에 카테고리 이름이 있을 경우: 실제 카테고리 엔티티로 연결
        if (post.getBoardCategory() != null && post.getBoardCategory().getBname() != null) {

            String categoryName = post.getBoardCategory().getBname();
            BoardCategory category = boardCategoryRepository.findByBname(categoryName);

            if (category == null) {
                throw new IllegalArgumentException("존재하지 않는 카테고리입니다: " + categoryName);
            }

            post.setBoardCategory(category);
        }

        // 수정 시간 갱신
        post.setUpdatedAt(java.time.LocalDateTime.now());

        // 저장(INSERT or UPDATE)
        return boardPostRepository.save(post);
    }

    /**
     * 게시글 삭제 처리.
     *
     * 현재는 실제 DB 데이터 삭제(deleteById)를 수행한다.
     *
     * 필요 시 "소프트 삭제"(status = DELETED만 설정) 방식으로 확장 가능.
     */
    @Override
    public void deletePost(int pid) {
        boardPostRepository.deleteById(pid);
    }

    /**
     * 게시글의 조회수를 1 증가시키고 저장한다.
     *
     * 처리 과정:
     * 1. pid로 게시글 조회
     * 2. 존재할 경우 viewCount +1
     * 3. 저장(update)
     */
    @Override
    public void increaseViewCount(int pid) {
        Optional<BoardPost> postOpt = boardPostRepository.findById(pid);

        if (postOpt.isPresent()) {
            BoardPost post = postOpt.get();
            post.setViewCount(post.getViewCount() + 1);
            boardPostRepository.save(post);
        }
    }
}
