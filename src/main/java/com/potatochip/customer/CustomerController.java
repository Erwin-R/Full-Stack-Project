package com.potatochip.customer;

import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
//use this so you dont have to copy the path everytime for each route/endpoint
@RequestMapping("api/v1/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

//    @GetMapping("api/v1/customers")
    @GetMapping
    public List<Customer> getCustomers(){
        return customerService.getAllCustomers();
    }

//    @GetMapping("api/v1/customers/{customerId}")
    @GetMapping("{customerId}")
    public Customer getCustomer(@PathVariable("customerId") Integer customerId){
        return customerService.getCustomer(customerId);
    }

    @PostMapping
    public void registerCustomer(
            @RequestBody CustomerRegistrationRequest request){
        customerService.addCustomer(request);
    }

    @DeleteMapping("{customerId}")
    public void deleteCustomer(@PathVariable("customerId") Integer customerId){
        customerService.deleteCustomerById(customerId);
    }

    @PutMapping("{customerId}")
    public void updateCustomerById(@PathVariable("customerId") Integer customerId,
                               @RequestBody CustomerUpdateRequest updateRequest){
        customerService.updateCustomer(customerId, updateRequest);
    }
}
