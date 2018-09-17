package com.boftb.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "OngoingSeries")
@Table(name = "ongoing_series")
public class OngoingSeries extends ManagedSeries {

  @Temporal(TemporalType.DATE)
  @Column(name = "date_started")
  private Date dateStarted;
}
