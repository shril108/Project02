package com.webage.Project02;

public class Customer {

    int id;
    String name; 
    String password; 
    String email;

    public Customer(int id, String name , String email, String password){

        this.id = id; 
        this.name = name;
        this.email = email; 
        this.password = password;
    }
    

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
