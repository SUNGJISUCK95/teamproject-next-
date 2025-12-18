package com.springboot.bicycle_app.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
public class OauthJWTServiceImpl implements OauthJWTService {

    private final String secret;
    private final long tokenValidityInMilliseconds;

    private Key key; // 토큰 서명에 사용할 Key 객체

    // --- 1. 생성자 및 초기화 ---

    public OauthJWTServiceImpl(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.token-validity-in-seconds}") long tokenValidityInSeconds) {
        this.secret = secret;
        this.tokenValidityInMilliseconds = tokenValidityInSeconds; // 1시간

    }

    @PostConstruct
    @Override
    public void init() {
        // 주입받은 시크릿 키 문자열을 Base64 인코딩하여 Key 객체로 변환
//        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // --- 2. 토큰 생성 (Authentication 객체 사용) ---

    /**
     * Spring Security의 Authentication 객체를 이용해 JWT 토큰을 생성합니다.
     * @param authentication 인증 객체 (사용자 ID 및 권한 정보 포함)
     * @return 생성된 JWT 문자열
    //     */
    @Override
    public String createToken(Authentication authentication) {
        // 권한 정보 추출: Authority 객체들을 쉼표로 구분된 문자열로 변환합니다.
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // 만료 시간 설정
        long now = (new Date()).getTime();
        Date validity = new Date(now + this.tokenValidityInMilliseconds);

        // JWT 토큰 생성
        return Jwts.builder()
                .setSubject(authentication.getName()) // 토큰의 제목 (사용자 ID)
                .claim("auth", authorities)          // Payload에 권한 정보 (Claims) 추가
                .signWith(key, SignatureAlgorithm.HS512) // 암호화 알고리즘과 Key 설정
                .setExpiration(validity)             // 만료 시간 설정
                .compact();
    }

    // --- 3. 토큰 생성 (사용자 ID 문자열 사용) ---

    /**
     * 사용자 ID 문자열과 권한 문자열을 직접 받아 JWT 토큰을 생성합니다.
     * @param username 토큰의 Subject로 사용할 사용자 ID
     * @param authorities 토큰의 'auth' Claim으로 사용할 권한 문자열 (쉼표로 구분)
     * @return 생성된 JWT 문자열
     */
    @Override
    public String createToken(String username, String authorities) {
        // 만료 시간 설정
        long now = (new Date()).getTime();
        Date validity = new Date(now + this.tokenValidityInMilliseconds);

        // JWT 토큰 생성
        return Jwts.builder()
                .setSubject(username)                // 사용자 ID를 Subject로 설정
                //claim의 경우, config파일에서 설정하는 허가 경로에 따라 통과/정지가 결정됨
                //근데 지금은 permitall()로 해둬서 의미없음.
                .claim("auth", authorities)          // 권한 정보를 Claims에 설정
                .signWith(key, SignatureAlgorithm.HS512) // 암호화 알고리즘과 Key 설정
                .setExpiration(validity)             // 만료 시간 설정
                .compact();
    }

    @Override
    public String createRefreshToken(String username, String authorities) {
        // 만료 시간 설정
        long now = (new Date()).getTime();
        Date validity = new Date(now + this.tokenValidityInMilliseconds*1000);

        // JWT 토큰 생성
        return Jwts.builder()
                .setSubject(username)                // 사용자 ID를 Subject로 설정
                //claim의 경우, config파일에서 설정하는 허가 경로에 따라 통과/정지가 결정됨
                //근데 지금은 permitall()로 해둬서 의미없음.
                .claim("auth", authorities)          // 권한 정보를 Claims에 설정
                .signWith(key, SignatureAlgorithm.HS512) // 암호화 알고리즘과 Key 설정
                .setExpiration(validity)             // 만료 시간 설정
                .compact();
    }

    // --- 4. 토큰 해독 및 인증 객체 생성 ---

    /**
     * 토큰을 복호화하여 Spring Security의 인증 객체(Authentication)를 생성합니다.
     * @param token 인증에 사용할 JWT 문자열
     * @return Spring Security Authentication 객체
     */
    @Override
    public Authentication getAuthentication(String token) {
        // 1. 토큰에서 Claims 추출
        Claims claims = getClaims(token);

        // 2. Claims에서 권한 정보 ('auth' 키) 추출하여 GrantedAuthority 객체로 변환
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        // 3. UserDetails 객체 생성 (사용자 ID와 권한 정보 사용)
        UserDetails principal = new User(claims.getSubject(), "", authorities);

        // 4. Spring Security의 Authentication 객체 반환
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    /**
     * JWT 토큰에서 Claims(Payload 정보)를 추출하는 내부 메서드
     * @param token 검증할 JWT 문자열
     * @return JWT Claims 객체
     */
    @Override
    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key) // 토큰 생성 시 사용한 Secret Key를 설정
                .build()
                .parseClaimsJws(token) // 토큰을 파싱하고 서명을 검증
                .getBody();            // Claims(Payload) 부분을 반환
    }

    // --- 5. 토큰 유효성 검증 ---

    /**
     * JWT 토큰의 유효성을 검사하는 메서드 (만료 여부, 서명 유효성 등)
     * @param token 검증할 JWT 문자열
     * @return 유효하면 true, 아니면 false
     */
    @Override
    public boolean validateToken(String token) {
        try {
            getClaims(token); // Claims 추출 시 예외가 발생하지 않으면 유효
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}