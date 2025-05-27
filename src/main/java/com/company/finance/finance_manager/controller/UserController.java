package com.company.finance.finance_manager.controller;

import com.company.finance.finance_manager.dto.UserDTO;
import com.company.finance.finance_manager.dto.UserPageDataDTO;
import com.company.finance.finance_manager.entity.ERole;
import com.company.finance.finance_manager.entity.Role;
import com.company.finance.finance_manager.entity.User;
import com.company.finance.finance_manager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        User user = userService.getUserById(id);

        // Convert roles to a set of role names
        Set<ERole> roleNames = user.getRoles()
                .stream()
                .map(Role::getName) // Assuming getName() returns something like "ROLE_USER"
                .collect(Collectors.toSet());


        UserPageDataDTO userPageDataDTO = new UserPageDataDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getUsername(),
                roleNames
        );

        return ResponseEntity.ok(userPageDataDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserPageDataDTO> updateUser(@PathVariable Integer id, @RequestBody UserDTO updateDto) {
        User user = userService.updateUser(id, updateDto);

        // Convert roles to a set of role names
        Set<ERole> roleNames = user.getRoles()
                .stream()
                .map(Role::getName) // Assuming getName() returns something like "ROLE_USER"
                .collect(Collectors.toSet());

        UserPageDataDTO userPageDataDTO = new UserPageDataDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getUsername(),
                roleNames
        );

        return ResponseEntity.ok(userPageDataDTO);
    }

}
