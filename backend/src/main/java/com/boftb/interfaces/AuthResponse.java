package com.boftb.interfaces;

public class AuthResponse {

  private int status;
  private String message;
  
  public AuthResponse(int status, String message) {
    this.status = status;
    this.message = message;
  }

  public int getStatus() {
    return this.status;
  }

  public String getMessage() {
    return this.message;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
  