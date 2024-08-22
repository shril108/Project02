package com.webage.Customers;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="CUSTOMERS")
public class Customer {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    long id;

    @Column(name="CUSTOMER_NAME")
	String name;

    @Column(name="PASSWORD")
	String password;

    @Column(name="EMAIL")
	String email;

    public Customer(){
        super();
    }

	public Customer(String name, String password, String email) {
		super();
		this.name = name;
		this.password = password;
		this.email = email;
	}

    public String toJSON(){
        return "{\"id\":" + this.id + 
        ", \"name\":\"" + this.name + 
        "\", \"password\":\"" + this.password + 
        "\", \"email\":\"" + this.email + "\" }";
    }

    public long getId() {
        return id;
    }



    public void setId(long id) {
        this.id = id;
    }



    public String getName() {
        return name;
    }



    public void setName(String name) {
        this.name = name;
    }



    public String getPassword() {
        return password;
    }



    public void setPassword(String password) {
        this.password = password;
    }



    public String getEmail() {
        return email;
    }



    public void setEmail(String email) {
        this.email = email;
    }

    
    
}
