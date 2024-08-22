package com.webage.api;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import com.webage.Customers.Customer;
import com.webage.repository.CustomersRepository;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginAPI {
    @Autowired
    CustomersRepository repo;

    @PostMapping("/token")
	public ResponseEntity<?> login(@RequestBody Customer loginCustomer) {
		Optional<Customer> existingCustomer = repo.findByEmail(loginCustomer.getEmail());
		if (existingCustomer.isPresent()) {
			Customer customer = existingCustomer.get();
			if (customer.getPassword().equals(loginCustomer.getPassword())) {
				String response = "{\"text\":\"" + customer.getName() + "\"}";
				return ResponseEntity.ok().body(response);
			}
		}
		return ResponseEntity.ok().body("{\"text\": \"Invalid email or password\"}");
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody Customer newCustomer, UriComponentsBuilder uri) {
		if (newCustomer.getId() != 0 || newCustomer.getName() == null || newCustomer.getEmail() == null) {
			// Reject we'll assign the customer id
			return ResponseEntity.badRequest().build();
		}
		if (repo.findByEmail(newCustomer.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
		newCustomer = repo.save(newCustomer);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newCustomer.getId()).toUri();
		ResponseEntity<?> response = ResponseEntity.created(location).build();
		return response;
	}
}
