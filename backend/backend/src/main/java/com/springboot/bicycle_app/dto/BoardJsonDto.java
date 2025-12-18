package com.springboot.bicycle_app.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * 초기 게시판 데이터를 JSON 파일에서 읽어올 때 사용하는 DTO 클래스
 * 
 * BoardPost 엔티티로 변환하기 전에
 * JSON 구조를 그대로 매핑하여 임시 저장하는 용도.
 * 
 * 필드 설명:
 * - bid          : 게시글 고유 번호 (JSON에서 제공되는 임시 ID)
 * - uid          : 작성자 ID
 * - writer       : 작성자 이름
 * - title        : 게시글 제목
 * - content      : 게시글 본문
 * - imageUrl     : 본문 이미지 URL
 * - thumbnailUrl : 목록에서 사용하는 썸네일 이미지 URL
 * - categoryTag  : 게시판 종류 (news, event, review)
 * - status       : 게시글 공개 여부 (PUBLIC / SECRET 등)
 */
@Getter @Setter
public class BoardJsonDto {
    private int bid;
    private String uid;
    private String writer;
    private String title;
    private String content;
    private String imageUrl;
    private String thumbnailUrl;
    private String categoryTag;
    private String status;
}
