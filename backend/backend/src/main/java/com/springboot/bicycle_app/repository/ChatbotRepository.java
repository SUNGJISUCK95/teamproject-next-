package com.springboot.bicycle_app.repository;

import com.springboot.bicycle_app.dto.ChatbotFaq;
import java.util.List;

/**
 * 챗봇 FAQ 데이터 저장/조회용 Repository 인터페이스
 *
 * Spring Data JPA 기반이 아니라,
 * 직접 구현 클래스(ChatbotRepositoryImpl 등)를 만들어 사용하기 위한 구조.
 *
 * FAQ 데이터는 다음과 같은 용도로 활용된다:
 * - 사용자 입력 메시지와 매칭되는 답변 제공
 * - 추천 링크 제공
 * - FAQ 목록 전체 조회
 *
 * 메서드 설명:
 * - findByKeyword : 특정 키워드를 기반으로 FAQ 검색
 * - save          : 새로운 FAQ 저장
 * - count         : 전체 FAQ 개수 조회
 * - findAll       : FAQ 전체 목록 조회
 */
public interface ChatbotRepository {

    /**
     * 입력된 키워드와 일치하는 FAQ 항목을 조회한다.
     *
     * 예:
     *   message = "배송"
     *   FAQ(keyword="배송", question="배송은 얼마나 걸리나요?", answer="...")
     *
     * 키워드 매칭 방식은 구현체(ChatbotRepositoryImpl)에서 정의해야 한다.
     * 완전일치/부분일치/유사도 검색 등 다양한 방식 가능.
     */
    ChatbotFaq findByKeyword(String message);

    /**
     * 새로운 FAQ 데이터 저장
     *
     * 반환값:
     *   정상 저장 → 1
     *   실패 → 0 또는 예외 발생
     *
     * 구현 방식은 JDBC, MyBatis, Memory 등 선택 사항이다.
     */
    int save(ChatbotFaq faq);

    /**
     * 저장된 FAQ의 전체 개수를 반환한다.
     *
     * FAQ JSON을 DB로 변환하는 과정이나,
     * 관리자 페이지에서 FAQ 현황을 보여줄 때 사용 가능.
     */
    int count();

    /**
     * 저장되어 있는 모든 FAQ 데이터를 조회한다.
     *
     * 챗봇 서비스에서 추천 응답을 구성할 때 전체 목록 불러오기 용도.
     */
    List<ChatbotFaq> findAll();
}
