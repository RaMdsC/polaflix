package com.boftb.repositories;

import com.boftb.models.PendingSeries;

import org.springframework.stereotype.Repository;

@Repository
public interface PendingSeriesRepository extends ManagedSeriesRepository<PendingSeries> {

}
