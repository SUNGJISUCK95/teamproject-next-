package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.travel.TravelFoodDto;
import com.springboot.bicycle_app.dto.travel.TravelHotelDto;
import com.springboot.bicycle_app.dto.travel.TravelRepairDto;
import com.springboot.bicycle_app.dto.travel.TravelFoodDetailDto;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class JdbcTemplateTravelRepository implements TravelRepository{
    private JdbcTemplate jdbcTemplate;

    public JdbcTemplateTravelRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<TravelFoodDto> findFood() {
        // System.out.println("repository ==> ");
    
        String sql = """
                        select 
                            fid,
                            fname, 
                            flike, 
                            score, 
                            evaluation, 
                            tag, 
                            image1, 
                            image2,
                            image3,
                            fullImage1,
                            fullImage2,
                            fullImage3,
                            description
                        from travel_food
                    """;
        //trim()은 공백을 제거해줌 (as로 컬럼명 따로 지정해줘야 사용가능)
        List<TravelFoodDto> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TravelFoodDto.class));

        return list;
    }

    @Override
    public List<TravelHotelDto> findHotel() {
//         System.out.println("repository findHotel ==> ");

        String sql = """
                        select 
                            hid,
                            hname, 
                            hlike, 
                            score, 
                            evaluation, 
                            tag, 
                            image1, 
                            image2,
                            image3,
                            fullImage1,
                            fullImage2,
                            fullImage3,
                            description
                        from travel_hotel
                    """;
        //trim()은 공백을 제거해줌 (as로 컬럼명 따로 지정해줘야 사용가능)
        List<TravelHotelDto> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TravelHotelDto.class));

        return list;
    }

    @Override
    public List<TravelRepairDto> findRepair() {
        System.out.println("repository findRepair ==> ");

        String sql = """
                        select 
                            rid,
                            rname, 
                            `rlike`, 
                            score, 
                            evaluation, 
                            tag, 
                            image1, 
                            image2,
                            image3,
                            fullImage1,
                            fullImage2,
                            fullImage3,
                            description
                        from travel_repair
                    """;
        //trim()은 공백을 제거해줌 (as로 컬럼명 따로 지정해줘야 사용가능)
        List<TravelRepairDto> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TravelRepairDto.class));

        return list;
    }

//     @Override
//     public List<TravelFoodDetailDto> findFoodDetail() {
// //        System.out.println("repository ==> ");
    
//         String sql = """
//                         SELECT 
//                             did,
//                             fname,
//                             flike,
//                             tag,
//                             location,
//                             food,
//                             address,
//                             localAddress,
//                             businessHouers,
//                             lastOrder,
//                             phone,
//                             other,
//                             menu,
//                             image1,
//                             image2,
//                             image3,
//                             review
//                         FROM travel_food_detail
//                     """;
//         //trim()은 공백을 제거해줌 (as로 컬럼명 따로 지정해줘야 사용가능)
//         List<TravelDetail> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TravelDetail.class));

//         return list;
//     }
    
    // @Override
    // public List<TravelDetail> findFoodDetail() {
    //     System.out.println("repository ==> ");

    //     String sql = """
    //         SELECT 
    //             f.did,
    //             f.fname,
    //             f.flike,
    //             f.tag,
    //             f.location,
    //             f.food,
    //             f.address,
    //             f.localAddress,
    //             f.businessHouers,
    //             f.lastOrder,
    //             f.phone,
    //             f.other,
    //             f.image1,
    //             f.image2,
    //             f.image3,
    //             (
    //                 SELECT JSON_ARRAYAGG(
    //                     JSON_OBJECT(
    //                         'mname', m.mname,
    //                         'price', m.price
    //                     )
    //                 )
    //                 FROM travel_food_detail_menu m
    //                 WHERE m.did = f.did
    //             ) AS menuJson,
    //             (
    //                 SELECT JSON_ARRAYAGG(
    //                     JSON_OBJECT(
    //                         'userProfile', r.userProfile,
    //                         'userId', r.userId,
    //                         'userLike', r.userLike,
    //                         'userTotalReview', r.userTotalReview,
    //                         'userFllowers', r.userFllowers,
    //                         'reviewImage', r.reviewImage,
    //                         'reviewDate', r.reviewDate,
    //                         'reviewDescription', r.reviewDescription
    //                     )
    //                 )
    //                 FROM travel_food_detail_review r
    //                 WHERE r.did = f.did
    //             ) AS reviewJson
    //         FROM travel_food_detail f
    //     """;

    //     // DB에서 JSON 문자열 포함된 결과 조회
    //     List<TravelDetail> list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(TravelDetail.class));

    //     // ✅ menuJson / reviewJson → List<> 로 변환
    //     ObjectMapper mapper = new ObjectMapper();
    //     for (TravelDetail d : list) {
    //         try {
    //             if (d.getMenuJson() != null) {
    //                 d.setMenu(mapper.readValue(d.getMenuJson(), new TypeReference<List<TravelDetailMenu>>(){}));
    //             }
    //             if (d.getReviewJson() != null) {
    //                 d.setReview(mapper.readValue(d.getReviewJson(), new TypeReference<List<TravelDetailReview>>(){}));
    //             }
    //         } catch (Exception e) {
    //             e.printStackTrace();
    //         }
    //     }

    //     return list;
    // }
}
