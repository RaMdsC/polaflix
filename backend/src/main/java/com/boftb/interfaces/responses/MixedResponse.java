package com.boftb.interfaces.responses;

import lombok.Value;

@Value
public class MixedResponse<T> {

  T data;
  int statusCode;
}
