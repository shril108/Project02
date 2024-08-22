package com.webage.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import com.fasterxml.jackson.databind.ObjectMapper;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webage.Objects.Customer;
import com.webage.Objects.Token;
import com.webage.repository.CustomersRepository;
import com.webage.JWTMaker;


@RestController
@RequestMapping("/token")
public class AuthController {

   public static Token appUserToken;

	@Autowired
	CustomersRepository repo;
	
	@PostMapping
	public ResponseEntity<?> createTokenForCustomer(@RequestBody Customer customer) {
		
		String username = customer.getEmail();
		String password = customer.getPassword();      

        String res = "";
        res = getCustomerByNameFromCustomerAPI(username);
		if (username != null && username.length() > 0 && password != null && password.length() > 0 && checkPassword(username, password)) {
			Token token = createToken(username);
			ResponseEntity<?> response = ResponseEntity.ok(token);
			appUserToken = token;
			return response;			
		}
		// bad request
        
		return (ResponseEntity<?>) ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		
	}
	
	private boolean checkPassword(String username, String password) {
		// special case for application user
		if(username.equals("ApiClientApp") && password.equals("secret")) {
			return true;
		}
		// make call to customer service 
		String temp = getCustomerByNameFromCustomerAPI(username);
		System.out.println(temp);
        ObjectMapper objectMapper = new ObjectMapper();
        Customer cust = null;

        try{
            cust = objectMapper.readValue(temp, Customer.class);
        } catch (Exception e){
            e.printStackTrace();
        }
        

		
		// compare name and password
		if(cust != null && cust.getName().equals(username) && cust.getPassword().equals(password)) {
			return true;				
		}		
		return false;
		
		

	}
	
	public static Token getAppUserToken() {
		if(appUserToken == null || appUserToken.getToken() == null || appUserToken.getToken().length() == 0) {
			appUserToken = createToken("ApiClientApp");
		}
		return appUserToken;
	}
	
    private static Token createToken(String username) {
    	String scopes = "com.webage.data.apis";
    	// special case for application user
    	if( username.equalsIgnoreCase("ApiClientApp")) {
    		scopes = "com.webage.auth.apis";
    	}
    	String token_string = JWTMaker.createToken(scopes);
    	
    	
    	return new Token(token_string);
    }
    
    
	private String getCustomerByNameFromCustomerAPI(String username) {
		try {

			URL url = new URL("http://localhost:8080/api/customers/findbyemail/" + username);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Accept", "application/json");
			Token token = getAppUserToken();
			conn.setRequestProperty("authorization", "Bearer " + token.getToken());

			if (conn.getResponseCode() != 200) {
				return null;
			} else {
				BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
				String output = "";
				String out = "";
				while ((out = br.readLine()) != null) {
					output += out;
				}
				output = "{"+output.substring(8);
				conn.disconnect();
				return output;
			}

		} catch (MalformedURLException e) {
			e.printStackTrace();
			return null;

		} catch (java.io.IOException e) {
			e.printStackTrace();
			return null;
		}

	}  	



}



