package com.potatochip.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;


//Do not need to add @Repository to this interface as it is done by default for us
//JpaRepository<tell which entity we want it to act on, datatype for customer indentifier>
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    boolean existsCustomerByEmail(String email);
    boolean existsCustomerById(Integer id);

}
