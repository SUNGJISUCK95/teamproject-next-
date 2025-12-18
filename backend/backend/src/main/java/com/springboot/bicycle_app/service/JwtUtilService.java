package com.springboot.bicycle_app.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtUtilService {

    @Value("${jwt.secret}")
    private String secretKey;

    //token 유효기간 정의
    //refreshExpireMs 이건 갱신될때마다 로그인 전부 짤린다. 즉 재접속 필요
    //private final long accessExpireMs = 1000L * 60 * 15;      // 15분
    private final long accessExpireMs = 1000L * 30;      // 30초
    private final long refreshExpireMs = 1000L * 60 * 60 * 24 * 14; // 14일

    //token 생성을 위한 key
    private Key signingKey() {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey));
    }
//
//    //accessToken 생성
//    public String createAccessToken(MemberDto member) {
//        return Jwts.builder()
//                .setSubject(member.getId())
//                .claim("role", member.getRole())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + accessExpireMs))
//                .signWith(signingKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    //refreshToken 생성
//    public String createRefreshToken(MemberDto member) {
//        return Jwts.builder()
//                .setSubject(member.getId())
//                .claim("role", member.getRole())
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + refreshExpireMs))
//                .signWith(signingKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }

    //token 유효성 체크
    public boolean validate(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(signingKey()).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("⚠ token expired : " + e.getMessage());//토큰만료 401, 권한부족 403
            return false;
        } catch (JwtException e) {
            System.out.println("🎯 토큰 위조/형식 오류: " + e.getMessage());
            return false;
        }
    }

    //token 유효기간 무효화
    public Date extractExpirationDate(String token) {
        return getClaims(token).getExpiration();
    }

    //token 만료 여부 확인
    public boolean isTokenExpired(String token) {
        try {
            return extractExpirationDate(token).before(new Date());
        } catch (ExpiredJwtException e) {
            // 이미 만료된 토큰도 exp는 가지고 있으므로
            return true;
        }
    }

    //token(refreshToken)에 등록된 정보 가져오기
    public Claims getClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(signingKey()).build()
                .parseClaimsJws(token).getBody();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = getClaims(token);
        String id = claims.getSubject();
        String role = claims.get("role", String.class);
        if(role==null){//초기 미등록된 계정 고려
            role = "USER";
        }
        role = role.replace("[", "").replace("]", "").trim();

        UserDetails user = User.withUsername(id)
                .password("")
                .roles(role.replace("ROLE_", "")) // ROLE_ prefix 주의
                .build();

        return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
    }
}

