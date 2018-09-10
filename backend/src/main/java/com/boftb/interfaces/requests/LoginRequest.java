package com.boftb.interfaces.requests;

import lombok.Value;

@Value
public class LoginRequest {

  String userName, password;
}
