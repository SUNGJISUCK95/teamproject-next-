package com.springboot.bicycle_app;

import com.springboot.bicycle_app.service.BoardInitService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class BicycleAppApplication {

    private final BoardInitService boardInitService;

    public BicycleAppApplication(BoardInitService boardInitService) {
        this.boardInitService = boardInitService;
    }

    public static void main(String[] args) {
        SpringApplication.run(BicycleAppApplication.class, args);
    }

    @Bean
    public CommandLineRunner initBoardData() {
        return args -> {
            boardInitService.loadInitialBoardData();
        };
    }
}
