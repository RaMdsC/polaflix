package com.boftb.controllers;

import java.util.Optional;

import com.boftb.interfaces.requests.CheckUserNameRequest;
import com.boftb.interfaces.requests.LoginRequest;
import com.boftb.interfaces.requests.RegisterRequest;
import com.boftb.interfaces.responses.StatusResponse;
import com.boftb.models.User;
import com.boftb.repositories.UserRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  private UserRepository userRepository;

  public UserController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
  
  @CrossOrigin(origins = "https://polaflix.boftb.com")
  @PostMapping("/user/login")
  public StatusResponse login(@RequestBody LoginRequest loginRequest) {
    int statusCode;

    // Get login request by userName (Id)
    Optional<LoginRequest> opt =
      this.userRepository.findByUserName(loginRequest.getUserName(), LoginRequest.class);
    if(opt.isPresent()) {
      // User exists
      LoginRequest loginRequestRetrieved = opt.get();
      if(loginRequestRetrieved.getPassword().equals(loginRequest.getPassword())) {
        // Password correct, user authenticated
        statusCode = 0;
      } else {
        // Password incorrect
        statusCode = 1;
      }
    } else {
      // User does not exist
      statusCode = 2;
    }

    // Return the StatusResponse
    return new StatusResponse(statusCode);
  }

  @CrossOrigin(origins = "https://polaflix.boftb.com")
  @GetMapping("user/check/username/{userName}")
  public StatusResponse checkUserName(@PathVariable String userName) {
    int statusCode;

    if(this.userRepository.findByUserName(userName, CheckUserNameRequest.class).isPresent()) {
      // User exists
      statusCode = 0;
    } else {
      // User does not exist
      statusCode = 1;
    }

    return new StatusResponse(statusCode);
  }

  @CrossOrigin(origins = "https://polaflix.boftb.com")
  @PostMapping("user/register")
  public StatusResponse register(@RequestBody RegisterRequest registerRequest) {
    int statusCode;

    // Store the user in the database
    User user = new User(registerRequest.getUserName(),
                         registerRequest.getFirstName(),
                         registerRequest.getLastName(),
                         registerRequest.getPassword());
    this.userRepository.save(user);
    statusCode = 0;

    return new StatusResponse(statusCode);
  }
}
