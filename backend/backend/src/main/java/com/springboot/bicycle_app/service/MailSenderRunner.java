package com.springboot.bicycle_app.service;

import com.springboot.bicycle_app.dto.UserInfoDto;
import com.springboot.bicycle_app.entity.userinfo.UserInfoAuthSearch;
import com.springboot.bicycle_app.repository.JpaUserInfoAuthSearchRepository;
import com.springboot.bicycle_app.repository.JpaUserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Random;

import jakarta.mail.internet.MimeMessage;

@Component // Spring 빈으로 등록 (역할은 Service와 동일)
@RequiredArgsConstructor
public class MailSenderRunner { // ApplicationRunner 구현 제거
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    private final JpaUserInfoRepository jpaUserInfoRepository;
    private final JpaUserInfoAuthSearchRepository jpaUserInfoAuthSearchRepository;

    @Value("${spring.mail.username}")
    private String senderEmail;

    //무작위 문자열 생성용 변수
    private static final String CHARACTERS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final Random random = new SecureRandom();
    private static final int MIN_LENGTH = 8;
    private static final int MAX_LENGTH = 16;

    //무작위 문자열 생성함수
    public static String generateRandomString() {
        // 1. 8 ~ 16 사이의 무작위 길이를 결정합니다.
        int length = random.nextInt(MAX_LENGTH - MIN_LENGTH + 1) + MIN_LENGTH;

        // 2. StringBuilder를 사용하여 문자열을 효율적으로 생성합니다.
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            // 3. CHARACTERS 문자열에서 무작위로 하나의 문자를 선택합니다.
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);

            // 4. StringBuilder에 추가합니다.
            sb.append(randomChar);
        }

        // 5. 최종 문자열을 반환합니다.
        return sb.toString();
    }
    /**
     * 외부에서 호출하여 테스트 메일을 발송하는 메서드
     */
    public void sendTestMail(UserInfoDto userInfoDto) throws Exception {
        String encodedAuthCode = generateRandomString();
        System.out.println("메일 전송 시도: " + senderEmail + " -> jhs34276225@naver.com");

        MimeMessage m = mailSender.createMimeMessage();
        MimeMessageHelper h = new MimeMessageHelper(m,"UTF-8");

        h.setFrom(senderEmail);
        h.setTo("jhs34276225@naver.com");//나중에 이메일 주소 받아서 보내기
        h.setSubject("인증 코드 메일입니다.");
        h.setText("인증 코드는 다음과 같습니다 : " + encodedAuthCode);

        //DB 저장 부분
        UserInfoAuthSearch authData = new UserInfoAuthSearch(userInfoDto);
        authData.setAuthcode(encodedAuthCode);
        authData.setDeadtime(LocalDateTime.now().plusMinutes(5));
        jpaUserInfoAuthSearchRepository.save(authData);

        //송신
        mailSender.send(m);
        System.out.println("메일 전송 완료!");
    }
}