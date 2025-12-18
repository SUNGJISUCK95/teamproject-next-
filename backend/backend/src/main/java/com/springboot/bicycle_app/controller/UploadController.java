package com.springboot.bicycle_app.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

/**
 * 파일 업로드 처리 컨트롤러
 * - React에서 전송된 MultipartFile을 받아 서버 로컬 디렉토리에 저장
 * - 저장된 파일의 접근 URL을 반환
 */
@RestController
@RequestMapping("/api")
public class UploadController {

    /**
     * 파일 업로드 처리
     * 
     * 요청 예시:
     * POST /api/upload
     * Form-data: { file: <이미지 파일> }
     *
     * 처리 순서:
     * 1. MultipartFile에서 원본 파일명 추출
     * 2. UUID 기반의 새로운 파일명 생성 (파일명 충돌 방지)
     * 3. /uploads 디렉토리에 저장 (없으면 생성)
     * 4. 저장된 파일에 접근 가능한 URL 반환
     */
    @PostMapping("/upload")
    public Map<String, String> uploadFile(@RequestParam("file") MultipartFile file) {

        try {
            // 1. 원본 파일명과 확장자 추출
            String originalName = file.getOriginalFilename();
            String ext = originalName.substring(originalName.lastIndexOf(".")); // .jpg

            // 2. 파일명 충돌 방지를 위한 UUID 기반 새 파일명 생성
            String newFileName = UUID.randomUUID() + ext;

            // 3. 업로드 저장 경로 설정 및 디렉토리 생성
            Path uploadDir = Paths.get("uploads");
            Files.createDirectories(uploadDir);     // 폴더가 없으면 새로 생성

            Path uploadPath = uploadDir.resolve(newFileName);   // 최종 저장될 파일 경로

            // 4. 파일 저장 (기존 파일이 존재하면 덮어쓰기)
            Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);

            // 5. 프론트엔드에서 접근 가능한 파일 URL 생성
            String fileUrl = "http://localhost:8080/uploads/" + newFileName;

            return Map.of("url", fileUrl);

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("파일 저장 실패", e);
        }
    }
}
