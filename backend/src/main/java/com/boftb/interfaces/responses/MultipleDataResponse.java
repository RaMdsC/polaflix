package com.boftb.interfaces.responses;

import java.util.List;

import lombok.Value;

@Value
public class MultipleDataResponse<T> {

  List<T> multipleData;
}
