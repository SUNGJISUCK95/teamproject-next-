package com.springboot.bicycle_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web MVC 설정 클래스
 * - 정적 리소스 핸들링(upload 이미지)
 * - CORS 설정
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * 업로드된 정적 파일(이미지 등)을 외부 경로에서 접근 가능하도록 매핑하는 설정
     *
     * 예)
     *  - 실제 저장 경로: /uploads/파일명.jpg
     *  - 접근 URL: http://localhost:8080/uploads/파일명.jpg
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }

    /**
     * CORS 설정 Bean
     * - 프론트엔드(React: http://localhost:3000)에서 백엔드 API 호출 시
     *   CORS 오류 발생하지 않도록 허용
     * - withCredentials(true)를 쓰려면 Origin을 "*"로 설정하면 안됨 → 특정 도메인만 등록해야 함
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
