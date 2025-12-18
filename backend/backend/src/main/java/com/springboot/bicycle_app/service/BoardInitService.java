package com.springboot.bicycle_app.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.bicycle_app.dto.BoardJsonDto;
import com.springboot.bicycle_app.entity.board.BoardCategory;
import com.springboot.bicycle_app.entity.board.BoardPost;
import com.springboot.bicycle_app.repository.BoardCategoryRepository;
import com.springboot.bicycle_app.repository.BoardPostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 초기 게시판 데이터를 JSON 파일에서 읽어와 DB에 저장하는 서비스.
 *
 * 역할:
 * - classpath:data/board/*.json 파일 읽기
 * - JSON 데이터를 BoardJsonDto로 매핑
 * - 이미 저장된 글은 중복 방지 처리
 * - BoardCategory와 매핑하여 BoardPost 엔티티 생성
 * - DB에 초기 데이터 저장(서버 시작 시 1회 실행 권장)
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class BoardInitService {

    private final BoardPostRepository boardPostRepository;
    private final BoardCategoryRepository boardCategoryRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * JSON 파일을 읽어서 초기 게시글 데이터를 DB에 저장하는 메서드.
     *
     * 처리 순서:
     * 1. classpath:data/board/*.json 파일 스캔
     * 2. JSON을 List<BoardJsonDto>로 변환
     * 3. 제목 중복 검사 후 중복일 경우 SKIP
     * 4. 카테고리(BoardCategory) 조회 및 매핑
     * 5. BoardPost 엔티티 생성 후 DB 저장
     */
    public void loadInitialBoardData() {
        try {
            PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();

            // data/board/ 폴더의 모든 JSON 파일 로드
            Resource[] resources = resolver.getResources("classpath:data/board/*.json");

            for (Resource resource : resources) {
                log.info("JSON 파일 로딩 시작: {}", resource.getFilename());

                // JSON → DTO 리스트 변환
                List<BoardJsonDto> list = objectMapper.readValue(
                        resource.getInputStream(),
                        new TypeReference<List<BoardJsonDto>>() {}
                );

                for (BoardJsonDto dto : list) {

                    // 제목 중복 체크(기존 DB 데이터 보호)
                    if (boardPostRepository.existsByTitle(dto.getTitle())) {
                        log.info("중복 제목 발견. 생략됨: {}", dto.getTitle());
                        continue;
                    }

                    // JSON categoryTag가 실제 카테고리 테이블에 존재하는지 확인
                    BoardCategory category = boardCategoryRepository.findByBname(dto.getCategoryTag());
                    if (category == null) {
                        log.warn("카테고리 '{}' 없음. JSON 데이터 생략됨.", dto.getCategoryTag());
                        continue;
                    }

                    // BoardPost 엔티티 생성 및 값 설정
                    BoardPost post = new BoardPost();
                    post.setBoardCategory(category);
                    post.setUid(dto.getUid());
                    post.setWriter(dto.getWriter());
                    post.setTitle(dto.getTitle());
                    post.setContent(dto.getContent());
                    post.setImageUrl(dto.getImageUrl());
                    post.setThumbnailUrl(dto.getThumbnailUrl());
                    post.setCategoryTag(dto.getCategoryTag());
                    post.setStatus(BoardPost.Status.valueOf(dto.getStatus()));
                    post.setViewCount(0);
                    post.setCreatedAt(LocalDateTime.now());
                    post.setUpdatedAt(LocalDateTime.now());

                    // DB 저장
                    boardPostRepository.save(post);
                    log.info("게시글 저장 완료: {}", dto.getTitle());
                }
            }

            log.info("게시판 초기 데이터 로딩 완료");

        } catch (Exception e) {
            log.error("초기 게시글 데이터 로딩 실패", e);
        }
    }
}
