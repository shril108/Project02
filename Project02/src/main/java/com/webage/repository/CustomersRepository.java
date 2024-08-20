package com.webage.repository;

import org.springframework.data.repository.CrudRepository;

import com.webage.Customers.Customer;

public interface CustomersRepository extends CrudRepository<Customer, Long> {
}