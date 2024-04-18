package com.potatochip.customer;

public record CustomerUpdateRequest(
        String name,
        String email,
        Integer age
) {

}
