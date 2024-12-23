package com.potatochip;

import com.github.javafaker.Faker;
import com.github.javafaker.Name;
import com.potatochip.customer.Customer;
import com.potatochip.customer.CustomerRepository;
import com.potatochip.customer.Gender;
import com.potatochip.s3.S3Buckets;
import com.potatochip.s3.S3Service;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder
//            S3Service s3Service,
//            S3Buckets s3Buckets
    ) {
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

            createRandomCustomer(customerRepository, passwordEncoder);
//            testBucketUploadAndDownload(s3Service, s3Buckets);
        };
    }

    private static void testBucketUploadAndDownload(S3Service s3Service, S3Buckets s3Buckets) {
        s3Service.putObject(
                s3Buckets.getCustomer(),
                "foo",
                "Hello world".getBytes()
        );

        byte[] object = s3Service.getObject(
                s3Buckets.getCustomer(),
                "foo"
        );

        System.out.println("Hooray: " + new String(object));
    }

    private static void createRandomCustomer(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        Faker faker = new Faker();
        Random random = new Random();
        Name name = faker.name();
        String firstName = name.firstName();
        String lastName = name.lastName();
        int age =  random.nextInt(16, 99);
        Gender gender  = age % 2 == 0 ? Gender.MALE : Gender.FEMALE;
        Customer customer = new Customer(
                firstName + " " + lastName,
                faker.internet().emailAddress(),
//                    firstName.toLowerCase() + "." + lastName.toLowerCase() + "@amigoscode.com",
                passwordEncoder.encode("password"),
                age,
                gender
                );
        customerRepository.save(customer);
    }


}
