package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.travel.Map;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class JdbcTemplateMapRepository implements  MapRepository{
    private JdbcTemplate jdbcTemplate;

    public JdbcTemplateMapRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<Map> findAll() {
        // System.out.println("repository ==> ");
        String sql = "select mid, mname, lat, lng, mlink, type from marker";
        //trim()은 공백을 제거해줌 (as로 컬럼명 따로 지정해줘야 사용가능)
        List<Map> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Map.class));

        return list;
    }
}
