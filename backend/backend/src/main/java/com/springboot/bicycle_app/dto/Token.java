package com.springboot.bicycle_app.dto;

import lombok.Data;

@Data
public class Token {

    private String authCode;
    private String social;
    private String hostName;
}
