package com.springboot.bicycle_app.entity.board;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * 게시판 카테고리 엔티티
 *
 * board_category 테이블과 매핑되며,
 * 게시판의 종류(news, event, review)를 관리한다.
 *
 * 주요 필드:
 * - bid    : 카테고리 ID (PK)
 * - bname  : 카테고리 영문명 (news, event, review 등)
 * - btitle : 화면에 표시될 한글명 (뉴스, 이벤트, 리뷰)
 *
 * 게시글(BoardPost)에서는 categoryTag 또는 category 관계를 통해
 * 이 엔티티를 참조하여 카테고리 정보를 관리할 수 있다.
 */
@Entity
@Table(name = "board_category")
@Getter @Setter
public class BoardCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bid;

    @Column(nullable = false, length = 50)
    private String bname;

    @Column(nullable = false, length = 100)
    private String btitle;
}
