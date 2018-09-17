package com.boftb.interfaces.projections;

public interface ManagedSeriesProjection {

  UserSeriesIdProjection getUserSeriesId();

  interface UserSeriesIdProjection {
    SeriesProjection getSeries();

    interface SeriesProjection {
      Long getId();
      String getName();
    }
  }
}
