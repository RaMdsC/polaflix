package com.boftb.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
