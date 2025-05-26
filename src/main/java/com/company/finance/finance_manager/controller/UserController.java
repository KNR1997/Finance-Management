package com.company.finance.finance_manager.controller;

import com.company.finance.finance_manager.dto.UserDTO;
import com.company.finance.finance_manager.entity.User;
import com.company.finance.finance_manager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = userService.getAllUsers();
        return ResponseEntity.ok(userList);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDTO userDTO) {
        User user = userService.createUser(userDTO);
        URI location = URI.create("/users/" + user.getId()); // assuming course has getSlug()
        return ResponseEntity.created(location).body(user);
    }

}
