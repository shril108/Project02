package com.webage.Project02;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerAPI {
    ArrayList<Customer> customerList = new ArrayList<Customer>();

    public CustomerAPI(){
        Customer c1 = new Customer(1, "Kenan", "pass", "kenan@gmail.com");
		Customer c2 = new Customer(2, "Ryan", "pass", "ryan@gmail.com");
		Customer c3 = new Customer(3, "Shril", "pass", "shril@gmail.com");
		customerList.add(c1);
		customerList.add(c2);
		customerList.add(c3);
    }

    @GetMapping
    public String getCustomers(){
        String response = "[";
        for(int i = 0; i < customerList.size(); i++){
            response += customerList.get(i).toJSON();
            response += ",";
        }
        response += "]";

        return response;
    }    

    @GetMapping("/{id}")
    public String getCustomersByID(@PathVariable long id){
        for(int i = 0; i < customerList.size(); i++){
            Customer customer = customerList.get(i);
            if(customer.getId() == id){
                return customer.toJSON();
            }
        }

        return "Customer not found";
    }   
}
