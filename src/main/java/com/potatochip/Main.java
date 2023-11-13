package com.potatochip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@SpringBootApplication //add this to make this a Spring Boot Application
@RestController
public class Main {
    public static void main(String[] args){
        SpringApplication.run(Main.class, args); //this line also needed to make this a springboot application
    }

    @GetMapping("/")
    public GreetResponse greet(){
        //new keyword creates an instance of a class
        GreetResponse response = new GreetResponse(
                "Hello",
                List.of("Java", "Golang", "JavaScript"),
                new Person("Alex", 28, 30000)
        );
        return response;
    }

    record Person(String name, int age, double savings){}
    record GreetResponse(
            String greet,
            List<String> favProgrammingLanguage,
            Person person
    ){}
//    all of this below is equivalent to the line above^
//    class GreetResponse{
//        private final String greet;
//
//        GreetResponse(String greet){
//            this.greet = greet;
//        }
//
//        public String getGreet() {
//            return greet;
//        }
//
//        @Override
//        public String toString() {
//            return "GreetResponse{" +
//                    "greet='" + greet + '\'' +
//                    '}';
//        }
//
//        @Override
//        public boolean equals(Object o) {
//            if (this == o) return true;
//            if (o == null || getClass() != o.getClass()) return false;
//            GreetResponse that = (GreetResponse) o;
//            return Objects.equals(greet, that.greet);
//        }
//
//        @Override
//        public int hashCode() {
//            return Objects.hash(greet);
//        }
//    }
}
