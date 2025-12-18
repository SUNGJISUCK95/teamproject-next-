package com.springboot.bicycle_app.repository.kakaopayrepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class JdbcTemplateKakaoPayRepository implements KakaoPayRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcTemplateKakaoPayRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void saveReadyPayment(String tid, String partnerOrderId, String partnerUserId, int amount) {
        // 🚨 수정 완료: order_id -> partner_order_id, user_id -> partner_user_id 로 변경
        String sql = "INSERT INTO kakaopay_history (tid, partner_order_id, partner_user_id, amount, status, created_at) VALUES (?, ?, ?, ?, 'READY', NOW())";
        jdbcTemplate.update(sql, tid, partnerOrderId, partnerUserId, amount);
    }

    @Override
    public String findTidByOrderId(String partnerOrderId) {
        // 🚨 수정 완료: order_id -> partner_order_id 로 변경
        String sql = "SELECT tid FROM kakaopay_history WHERE partner_order_id = ?"; // tid만 선택하도록 수정했습니다.

        try {
            return jdbcTemplate.queryForObject(sql, String.class, partnerOrderId);
        } catch (org.springframework.dao.EmptyResultDataAccessException e) {
            return null;
        }
    }

    /**
     * 최종 승인 시 필요한 partner_user_id (사용자 ID) 조회
     */
    @Override
    public String findUserIdByOrderId(String partnerOrderId) {
        // 🚨 수정 완료: order_id -> partner_order_id, user_id -> partner_user_id 로 변경
        String sql = "SELECT partner_user_id FROM kakaopay_history WHERE partner_order_id = ?";

        try {
            return jdbcTemplate.queryForObject(sql, String.class, partnerOrderId);
        } catch (org.springframework.dao.EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public String findOrderIdByUserId(String partnerUserId) {
        // 🚨 수정 완료: order_id -> partner_order_id, user_id -> partner_user_id 로 변경
        String sql = "SELECT partner_order_id FROM kakaopay_history WHERE partner_user_id = ?";

        try {
            return jdbcTemplate.queryForObject(sql, String.class, partnerUserId);
        } catch (org.springframework.dao.EmptyResultDataAccessException e) {
            return null;
        }
    }

    /**
     * 최종 결제 승인(Approve) 또는 취소/실패 시 상태 업데이트
     */
    @Override
    public void updatePaymentStatus(String partnerOrderId, String status) {
        // 🚨 수정 완료: order_id -> partner_order_id 로 변경
        String sql = "UPDATE kakaopay_history SET status = ?, updated_at = NOW() WHERE partner_order_id = ?";
        jdbcTemplate.update(sql, status, partnerOrderId);
    }
}