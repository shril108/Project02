package com.webage.Project02;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerApi {

Customer[] customers =new Customer[3];

public CustomerApi(){
customers[0]= new Customer(0, "Kenan", "kenan@gmail.com", "Kenan1");
customers[1]= new Customer(1, "Ryan", "Ryan@gmail.com", "Ryan1");
customers[2]= new Customer(2, "Shril", "Shril@gmail.com", "Shril1");
}

@GetMapping
public String getAllCustomers(){

    return toJson(customers);

}

@GetMapping("/{id}")
public String getCustomerByID(@PathVariable int id){

    Customer[] temp = new Customer[1];
    temp[0] = customers[id];
    String json = toJson(temp);
    return json.substring(1, json.length() - 1);

}

public String toJson(Customer[] customerArray){

    String json = "[";

    for(int index = 0; index < customerArray.length; index++){
        json += "{\"id\": \"" + customerArray[index].id + "\",";
        json += "\"name\": \"" + customerArray[index].name + "\",";
        json += "\"email\": \"" + customerArray[index].email + "\",";
        json += "\"password\": \"" + customerArray[index].password + "\"}";

        if(index < customerArray.length - 1){
            json+= ",";  
        }
    }
        json += "]";
        return json;

}

}



    



    
    

