package com.springboot.bicycle_app.repository.kakaopayrepository;

import com.springboot.bicycle_app.dto.RentalPaymentRequest;
import com.springboot.bicycle_app.dto.kakaopaydto.RentalHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDateTime;

@Repository
public class JdbcTemplateRentalRepository implements RentalRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcTemplateRentalRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public String saveRental(RentalPaymentRequest request) {

        final String sql = "insert into rental_history (user_id, station_name, station_id, amount, method, start_time) VALUES (?, ?, ?, ?, ?, NOW())";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        try {
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

                // 1. user_id (VARCHAR - 공식적인 FK)
                ps.setString(1, request.getUserId());

                // 2. station_name (VARCAR)
                ps.setString(2, request.getStationName());

                // 3. station_id (VARCHAR)
                ps.setString(3, request.getStationId());

                // 4. amount (BIGINT)
                ps.setLong(4, request.getPaymentAmount());

                // 5. method (VARCHAR)
                ps.setString(5, request.getPaymentMethod());

                return ps;
            }, keyHolder);

        } catch (DataAccessException e) {
            System.err.println("🚨 CRITICAL DB INSERTION ERROR 🚨");
            System.err.println("Exception: " + e.getMessage());
            if(e.getRootCause() != null) {
                System.err.println("Root Cause: " + e.getRootCause().getMessage());
            }
            return null;
        }

        return keyHolder.getKey() != null ? keyHolder.getKey().toString() : null;
    }

    @Override
    public void updateRentalStatus(String rentalId, String status) {
        final String sql = "update rental_history set status = ? where bid = ?";

        try {
            int updatedRows = jdbcTemplate.update(sql, status, rentalId);

            if (updatedRows == 0) {
                throw new RuntimeException("Rental Id " + rentalId +  "업데이트 실패: 기록을 찾을 수 없음");
            }
        } catch (DataAccessException e) {
            System.err.println("CRITICAL DB UPDATE ERROR");
            throw new RuntimeException("대여 기록 상태 업데이트 중 DB 오류 발생: " + e.getMessage(), e);
        }
    }

    @Override
    public RentalHistory findByOrderId(String orderId) {
        final String sql = "select * from rental_history where bid = ?";

        try{
            return jdbcTemplate.queryForObject(sql, new RentalHistoryRowMapper(), orderId);
        } catch (EmptyResultDataAccessException e){
            return null;
        } catch (DataAccessException e) {
            System.err.println("DB 조회 중 오류 발생 (findByOrderId): " + e.getMessage());
            return null;
        }
    }

    private static class RentalHistoryRowMapper implements RowMapper<RentalHistory> {
        @Override
        public RentalHistory mapRow(ResultSet rs, int rowNum) throws SQLException {
            RentalHistory history = new RentalHistory();

            history.setBid(rs.getLong("bid"));
            history.setUserId(rs.getString("user_id"));
            history.setStationName(rs.getString("station_name"));
            history.setBikeId(rs.getString("station_id"));
            history.setAmount(rs.getLong("amount"));
            history.setMethod(rs.getString("method"));
            history.setStartTime(rs.getObject("start_time", LocalDateTime.class));
            history.setStatus(rs.getString("status"));

            return history;
        }
    }
}