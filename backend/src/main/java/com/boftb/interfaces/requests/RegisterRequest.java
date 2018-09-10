package com.boftb.interfaces.requests;

import lombok.Value;

@Value
public class RegisterRequest {

  String userName, firstName, lastName, password;
}
