package com.potatochip;

import org.springframework.web.bind.annotation.GetMapping;

public class PingPongController2 {
    record PingPong(String result){}

    @GetMapping("/ping")
    public PingPong getPingPong(){
        return new PingPong("pong");
    }
}
