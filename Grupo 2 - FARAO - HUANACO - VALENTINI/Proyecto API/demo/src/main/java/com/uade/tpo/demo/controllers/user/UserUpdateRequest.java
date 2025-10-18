package com.uade.tpo.demo.controllers.user;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String email;
    private String firstname;
    private String lastname;
    private String password;
}
