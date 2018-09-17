package com.boftb.controllers;

import java.util.Optional;

import com.boftb.interfaces.projections.CheckUserNameProjection;
import com.boftb.interfaces.projections.LoginProjection;
import com.boftb.interfaces.projections.ManagedSeriesProjection;
import com.boftb.interfaces.requests.LoginRequest;
import com.boftb.interfaces.requests.RegisterRequest;
import com.boftb.interfaces.responses.MixedResponse;
import com.boftb.interfaces.responses.MultipleDataResponse;
import com.boftb.interfaces.responses.StatusResponse;
import com.boftb.models.User;
import com.boftb.repositories.CompletedSeriesRepository;
import com.boftb.repositories.OngoingSeriesRepository;
import com.boftb.repositories.PendingSeriesRepository;
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
  private OngoingSeriesRepository ongoingSeriesRepository;
  private PendingSeriesRepository pendingSeriesRepository;
  private CompletedSeriesRepository completedSeriesRepository;

  public UserController(UserRepository userRepository,
                        OngoingSeriesRepository ongoingSeriesRepository,
                        PendingSeriesRepository pendingSeriesRepository,
                        CompletedSeriesRepository completedSeriesRepository) {
    this.userRepository = userRepository;
    this.ongoingSeriesRepository = ongoingSeriesRepository;
    this.pendingSeriesRepository = pendingSeriesRepository;
    this.completedSeriesRepository = completedSeriesRepository;
  }
  
  @CrossOrigin(origins = "https://polaflix.boftb.com")
  @PostMapping("/user/login")
  public MixedResponse<Long> login(@RequestBody LoginRequest loginRequest) {
    Long id;
    int statusCode;

    // Get login projection by userName
    Optional<LoginProjection> opt =
      this.userRepository.findByUserName(loginRequest.getUserName(), LoginProjection.class);
    if(opt.isPresent()) {
      // User exists
      LoginProjection loginProjRetrieved = opt.get();
      if(loginProjRetrieved.getPassword().equals(loginRequest.getPassword())) {
        // Password correct, user authenticated
        id = loginProjRetrieved.getId();
        statusCode = 0;
      } else {
        // Password incorrect
        id = null;
        statusCode = 1;
      }
    } else {
      // User does not exist
      id = null;
      statusCode = 2;
    }

    // Return the StatusResponse
    return new MixedResponse<Long>(id, statusCode);
  }

  @CrossOrigin(origins = "https://polaflix.boftb.com")
  @GetMapping("user/check/username/{userName}")
  public StatusResponse checkUserName(@PathVariable String userName) {
    int statusCode;

    if(this.userRepository.findByUserName(userName, CheckUserNameProjection.class).isPresent()) {
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
  public MixedResponse<Long> register(@RequestBody RegisterRequest registerRequest) {
    Long id;
    int statusCode;

    // Store the user in the database
    User user = new User(registerRequest.getUserName(),
                         registerRequest.getFirstName(),
                         registerRequest.getLastName(),
                         registerRequest.getPassword());
    User savedUser = this.userRepository.save(user);
    id = savedUser.getId();
    statusCode = 0;

    return new MixedResponse<Long>(id, statusCode);
  }

  @CrossOrigin(origins = "https://polaflix.boftb.com")
  @GetMapping("user/ongoing/{userId}")
  public MultipleDataResponse<ManagedSeriesProjection> getOngoingSeries(@PathVariable Long userId) {
    // Get the ongoing series from the specified user
    return new MultipleDataResponse<ManagedSeriesProjection>(this.ongoingSeriesRepository
      .findByUserSeriesIdUserId(userId, ManagedSeriesProjection.class));
  }

  @CrossOrigin(origins = "https://polaflix.boftb.com")
  @GetMapping("user/pending/{userId}")
  public MultipleDataResponse<ManagedSeriesProjection> getPendingSeries(@PathVariable Long userId) {
    // Get the pending series from the specified user
    return new MultipleDataResponse<ManagedSeriesProjection>(this.pendingSeriesRepository
      .findByUserSeriesIdUserId(userId, ManagedSeriesProjection.class));
  }

  @CrossOrigin(origins = "https://polaflix.boftb.com")
  @GetMapping("user/completed/{userId}")
  public MultipleDataResponse<ManagedSeriesProjection> getCompletedSeries(@PathVariable Long userId) {
    // Get the pending series from the specified user
    return new MultipleDataResponse<ManagedSeriesProjection>(this.completedSeriesRepository
      .findByUserSeriesIdUserId(userId, ManagedSeriesProjection.class));
  }
}
