package com.webage.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.webage.Customers.Customer;

public interface CustomersRepository extends CrudRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);
}
