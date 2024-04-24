package com.potatochip;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import com.potatochip.customer.Customer;
import com.potatochip.customer.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import java.util.Objects;
import java.util.Random;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);

    }

    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository customerRepository){
        return args -> {
//            Customer alex = new Customer(
//                    "Alex",
//                    "alex@gmail.com",
//                    21
//            );
//            Customer jamila = new Customer(
//                    "Jamila",
//                    "jamila@gmail.com",
//                    19
//            );
//
//            List<Customer> customers = List.of(alex, jamila);

            Faker faker = new Faker();
            Random random = new Random();
            Name name = faker.name();
            String firstName = name.firstName();
            String lastName = name.lastName();
            Customer customer = new Customer(
                    firstName + " " + lastName,
//                    faker.internet().emailAddress(),
                    firstName.toLowerCase() + "." + lastName.toLowerCase() + "@amigoscode.com",
                    random.nextInt(16, 99)

            );
            customerRepository.save(customer);


        };
    }


}
