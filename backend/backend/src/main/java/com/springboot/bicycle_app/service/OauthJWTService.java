package com.springboot.bicycle_app.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.Authentication;

public interface OauthJWTService {
    void init();
    String createToken(Authentication authentication);
    String createToken(String username, String authorities);
    String createRefreshToken(String username, String authorities);
    Claims getClaims(String token);
    Authentication getAuthentication(String token);
    boolean validateToken(String token);
}
