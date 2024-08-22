package com.webage.api;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webage.Customers.Customer;
import com.webage.repository.CustomersRepository;

@RestController
@RequestMapping("/account/")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginAPI {
    @Autowired
    CustomersRepository repo;

    @PostMapping("/token")
	public ResponseEntity<?> login(@RequestBody Customer loginCustomer) {
		Optional<Customer> existingCustomer = repo.findByEmail(loginCustomer.getEmail());

		if (existingCustomer.isPresent()) {
			Customer customer = existingCustomer.get();
			if (customer.getPassword().equals(loginCustomer.getPassword())) {
				return ResponseEntity.ok().body("Login successful");
			}
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
	}
    
}
