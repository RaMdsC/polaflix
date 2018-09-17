package com.boftb.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "User")
@Table(name = "users")
public class User {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @NaturalId
  @Column(name = "user_name")
  private String userName;
  
  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "password")
  private String password;

  @OneToMany(
    mappedBy = "userSeriesId.user",
    cascade = CascadeType.ALL,
    orphanRemoval = true)
  private List<ManagedSeries> pendingSeries;

  @OneToMany(
    mappedBy = "userSeriesId.user",
    cascade = CascadeType.ALL,
    orphanRemoval = true)
  private List<ManagedSeries> ongoingSeries;

  @OneToMany(
    mappedBy = "userSeriesId.user",
    cascade = CascadeType.ALL,
    orphanRemoval = true)
  private List<ManagedSeries> completedSeries;

  public User(String userName, String firstName, String lastName, String password) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
