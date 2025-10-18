package com.uade.tpo.demo.controllers.user;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uade.tpo.demo.controllers.product.ProductUpdateRequest;
import com.uade.tpo.demo.entity.Product;
import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.exceptions.ProductNotExistsException;
import com.uade.tpo.demo.exceptions.UserNotExistsException;
import com.uade.tpo.demo.service.User.UserService;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired 
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<Page<User>> getUsers(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        if (page == null || size == null)
            return ResponseEntity.ok(userService.getUsers(PageRequest.of(0, Integer.MAX_VALUE)));
        return ResponseEntity.ok(userService.getUsers(PageRequest.of(page, size)));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
        Optional<User> result = userService.getUserById(userId);
        if (result.isPresent()){
            User user = result.get();
            UserDTO dto = new UserDTO();
            dto.setEmail(user.getEmail());
            dto.setFirstname(user.getFirstName());
            dto.setLastname(user.getLastName());
            dto.setRole(user.getRole());
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long userId,@RequestBody UserUpdateRequest userUpdateRequest) throws UserNotExistsException {
        User updated = userService.updateUser(userId, userUpdateRequest);
        UserDTO dto = new UserDTO();
        dto.setEmail(updated.getEmail());
        dto.setFirstname(updated.getFirstName());
        dto.setLastname(updated.getLastName());
        dto.setRole(updated.getRole());
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{userId}/un_block") // block solo cambia el rol a Bloqueado o lo devuelve a su estado
    public ResponseEntity<UserDTO> un_blockUser(@PathVariable Long userId,@RequestBody UserBlockRequest userBlockRequest) throws UserNotExistsException {
        User updated = userService.un_blockUser(userId, userBlockRequest);
        UserDTO dto = new UserDTO();
        dto.setEmail(updated.getEmail());
        dto.setFirstname(updated.getFirstName());
        dto.setLastname(updated.getLastName());
        dto.setRole(updated.getRole());
        return ResponseEntity.ok(dto);
    }
}
