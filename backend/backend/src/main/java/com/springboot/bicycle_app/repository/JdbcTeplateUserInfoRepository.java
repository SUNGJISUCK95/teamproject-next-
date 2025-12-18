package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.UserInfoDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class JdbcTeplateUserInfoRepository implements UserInfoRepository{
    private JdbcTemplate jdbcTemplate;

    public JdbcTeplateUserInfoRepository(DataSource dataSource){
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public boolean idDuplChecker(String incomeId){
        String sql = "SELECT COUNT(uid) FROM userInfo WHERE uid = ?";
        Long count = jdbcTemplate.queryForObject(sql,Long.class, incomeId);
        boolean result=false;
        if(count>0){
            result = true;
        }
        System.out.println("jdbc iddupl");
        return result;
    }

    @Override
    public int signup(UserInfoDto userInfo){
        String sql = """
                insert into 
                userInfo
                    (uid,upass,uname,uage,ugender,uaddress,uemail,uphone)
                values
                    (?,?,?,?,?,?,?,?)
                """;
        Object[] param = {userInfo.getUid(), userInfo.getUpass(),
                        userInfo.getUname(), userInfo.getUage(),
                        userInfo.getUgender(), userInfo.getUaddress(),
                        userInfo.getUemail(), userInfo.getUphone()
        };
        int rows = jdbcTemplate.update(sql,param);
        return rows;
    }
}
