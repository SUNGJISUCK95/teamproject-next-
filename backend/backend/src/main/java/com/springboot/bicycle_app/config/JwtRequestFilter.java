package com.springboot.bicycle_app.config;
import com.springboot.bicycle_app.service.JwtUtilService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtUtilService jwtUtilService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest req,
            HttpServletResponse res,
            FilterChain chain
    ) throws ServletException, IOException {

        //전송된 쿠키 Header에서 Authorization 이름 찾기!!
        String bearer = req.getHeader("Authorization");

        if (bearer != null && bearer.startsWith("Bearer ")) {
            String accessToken = bearer.substring(7);

            if (accessToken != null) {
                //액세스 토큰이 만료 체크
                if (!jwtUtilService.validate(accessToken)) {
                    //401 응답 보내고 필터 종료
                    res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
                    return;
                }

                Authentication auth = jwtUtilService.getAuthentication(accessToken);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(req, res);
    }

}
