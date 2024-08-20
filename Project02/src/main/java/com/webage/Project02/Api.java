package com.webage.Project02;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Api {


@GetMapping
public String healthCheck(){
    return "API Responsive :)!!!";
}


    
}
