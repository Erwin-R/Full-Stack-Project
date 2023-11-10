package com.potatochip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication //add this to make this a Spring Boot Application
public class Main {
    public static void main(String[] args){
        SpringApplication.run(Main.class, args); //this line also needed to make this a springboot application
    }

    public String greet(){
        return "Hello";
    }
}
