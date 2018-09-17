package com.boftb.repositories;

import java.util.List;

import com.boftb.models.ManagedSeries;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface ManagedSeriesRepository<T extends  ManagedSeries> extends JpaRepository<T, Long> {
  
  public <S> List<S> findByUserSeriesIdUserId(Long userId, Class<S> type);
}
