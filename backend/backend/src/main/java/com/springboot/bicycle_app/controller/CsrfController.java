package com.springboot.bicycle_app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/csrf")
public class CsrfController {
    @GetMapping("/create")
    public ResponseEntity<?> create(HttpServletRequest request){
        /* CSRF 토큰을 생성하여 쿠키에 실어서 보냄 - 쿠키는 Response~~ 응답객체에 자동 실림*/

        CsrfToken token = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        return ResponseEntity.ok(token);
    }
    @GetMapping("/refresh")//프론트에서 로그아웃 발생시 토큰을 재발급함.
    public ResponseEntity<?> refresh(HttpServletRequest request){
//        request.changeSessionId();
        CsrfToken token = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbb");
        return ResponseEntity.ok(token);
    }
}
