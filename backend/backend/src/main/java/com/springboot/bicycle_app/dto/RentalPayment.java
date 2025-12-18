package com.springboot.bicycle_app.dto;

public class RentalPayment {
    private String status;
    private String message;
    private String retalId;

    public RentalPayment(String status, String message, String retalId) {
        this.status = status;
        this.message = message;
        this.retalId = retalId;
    }
    public String getStatus() {
        return status;
    }

}