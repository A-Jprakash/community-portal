package com.mini.project1.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mini.project1.api.request.Login;
import com.mini.project1.entity.Users;
import com.mini.project1.service.UserService;

@RestController
@RequestMapping("/user")
public class UserAPI {
    
    @Autowired
    private UserService userService;

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Users user){
        return userService.register(user);
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<Users> login(@RequestBody Login login){
        return userService.login(login);
    }
}
