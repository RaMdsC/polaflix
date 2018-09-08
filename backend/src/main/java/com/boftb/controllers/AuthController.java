package com.boftb.controllers;

import java.util.Optional;

import com.boftb.dtos.AuthDTO;
import com.boftb.interfaces.AuthRequest;
import com.boftb.interfaces.AuthResponse;
import com.boftb.repositories.UserRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

  private UserRepository userRepository;

  public AuthController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
  
  @CrossOrigin(origins = "https://polaflix.boftb.com")
  @PostMapping("/authenticate")
  public AuthResponse authenticate(@RequestBody AuthRequest authRequest) {
    int status;
    String message; 

    // Get auth DTO by userName (Id)
    Optional<AuthDTO> opt =
      this.userRepository.findByUserName(authRequest.getUserName(), AuthDTO.class);
    if(opt.isPresent()) {
      // User exists
      AuthDTO authDto = opt.get();
      if(authDto.getPassword().equals(authRequest.getPassword())) {
        // Password correct
        status = 0;
        message = "Authentication successful";
      } else {
        // Password incorrect
        status = 1;
        message = "Incorrect password";
      }
    } else {
      // User does not exist
      status = 2;
      message = "User name does not exist";
    }

    // Return the AuthResponse
    return new AuthResponse(status, message);
  }
}
