package com.springboot.bicycle_app.controller;

public class PaymentFailedException extends RuntimeException{
    public PaymentFailedException(String message){
        super(message);
    }
}
