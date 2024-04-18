package com.potatochip.customer;

public record CustomerRegistrationRequest(
        String name,
        String email,
        Integer age
) {
}
