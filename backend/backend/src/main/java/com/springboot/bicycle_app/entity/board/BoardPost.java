package com.springboot.bicycle_app.entity.board;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

/**
 * 게시글 엔티티
 *
 * board_post 테이블과 매핑되며,
 * 게시판 글의 모든 메타데이터(작성자, 제목, 내용, 이미지, 상태 등)를 관리한다.
 *
 * 주요 특징:
 * - BoardCategory와 다대일(N:1) 관계 (게시판 카테고리 연결)
 * - 이미지/썸네일 URL 저장
 * - 게시글 상태(enum)로 PUBLIC/PRIVATE/DELETED 구분
 * - 조회수, 작성/수정 시간 자동 관리
 */
@Entity
@Table(name = "board_post")
@Getter @Setter
public class BoardPost {

    /** 게시글 고유 ID (PK) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pid;

    /**
     * 게시글이 속한 카테고리
     * BoardCategory와 ManyToOne 관계를 형성한다.
     * 예: news, event, review
     *
     * board_post.bid → board_category.bid 외래키 매핑
     */
    @ManyToOne
    @JoinColumn(name = "bid")
    private BoardCategory boardCategory;

    /**
     * 작성자 식별자 (회원 uid)
     */
    @Column(nullable = false)
    private String uid;

    /** 게시글 제목 */
    @Column(length = 100, nullable = false)
    private String title;

    /** 게시글 본문 내용 */
    @Column(columnDefinition = "TEXT")
    private String content;

    /** 작성자 표시 이름 */
    @Column(length = 50)
    private String writer;

    /**
     * 카테고리 태그 (문자 기반)
     * 예: "news", "event", "review"
     * BoardCategory와 별도로 문자열 검색을 위해 유지
     */
    @Column(length = 50)
    private String categoryTag;

    /** 본문 이미지 경로(URL) */
    @Column
    private String imageUrl;

    /** 게시글 목록에 사용되는 썸네일 이미지 경로(URL) */
    @Column
    private String thumbnailUrl;

    /**
     * 게시글 상태(Enum)
     * PUBLIC  : 전체 공개
     * PRIVATE : 비공개
     * DELETED : 삭제된 글(실제 삭제 대신 상태 변경)
     */
    @Enumerated(EnumType.STRING)
    private Status status = Status.PUBLIC;

    /** 게시글 조회수 */
    @Column
    private int viewCount = 0;

    /** 작성 시간 */
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    /** 수정 시간 */
    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    /** 게시글 상태 값(Enum)*/
    public enum Status {
        PUBLIC, PRIVATE, DELETED
    }
}
