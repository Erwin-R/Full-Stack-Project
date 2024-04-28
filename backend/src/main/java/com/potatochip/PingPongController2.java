package com.potatochip;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PingPongController2 {
        record PingPong2(String result){}

        @GetMapping("/ping")
        public PingPong2 getPingPong(){
            return new PingPong2("pong");
        }
}
