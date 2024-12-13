package com.potatochip.customer;

import com.github.javafaker.Faker;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.*;

class CustomerJPADataAccessServiceTest {

    private CustomerJPADataAccessService underTest;
    private AutoCloseable autoCloseable;
    private Faker faker = new Faker();
    @Mock private CustomerRepository customerRepository;

    @BeforeEach
    void setUp() {
        //Must initialize mock itself
        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new CustomerJPADataAccessService(customerRepository);
    }

    @AfterEach
    void tearDown() throws Exception {
        //must close mock after
        autoCloseable.close();
    }

    @Test
    void selectAllCustomers() {
        Page<Customer> page = mock(Page.class);
        List<Customer> customers = List.of(new Customer());
        when(page.getContent()).thenReturn(customers);
        when(customerRepository.findAll(any(Pageable.class))).thenReturn(page);
        // When
        List<Customer> expected = underTest.selectAllCustomers();

        // Then
        assertThat(expected).isEqualTo(customers);
        ArgumentCaptor<Pageable> pageArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        verify(customerRepository).findAll(pageArgumentCaptor.capture());
        assertThat(pageArgumentCaptor.getValue()).isEqualTo(Pageable.ofSize(1000));
        // before we added a limit
//        //When
//        underTest.selectAllCustomers();
//        //Then
//        verify(customerRepository)
//                .findAll();
    }

    @Test
    void selectCustomerById() {
        //Given
        int id = 1;
        //When
        underTest.selectCustomerById(id);
        //Then
        verify(customerRepository).findById(id);
    }

    @Test
    void insertCustomer() {
        //Given
        Customer customer = new Customer(
                1,
                "Ali",
                "ali@gmail.com",
                "password", 2,
                Gender.MALE);
        //When
        underTest.insertCustomer(customer);
        //Then
        verify(customerRepository).save(customer);
    }

    @Test
    void existsCustomerWithEmail() {
        //Given
        String email = faker.internet().safeEmailAddress();
        //When
        underTest.existsCustomerWithEmail(email);
        //Then
        verify(customerRepository).existsCustomerByEmail(email);
    }

    @Test
    void deleteCustomerById() {
        //Given
        int id = 1;
        //When
        underTest.deleteCustomerById(id);
        //Then
        verify(customerRepository).deleteById(id);
    }

    @Test
    void existsCustomerWithId() {
        //Given
        int id = 1;
        //When
        underTest.existsCustomerWithId(id);
        //Then
        verify(customerRepository).existsCustomerById(id);
    }

    @Test
    void updateCustomer() {
        //Given
        Customer customer = new Customer(
                1,
                "Ali",
                "ali@gmail.com",
                "password", 2,
                Gender.MALE);
        //When
        underTest.updateCustomer(customer);
        //Then
        verify(customerRepository).save(customer);
    }
}