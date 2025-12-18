package com.springboot.bicycle_app.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import com.springboot.bicycle_app.dto.Token;
import com.springboot.bicycle_app.entity.userinfo.UserInfo;
import com.springboot.bicycle_app.dto.UserInfoDto;
import com.springboot.bicycle_app.entity.userinfo.UserInfoAuthSearch;
import com.springboot.bicycle_app.repository.JpaUserInfoAuthSearchRepository;
import com.springboot.bicycle_app.repository.UserInfoRepository;
import com.springboot.bicycle_app.repository.JpaUserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;


import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OauthServiceImpl implements OauthService{
    private final UserInfoRepository userInfoRepository;
    private final JpaUserInfoRepository jpaUserInfoRepository;
    private final PasswordEncoder passwordEncoder;
    private final JpaUserInfoAuthSearchRepository jpaUserInfoAuthSearchRepository;
    @Autowired
    public OauthServiceImpl(UserInfoRepository userInfoRepository,
                            JpaUserInfoRepository jpaUserInfoRepository,
                            PasswordEncoder passwordEncoder,
                            JpaUserInfoAuthSearchRepository jpaUserInfoAuthSearchRepository){
        this.userInfoRepository = userInfoRepository;
        this.jpaUserInfoRepository = jpaUserInfoRepository;
        this.passwordEncoder = passwordEncoder;
        this.jpaUserInfoAuthSearchRepository = jpaUserInfoAuthSearchRepository;
    }

    @Override
    public String getSocialAccessToken (Token token) {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL="";
        if( token.getSocial().equals("kakao")){
            reqURL = "https://kauth.kakao.com/oauth/token";}
        else if(token.getSocial().equals("naver")){
            reqURL = "https://nid.naver.com/oauth2.0/token";}
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            // conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
            // 위 세팅 없어도 작동하지만, 확실하게 하기 위해 적어둠

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");

            if( token.getSocial().equals("kakao")){
                sb.append("&client_id=ef9794cb2ff6a12a26f6432f5ec9a04b"); // TODO REST_API_KEY 입력
                if(token.getHostName().equals("localhost")) {
                    sb.append("&redirect_uri=http://localhost:3000/auth"); // TODO 인가코드 받은 redirect_uri 입력
                }
                else {
                    sb.append("&redirect_uri=http://172.16.250.24:3000/auth");// 로컬망 내 다른 PC 접속을 위해 루트 돌림
                }
            }
            else if(token.getSocial().equals("naver")){
                sb.append("&client_id=qxdiERkzD3t06kqHGYdp");
                sb.append("&client_secret=0jzlDIssrs");
            }
            sb.append("&code=" + token.getAuthCode());

            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }

    //    구글 로그인 정보 출처 :
//    https://velog.io/@39busy/React-Social-Login
    @Override
    public String socialIdCatcher(String authcode,String social){
        String id="";
        //헤더만 있고 바디 요청이나 post 요청이 없어서 GET방식으로 감
        try {
            String UserInfoURL= "";
            if(social.equals("kakao"))
            {
                UserInfoURL ="https://kapi.kakao.com/v2/user/me";
            }
            else if(social.equals("naver"))
            {
                UserInfoURL ="https://openapi.naver.com/v1/nid/me";
            }
            else if(social.equals("google"))
            {
                UserInfoURL = "https://www.googleapis.com/oauth2/v2/userinfo";
            }
            //프로퍼티 키를 이용해보려 하였지만 개인정보 설정(https://developers.kakao.com/console/app/1324377/product/login/scope)을
            //을 켜야하고, 심지어 이메일 주소 등은 허가를 받아야하며, 닉네임은 깨져서 들어오는 관계로 보류
//            String keysToRequest = "[\"kakao_account.email\", \"kakao_account.profile\"]";
//            String encodedKeys = URLEncoder.encode(keysToRequest, "UTF-8");
//            String QP_test = "?property_keys="+encodedKeys;
//            System.out.println(kakaoUserInfoURL+QP_test);
            URL url = new URL(UserInfoURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
            // 위 세팅 없어도 작동하지만, 확실하게 하기 위해 적어둠
            conn.setRequestProperty("Authorization", "Bearer " + authcode);

            //이번엔 헤더에 authcode만 넣고 바디 없이 보내면 된다.
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            System.out.println("element is next");
            System.out.println(element);
            JsonObject jsonObject = element.getAsJsonObject();

            if(social.equals("kakao")){
//                키 존재 여부는 카카오니까 무시
//                3. "id" 키의 값을 JsonPrimitive(원시 값) 형태로 가져옵니다
                JsonPrimitive idPrimitive = jsonObject.getAsJsonPrimitive("id");
                // 4. 값을 원하는 타입(여기서는 String)으로 변환하여 사용합니다.
                id = idPrimitive.getAsString();
            }
            else if(social.equals("naver")){
//                키 존재 여부는 네이버니까 무시
//                네이버의 경우 response안에 id가 담겨있으므로 두번 들어감.
                JsonObject responsePrimitive = jsonObject.getAsJsonObject("response");
                JsonPrimitive idPrimitive = responsePrimitive.getAsJsonPrimitive("id");
                id = idPrimitive.getAsString();
            }
            else if(social.equals("google")) {
                System.out.println("google data");
                System.out.println(jsonObject);
                JsonPrimitive idPrimitive = jsonObject.getAsJsonPrimitive("id");
                // 4. 값을 원하는 타입(여기서는 String)으로 변환하여 사용합니다.
                id = idPrimitive.getAsString();
            }
            // 카카오 {"id":숫자,"connected_at":"2025-10-18T06:12:07Z"}
            // 네이버 {"resultcode":"00","message":"success",
            //          "response":{"id":"긴 문자열 ",
            //                      "nickname":"jhs3427****","email":"jhs34276225@jr.naver.com"}}
            // 구글{  "id": "116502515182203632728",  "email": "jhs34276225@gmail.com",  "verified_email": true,  "name": "占쏙옙占쌔쇽옙",  "given_name": "占쌔쇽옙",  "family_name": "占쏙옙",  "picture": "https://lh3.googleuserconte
            //nt.com/a/ACg8ocK5f6fBETgC3CW2SInPtH3ICh86z3vfwNnW16qWbkNy28gavA=s96-c"}
        } catch (IOException e) {
            e.printStackTrace();
        }
        return id;
    }

    // public String kakaologouttest(){
    //     String clientId = "ef9794cb2ff6a12a26f6432f5ec9a04b";
    //     String redirectUri = "http://localhost:3000";
    //     String id="";
    //     //헤더만 있고 바디 요청이나 post 요청이 없어서 GET방식으로 감
    //     String kakaoLogoutUrl = "https://kauth.kakao.com/oauth/logout" +
    //                         "?client_id=" + clientId +
    //                         "&logout_redirect_uri=" + redirectUri;
    //     return id;
    // }
    @Override
    public boolean idDuplChecker(String incomeId){
//        return userInfoRepository.idDuplChecker(incomeId);
        boolean result = false;
        Optional<UserInfo> newone = jpaUserInfoRepository.findByUid(incomeId);
        if(newone.isPresent()){//중복이 있으면 true
            System.out.println("newone is : "+newone.get().getUid());
            result = true;
        }
        return result;
    }

    @Override
    public UserInfoDto findInfo(UserInfoDto userInfoDto){
        Optional<UserInfo> userInfoData =jpaUserInfoRepository.findByUid(userInfoDto.getUid());
        UserInfoDto result = null;
        if(userInfoData.isPresent()){
            UserInfo getuserInfoData = userInfoData.get();
            result = new UserInfoDto(getuserInfoData);
        }
        return result;
    }

    @Override
    public int signUp(UserInfoDto UserInfoDto){
        System.out.println("signup service");
        int result = 0;
        String encodePwd = passwordEncoder.encode(UserInfoDto.getUpass());//UUID타입으로 생성됨
        UserInfoDto.setUpass(encodePwd);
        UserInfo userinfo = new UserInfo(UserInfoDto);
        UserInfo saveUserinfo = jpaUserInfoRepository.save(userinfo);
        if(saveUserinfo!=null) {
            result = 1;
        }
        return result;
    }

    @Override
    public String encryptString(String socialId){
        String encrypt_socialId=passwordEncoder.encode(socialId);

        return encrypt_socialId;
    }

    @Override
    @Transactional // <- 트랜잭션을 걸어줘야 변경 감지가 작동합니다.
    public int updateUser(UserInfoDto userInfoDto){
        // 1. DTO에서 ID 값을 가져와서 DB의 기존 엔티티를 조회 (영속성 컨텍스트에 로드)
        // includedId를 사용하여 기존 엔티티를 찾습니다.
        // `아이디 찾기/비밀번호 변경`일때는 전달받은 uid값으로 진행
        System.out.println(userInfoDto);

        Optional<UserInfo> existingUserOptional;
        if(userInfoDto.getIncludedId() == null)
        {
            existingUserOptional = jpaUserInfoRepository.findByUid(userInfoDto.getUid());
        }
        else {
            existingUserOptional = jpaUserInfoRepository.findByUid(userInfoDto.getIncludedId());
        }
        if (existingUserOptional.isEmpty()) {
            // ID에 해당하는 사용자가 없는 경우 처리
            return 0;
        }
        UserInfo existingUser = existingUserOptional.get();
        // 2. DTO의 값이 null이 아닌 경우에만 기존 엔티티의 필드를 업데이트
        /*ID값은 위에서 jpaUserInfoRepository.findByUid(userInfoDto.getIncludedId());
        로 가져오는 순간 Uid는 영속성 컨텍스트에 의해 관리됨. 따라서 변경 불가능한 게 되버림.
        * */
//        if (userInfoDto.getUid() != null) {
//            existingUser.setUid(userInfoDto.getUid());
//        }
        if (userInfoDto.getUpass() != null) {
            System.out.println(userInfoDto);
            String newEncodePwd = passwordEncoder.encode(userInfoDto.getUpass());
            existingUser.setUpass(newEncodePwd);
        }
        if (userInfoDto.getUname() != null) {
            existingUser.setUname(userInfoDto.getUname());
        }
        // int 타입은 0이 넘어올 경우 DB의 0으로 업데이트될 수 있으므로,
        // DTO에서 int를 Integer로 바꾸거나 0이 아닌 경우에만 업데이트하도록 처리합니다.
        if (userInfoDto.getUage() > 0) {
            existingUser.setUage(userInfoDto.getUage());
        }
        if (userInfoDto.getUgender() != null) {
            existingUser.setUgender(userInfoDto.getUgender());
        }
        if (userInfoDto.getUaddress() != null) {
            existingUser.setUaddress(userInfoDto.getUaddress());
        }
        if (userInfoDto.getUemail() != null) {
            existingUser.setUemail(userInfoDto.getUemail());
        }
        if (userInfoDto.getUphone() != null) {
            existingUser.setUphone(userInfoDto.getUphone());
        }
        if (userInfoDto.getPostcode() != null) {
            existingUser.setPostcode(userInfoDto.getPostcode());
        }

        // 3. 트랜잭션이 종료될 때, JPA가 변경된 필드만 감지(Dirty Checking)합니다.
        //    UserInfo 엔티티에 붙은 @DynamicUpdate 덕분에 변경된 필드만 포함된
        //    간결한 UPDATE 쿼리가 DB에 실행됩니다.

        // 명시적 save() 호출은 선택 사항이지만, 관습적으로 남겨둘 수 있습니다. (반환 타입이 UserInfo이므로)
        // jpaUserInfoRepository.save(existingUser);

        return 1; // 업데이트 성공 (혹은 변경된 필드 수 등 로직에 맞게 반환)
    }

    @Override
    @Transactional
    public int updateuserId(UserInfoDto userInfoDto){
        return jpaUserInfoRepository.updateByUid(userInfoDto.getUid(),userInfoDto.getIncludedId());
    }
    
    @Override
    @Transactional
    public int deleteuserId(UserInfoDto userInfoDto){
        jpaUserInfoRepository.deleteByUid(userInfoDto.getUid());
        return 1;
    }

    @Override
    public boolean searchuserinfo(UserInfoDto userInfoDto){
        boolean result = false;
        Optional<UserInfo> userInfoData = null;
        if(userInfoDto.getSelectedTap().equals("Id")) {
            userInfoData = jpaUserInfoRepository
                    .findByUemailAndUname(userInfoDto.getUemail(),
                            userInfoDto.getUname());
        }
        else{
            userInfoData = jpaUserInfoRepository
                    .findByUemailAndUnameAndUid(userInfoDto.getUemail(),
                            userInfoDto.getUname(),
                            userInfoDto.getUid());

        }
        result = userInfoData.isPresent();
        return result;
    }
    @Override
    @Transactional
    public String compareauthcode(UserInfoDto userInfoDto)
    {
        String result="wrong or late";
        //auth코드 확인 후 데이터 가져오고 받은 데이터의 uid 여부 확인해서 ID/PW 갈라야함
        //auth코드 확인했으면 지워버리기
        Optional<UserInfoAuthSearch> userInfoAuthSearch;
        userInfoAuthSearch = jpaUserInfoAuthSearchRepository
                .findByAuthcodeAndUnameAndUemail(userInfoDto.getAuthCodeIdPw(),
                        userInfoDto.getUname(),
                        userInfoDto.getUemail());
        LocalDateTime timer;
        
        if(userInfoAuthSearch.isPresent()) {
            timer = userInfoAuthSearch.get().getDeadtime();
            if(timer.isAfter(LocalDateTime.now()))
            {
                Optional<UserInfo> userInfoData = null;
                userInfoData = jpaUserInfoRepository
                        .findByUemailAndUname(userInfoAuthSearch.get().getUemail(),
                            userInfoAuthSearch.get().getUname());
                //나중에 활성화 시키기. ->재시도하게 하려면 비활성화, 재시도 없으면 활성화
                jpaUserInfoAuthSearchRepository.deleteByAuthcode(userInfoDto.getAuthCodeIdPw());
                if(userInfoDto.getUid()==null)
                {
                    if(userInfoData.isPresent())
                    {
                        result = userInfoData.get().getUid();
                    }
                    else
                    {
                        result = "wrong or late";
                    }
                }
                else
                {
                    result = "PW";
                }
            }
            else
            {
                jpaUserInfoAuthSearchRepository.deleteByAuthcode(userInfoDto.getAuthCodeIdPw());
            }
        }
        else{
            System.out.println("no auth");
            result = "wrong or late";
        }
        //pw는 auth코드 확인후에 일반 문자열 리턴?

        return result;
    }
    
    //인증코드를 일정시간마다 확인하고 만료시간이 지났으면 지우는 함수
    @Override
    @Scheduled(fixedRate = 1000*60*60*24)//밀리초로 1초 * 60초 * 60분 * 24시간
    public void printInTime(){
        int result = jpaUserInfoAuthSearchRepository.deleteBydeadTime(LocalDateTime.now());
        System.out.println("Deleted Data Row : " + result);
    }
}
