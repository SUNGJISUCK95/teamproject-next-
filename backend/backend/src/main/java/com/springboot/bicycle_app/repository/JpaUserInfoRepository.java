package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.UserInfoDto;
import com.springboot.bicycle_app.entity.userinfo.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface JpaUserInfoRepository extends JpaRepository<UserInfo, String> {
    //    Member save(Member member);
    //중요 : 생략 가능한 경우 = 상속받은 부모 인터페이스에 save 메소드가 존재하는 경우!
    //이거 생략해도 JpaRepository와 그 부모들에 정의된 save를 가져와서 에러는 없다.
    //그 전에 내용 정의도 안했는데 쓸 수 있는게 위의 이유때문이긴 하다

//    Optional<Member> findById(String Id);

    //새로운 메소드 정의 - 1. 네이밍 규칙 적용.
//    Long countById(String id);

    // 2. @Query 적용 : SQL 직접 생성 후 적용
//    @Query("select count(m) from Member m where id= :id")
//    Long count2ById(@Param("id") String id);

    //로그인 관련 - 엔티티가 아닌 다른 객체로 결과를 출력하는 경우 `new 패키지 전체주소 출력객체명`
    //              형식으로 컬럼리스트를 작성!!
    // @Query("select new com.springboot.bicycle_app.dto.UserInfoDto(U.uid, U.upass) " +
    //         " from UserInfo U where uid = :uid")//엔티티가 아닌 객체로 반환할때는 sql문 안에 new가 들어감+해당 클래스 위치 추가
    // //+필요한 데이터는 괄호 안에 담기
    // Optional<UserInfoDto> findByUserInfo(@Param("uid") String uid);
    @Query("""
        select new com.springboot.bicycle_app.dto.UserInfoDto(U)
        from UserInfo U
        where U.uid = :uid
    """)
    Optional<UserInfoDto> findByUserInfo(@Param("uid") String uid);
    //

    Optional<UserInfo> findByUid(@Param("uid") String uid);

    Optional<UserInfo> findByUemailAndUname(@Param("uemail") String uemail,
                                            @Param("uname") String uname);

    Optional<UserInfo> findByUemailAndUnameAndUid(@Param("uemail") String uemail,
                                                  @Param("uname") String uname,
                                                  @Param("uid") String uid);



    @Modifying(clearAutomatically = true)//쿼리 실행 후 영속성 컨텍스트를 초기화.
    @Query("""
            update
                UserInfo u
            set
                u.uid = :uid
            Where
                u.uid = :includeId
            """)
    int updateByUid(@Param("uid") String uid,
            @Param("includeId") String includeId);
            
    void deleteByUid(@Param("uid") String uid);
}
