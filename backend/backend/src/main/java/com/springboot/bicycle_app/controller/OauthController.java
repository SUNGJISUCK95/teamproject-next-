package com.springboot.bicycle_app.controller;

import com.springboot.bicycle_app.dto.Token;
import com.springboot.bicycle_app.dto.UserInfoDto;
import com.springboot.bicycle_app.service.*;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@RequestMapping("/auth")
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class OauthController {

    private final OauthService oauthService;
    private final AuthenticationManager authenticationManager;
    private final HttpSessionSecurityContextRepository contextRepository;
    private final OauthJWTService oauthJWTService;
    private final TravelService travelService;
    private final MailSenderRunner mailSenderRunner;

    public OauthController(OauthService oauthService,
                           AuthenticationManager authenticationManager,
                           HttpSessionSecurityContextRepository contextRepository,
                           OauthJWTService oauthJWTService,
                           TravelService travelService,
                           MailSenderRunner mailSenderRunner)
    {
        this.oauthService = oauthService;
        this.authenticationManager = authenticationManager;
        this.contextRepository = contextRepository;
        this.oauthJWTService = oauthJWTService;
        this.travelService = travelService;
        this.mailSenderRunner=mailSenderRunner;
    }

    @PostMapping("/token")
    public ResponseEntity<?> gettoken(@RequestBody Token token){
        String authcode;
        String socialId;
        if(token.getSocial().equals("google"))//구글은 중간 토큰 요청없이 access토큰을 바로 넘겨준다.
        //https://ldd6cr-adness.tistory.com/323 참고
        {
            socialId = oauthService.socialIdCatcher(token.getAuthCode(),token.getSocial());
        }
        else
        {
            authcode = oauthService.getSocialAccessToken(token);
            socialId = oauthService.socialIdCatcher(authcode,token.getSocial());
        }
        UserInfoDto socialIdChecker = new UserInfoDto();
        socialIdChecker.setUid(socialId);
        String jwToken = oauthJWTService.createToken(socialId,"ROLE_USER");
        String jwRefreshToken = oauthJWTService.createRefreshToken(socialId,"ROLE_USER");
        socialIdChecker.setJwToken(jwToken);

        boolean Social_reuslt_b = idDuplCheck(socialIdChecker);
        String Social_reuslt_s;
        if(Social_reuslt_b){//true면 아이디 등록됨. false면 아이디 없음
            Social_reuslt_s = "duplicate on " + token.getSocial();
            socialIdChecker.setSocialDupl(true);
        }
        else{
            Social_reuslt_s = "duplicate off" + token.getSocial();
            socialIdChecker.setUid("");
            socialIdChecker.setSocialDupl(false);
        }

        //4. HttpOnly 쿠키 전송 객체 생성
        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", jwRefreshToken)
                .httpOnly(true)
                .path("/")
                .maxAge(60 * 60 * 24 * 14)
                .sameSite("Strict") //📌 SameSite=Strict 는 cross-site 요청에서 쿠키 전송 ❌, None or Lax 변경
                //.secure(false)  //📌로컬 개발이라 http, https 아님, 배포 시 true
                .build();


        //5. ResponseBody로 결과 전송 : access 토큰 포함 객체 생성
        Map<String, Object> body = Map.of(
                "accessToken", jwToken,
                "tokenType", "Bearer",
                "login", socialIdChecker.isSocialDupl(),
                "userId", socialIdChecker.getUid(),
                "role", "ROLE_USER"
        );

        //6. 결과 전송
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(body);
//        socialIdChecker.setJwToken(jwToken);
//
//        boolean Social_reuslt_b = idDuplCheck(socialIdChecker);//false면 겹치는거 없음. true면 겹치는거 있음
//        String Social_reuslt_s;
//        if(Social_reuslt_b){
//            Social_reuslt_s = "duplicate on " + token.getSocial();
//            socialIdChecker.setSocialDupl(true);
//        }
//        else{
//            Social_reuslt_s = "duplicate off" + token.getSocial();
//            socialIdChecker.setUid("");
//            socialIdChecker.setSocialDupl(false);
//        }
//        return socialIdChecker;
    }

    @PostMapping("/idDuplCheck")
    public boolean idDuplCheck(@RequestBody UserInfoDto userInfo){
        return oauthService.idDuplChecker(userInfo.getUid());
    }

    @PostMapping("/signup")
    public int signup(@RequestBody UserInfoDto userInfoDto){
        if(userInfoDto.isSocialDupl())//true면 일반 회원가입
        {
            System.out.println("signup controller");
            oauthService.signUp(userInfoDto);
            travelService.insertSave(userInfoDto.getUid());
            return 1;
        }
        else{//false면 소셜로그인 해서 겹치는 게 없어서 들어온 회원가입
            String JWToken = userInfoDto.getJwToken();
            Claims claim = oauthJWTService.getClaims(JWToken);
            userInfoDto.setUid(claim.getSubject());
            userInfoDto.setUpass("");
            return oauthService.signUp(userInfoDto);
        }
    }

//    @PostMapping("/info")
//    public UserInfoDto info(@RequestBody UserInfoDto userInfoDto){
//        UserInfoDto result = null;
//        if(userInfoDto.isSocialDupl())
//        {
//            //jw토큰 받아다가 바꿔서 id에 넣기, 패스워드는 빈칸으로 세팅
//            userInfoDto.setJwToken(userInfoDto.getUid());
//            String JWToken = userInfoDto.getUid();//uid에 토큰 넣어옴
//            Claims claim = oauthJWTService.getClaims(JWToken);
//            userInfoDto.setUid(claim.getSubject());
//        }
//        result = oauthService.findInfo(userInfoDto);
//        result.setUpass("");
//        return result;
//    }

    //기존 info의 경우, localstorage에 저장된 값을 호출해서 정보를 불러옴
    //문제는 localStorage를 변환해서 접근하면 변환한 사용자 데이터 가져왔음.
    //그래서 J세션아이디, JWT로 접근하는 방식으로 변경함.
    @PostMapping("/info")
    public UserInfoDto info() { // 인자에서 DTO를 제거하거나, 받더라도 사용하지 않습니다.

        // 1. Spring Security Context에서 인증된 사용자 정보를 가져옵니다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authenticatedUsername = null;

        // 2. Principal에서 ID(Username)를 추출합니다.
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            authenticatedUsername = userDetails.getUsername(); // CustomUserDetails의 ID 필드
        } else if (authentication != null) {
            authenticatedUsername = authentication.getName(); // 그 외 Principal (예: 단순 String)
        }

        // 3. 인증된 사용자 ID가 없으면 접근 거부 (혹은 예외 처리)
        if (authenticatedUsername == null) {
            // 이미 Security 설정을 통과했으므로 이 경우는 거의 없어야 함
            throw new AccessDeniedException("인증된 사용자 정보를 찾을 수 없습니다.");
        }

        UserInfoDto result;
        UserInfoDto authname = new UserInfoDto();
        System.out.println("BBBBBBBBBBBBBBBBBBBBB");
        System.out.println(authenticatedUsername);
        authname.setUid(authenticatedUsername);
        result = oauthService.findInfo(authname);
        // 비밀번호 필드는 항상 비워둡니다.
        result.setUpass("");
        return result;

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserInfoDto userInfo,
                                   HttpServletRequest request,
                                   HttpServletResponse response) {
        try {
            System.out.println("login 1 step ");

            if(userInfo.isSocialDupl())
            {
                System.out.println("change start ");
                //jw토큰 받아다가 바꿔서 id에 넣기, 패스워드는 빈칸으로 세팅
                userInfo.setJwToken(userInfo.getUid());
                String JWToken = userInfo.getUid();//uid에 토큰 넣어옴
                Claims claim = oauthJWTService.getClaims(JWToken);
                userInfo.setUid(claim.getSubject());
                userInfo.setUpass("");
            }
            //1. 인증 요청
            Authentication authenticationRequest =
                    UsernamePasswordAuthenticationToken.unauthenticated(userInfo.getUid(), userInfo.getUpass());

            //2. 인증 처리 : 여기서 security 쪽으로 갔다가 서비스의 customUserDetailsService로 가고 거기서 DB 지정됨
            Authentication authenticationResponse =
                    this.authenticationManager.authenticate(authenticationRequest);

            var authorities = authenticationResponse.getAuthorities();

            //3. 컨텍스트에 보관: 세션과 함께 저장, 만료때까지 저장됨.
            var context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authenticationResponse);
            SecurityContextHolder.setContext(context);

            // SecurityContext 세션에 "명시 저장" (requireExplicitSave(true)일 때 필수)
            contextRepository.saveContext(context, request, response);

            //4. 로그인 성공 시 CSRF 토큰을 재발행을 위해 브라우저 토큰 null 처리
            var xsrf = new Cookie("XSRF-TOKEN", null);
            xsrf.setPath("/");               // ← 기존과 동일
            xsrf.setMaxAge(0);               // ← 즉시 만료
            xsrf.setHttpOnly(false);          // 개발 중에도 HttpOnly 유지 권장
            // cookie.setSecure(true);         // HTTPS에서만. 로컬 http면 주석
            // cookie.setDomain("localhost");  // 기존 쿠키가 domain=localhost였다면 지정
            response.addCookie(xsrf);


            // if(userInfo.isSocialDupl()) {
            //     return ResponseEntity.ok(Map.of("login", true,
            //             "userId", userInfo.getJwToken()));
            // }
            // else {
            //     return ResponseEntity.ok(Map.of("login", true,
            //             "userId", userInfo.getUid()));
            // }
            if(userInfo.isSocialDupl()) {
                return ResponseEntity.ok(Map.of(
                        "login", true,
                        "userId", userInfo.getJwToken(),
                        "role", authorities
                ));
            }
            else {
                return ResponseEntity.ok(Map.of(
                        "login", true,
                        "userId", userInfo.getUid(),
                        "role", authorities
                ));
            }
        }catch(Exception e) {
            //로그인 실패
            return ResponseEntity.ok(Map.of("login", false));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request,
                                    HttpServletResponse response) {

        // 1. 세션이 없으면 생성하지 않고 null 반환 (로그아웃 시 표준 방식)
        HttpSession session = request.getSession(false);

        // 2. 세션이 존재하면 무효화
        if(session != null) {
            session.invalidate(); // 서버 세션 무효화 (JSESSIONID 삭제 명령 포함)
        }

        // 3. JSESSIONID 만료 쿠키 전송 (Path/Domain 꼭 기존과 동일)
        var cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");               // ← 기존과 동일
        cookie.setMaxAge(0);               // ← 즉시 만료
        cookie.setHttpOnly(true);          // 개발 중에도 HttpOnly 유지 권장
        // cookie.setSecure(true);         // HTTPS에서만. 로컬 http면 주석
        // cookie.setDomain("localhost");  // 기존 쿠키가 domain=localhost였다면 지정
        response.addCookie(cookie);

        // 4. CSRF 토큰을 재발행하여 출력
        var xsrf = new Cookie("XSRF-TOKEN", null);
        xsrf.setPath("/");               // ← 기존과 동일
        xsrf.setMaxAge(0);               // ← 즉시 만료
        xsrf.setHttpOnly(false);          // 개발 중에도 HttpOnly 유지 권장
        // xsrf.setSecure(true);         // HTTPS에서만. 로컬 http면 주석
        // xsrf.setDomain("localhost");  // 기존 쿠키가 domain=localhost였다면 지정
        response.addCookie(xsrf);

        // 1. refreshToken 쿠키 삭제 (만료)
        ResponseCookie deleteRefreshCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                //.sameSite("None")
                //.secure(false)
                .build();

        response.addHeader("Set-Cookie", deleteRefreshCookie.toString());

        // 3. 응답: 세션이 있었든 없었든, 클라이언트에게 로그아웃 요청이 성공했음을 알림 (200 OK)
        //    JSESSIONID 쿠키 삭제는 session.invalidate() 시 서블릿 컨테이너가 처리합니다.
        return ResponseEntity.ok(Map.of("logout", true));
    }


    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.ok(Map.of("isLogin", false));
        }

        var principal = (org.springframework.security.core.userdetails.User)
                authentication.getPrincipal();

        return ResponseEntity.ok(Map.of(
                "isLogin", Boolean.TRUE,
                "uid", principal.getUsername(),
                "role", principal.getAuthorities()
        ));
    }

    @PostMapping("/updateUser")
    @Transactional
    public boolean updateUser(@RequestBody UserInfoDto userInfoDto){
        boolean userId_edit_or_not=false;
        oauthService.updateUser(userInfoDto);//다른 정보들 변경
        //이걸 먼저 해야 아이디가 안바뀌어서 다른 정보들 변경 후에 ID값이 변경됨.
        //먼저 안하고 아이디만 먼저 바꾸면 아이디값이 달라져서 못찾고 그대로 끝남
        if(userInfoDto.getUid()!=null)
        {
            oauthService.updateuserId(userInfoDto);//Id값 변경
            userId_edit_or_not=true;
        }
        return userId_edit_or_not;
    }

    @PostMapping("/iddrop")
    @Transactional
    public int idDrop(@RequestBody UserInfoDto userInfoDto){
        System.out.println("you try to delete ID");
        return oauthService.deleteuserId(userInfoDto);
    }

    @PostMapping("/searchuserinfo")
    public boolean searchuserinfo(@RequestBody UserInfoDto userInfoDto){
        boolean searchResult = false;
        if(userInfoDto.getSelectedTap().equals("Id") || userInfoDto.getSelectedTap().equals("Pw")){
            if(oauthService.searchuserinfo(userInfoDto))
            {
                try {
                    mailSenderRunner.sendTestMail(userInfoDto);
                    searchResult=true;
                    return searchResult;
                }
                catch(Exception e){
                    e.printStackTrace();
                    System.out.println("Failed to send mail: " + e.getMessage());
                }
            }
        }
        return searchResult;
    }

    @PostMapping("/compareauthcode")
    public String compareauthcode(@RequestBody UserInfoDto userInfoDto){
        return oauthService.compareauthcode(userInfoDto);
    }
}
