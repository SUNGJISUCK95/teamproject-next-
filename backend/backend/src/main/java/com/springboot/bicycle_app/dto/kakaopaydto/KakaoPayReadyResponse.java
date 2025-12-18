package com.springboot.bicycle_app.dto.kakaopaydto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class KakaoPayReadyResponse {
    private String tid; // 결제 고유 번호 (DB에 저장되어야 함)

    @JsonProperty("next_redirect_pc_url")
    private String nextRedirectPcUrl;
    private String created_at;
}