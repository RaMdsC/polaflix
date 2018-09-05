package com.boftb.repositories;

import java.util.Optional;

import com.boftb.models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
  
  public <T> Optional<T> findByUserName(String userName, Class<T> type);
}
