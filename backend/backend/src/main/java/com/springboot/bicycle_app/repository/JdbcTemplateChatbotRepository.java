package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.ChatbotFaq;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * ChatbotRepository의 JDBC Template 기반 구현체.
 *
 * 특징:
 * - Spring JDBC Template을 사용하여 SQL을 직접 실행한다.
 * - Chatbot FAQ 데이터를 DB(chatbot_faq 테이블)에 저장/조회한다.
 * - BeanPropertyRowMapper를 통해 ResultSet → ChatbotFaq 자동 변환.
 */
@Repository
@RequiredArgsConstructor
public class JdbcTemplateChatbotRepository implements ChatbotRepository {

    private final JdbcTemplate jdbcTemplate;

    /**
     * 특정 키워드(keyword)로 FAQ를 조회한다.
     *
     * 검색 방식:
     *  - 부분 일치 검색 (LIKE %keyword%)
     *  - 대소문자 무시 (LOWER)
     *  - 가장 먼저 매칭된 1개의 FAQ만 반환 (LIMIT 1)
     *
     * 예:
     *   message = "배송"
     *   검색 결과: keyword = "배송 / 배송조회 / 배송기간"
     *
     * 반환:
     *   매칭된 FAQ 1개 또는 null
     */
    @Override
    public ChatbotFaq findByKeyword(String message) {
        String sql = """
            SELECT * FROM chatbot_faq
            WHERE LOWER(keyword) LIKE CONCAT('%', LOWER(?), '%')
            LIMIT 1
        """;

        List<ChatbotFaq> list = jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(ChatbotFaq.class),
                message.trim()  // 공백 제거
        );

        return list.isEmpty() ? null : list.get(0);
    }

    /**
     * FAQ 데이터를 DB에 저장한다.
     *
     * INSERT INTO chatbot_faq (keyword, question, answer, link_text, link_url)
     *
     * 반환:
     *   정상 저장 → 1
     *   실패 → 0 또는 예외 발생
     */
    @Override
    public int save(ChatbotFaq faq) {
        String sql = """
            INSERT INTO chatbot_faq (keyword, question, answer, link_text, link_url)
            VALUES (?, ?, ?, ?, ?)
        """;
        return jdbcTemplate.update(sql,
                faq.getKeyword(), faq.getQuestion(), faq.getAnswer(),
                faq.getLinkText(), faq.getLinkUrl());
    }

    /**
     * DB에 저장된 FAQ의 총 개수를 조회한다.
     *
     * 사용 예:
     * - 초기 FAQ 로드 확인
     * - 관리자 페이지에서 항목 개수 표시
     */
    @Override
    public int count() {
        return jdbcTemplate.queryForObject("SELECT COUNT(*) FROM chatbot_faq", Integer.class);
    }

    /**
     * 모든 FAQ 데이터를 조회하여 리스트로 반환한다.
     *
     * ORDER BY id ASC:
     * - FAQ를 등록 순서대로 정렬하여 안정적인 리스트 출력
     *
     * 반환:
     *   List<ChatbotFaq>
     */
    @Override
    public List<ChatbotFaq> findAll() {
        String sql = "SELECT * FROM chatbot_faq ORDER BY id ASC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ChatbotFaq.class));
    }
}
