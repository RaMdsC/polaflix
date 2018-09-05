package com.boftb.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {
  
  @Id
  @Column(name = "user_name")
  private String userName;
  
  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  // This is ugly...
  @Column(name = "password")
  private String password;

  public User() {
    
  }

  public User(String userName, String firstName, String lastName, String password) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }

  public String getUserName() {
    return this.userName;
  }

  public String getPassword() {
    return this.password;
  }
}
