package com.springboot.bicycle_app.dto;

import com.springboot.bicycle_app.entity.board.BoardPost;
import com.springboot.bicycle_app.entity.board.BoardPost.Status;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 게시글 데이터를 클라이언트로 전달하거나
 * 클라이언트에서 받은 데이터를 엔티티로 변환할 때 사용하는 DTO 클래스.
 *
 * BoardPost 엔티티는 JPA 연관관계와 불필요한 내부 구조를 포함할 수 있기 때문에
 * API 응답 또는 요청에 사용할 때는 DTO로 변환하여 안정성과 일관성을 유지한다.
 */
@Getter
@Setter
public class BoardPostDto {
    private int pid;              // 게시글 ID
    private String uid;           // 작성자 ID
    private String title;         // 제목
    private String content;       // 본문 내용
    private String writer;        // 작성자 이름 (엔티티에도 동일 필드 존재)
    private String categoryTag;   // 카테고리(news/event/review)
    private String imageUrl;      // 본문 이미지 URL
    private String thumbnailUrl;  // 썸네일 이미지 URL
    private Status status;        // 게시글 공개 상태 (enum)
    private int viewCount;        // 조회수
    private LocalDateTime createdAt; // 작성일시

    /**
     * 엔티티(BoardPost) → DTO 변환
     * 클라이언트에 데이터를 반환할 때 사용.
     */
    public static BoardPostDto fromEntity(BoardPost post) {
        BoardPostDto dto = new BoardPostDto();
        dto.setPid(post.getPid());
        dto.setUid(post.getUid());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setWriter(post.getWriter());
        dto.setCategoryTag(post.getCategoryTag());
        dto.setImageUrl(post.getImageUrl());
        dto.setThumbnailUrl(post.getThumbnailUrl());
        dto.setStatus(post.getStatus());
        dto.setViewCount(post.getViewCount());
        dto.setCreatedAt(post.getCreatedAt());
        return dto;
    }

    /**
     * DTO → 엔티티(BoardPost) 변환
     * 클라이언트로부터 받은 데이터를 DB에 저장해야 할 때 사용.
     * 주의: 이 메서드는 새로운 엔티티 인스턴스를 생성한다.
     * 기존 엔티티 수정 시에는 별도로 엔티티 값을 직접 수정해야 한다.
     */
    public static BoardPost toEntity(BoardPostDto dto) {
        BoardPost post = new BoardPost();
        post.setPid(dto.getPid());
        post.setUid(dto.getUid());
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setWriter(dto.getWriter());
        post.setCategoryTag(dto.getCategoryTag());
        post.setImageUrl(dto.getImageUrl());
        post.setThumbnailUrl(dto.getThumbnailUrl());
        post.setStatus(dto.getStatus());
        post.setViewCount(dto.getViewCount());
        post.setCreatedAt(dto.getCreatedAt());
        return post;
    }
}
