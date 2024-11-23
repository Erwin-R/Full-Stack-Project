package com.potatochip.customer;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

// we create this mapper class as it makes it easier to inject this DTO mapper and is more reusable
@Service
public class CustomerDTOMapper implements Function<Customer, CustomerDTO> {
//basically when it implements a function it takes in a Customer and then outputs CustomerDTO object^^
// when a class implements "Function" it must provide logic for the "apply" method
    // our apply function turns the Customer into a CustomerDTO object
    @Override
    public CustomerDTO apply(Customer customer) {
        //mapping logic
        return new CustomerDTO(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getGender(),
                customer.getAge(),
                customer.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()),
                customer.getUsername()
        );
    }
}
