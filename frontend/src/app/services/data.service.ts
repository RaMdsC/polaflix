import { Injectable } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { Series } from 'src/app/models/series.model';
import { ManagedSeries } from 'src/app/models/managed-series.model';

@Injectable({ providedIn: 'root' })
export class DataService {

  loggedInUser: User;
  seriesCollection: Map<number, Series[]>;

  constructor() {
    this.loggedInUser = new User();
  }

  getId(): number {
    return this.loggedInUser.id;
  }

  getUserName(): string {
    return this.loggedInUser.userName;
  }

  getPassword(): string {
    return this.loggedInUser.password;
  }

  getOngoingSeries(): ManagedSeries[] {
    return this.loggedInUser.ongoingSeries;
  }

  getPendingSeries(): ManagedSeries[] {
    return this.loggedInUser.pendingSeries;
  }

  getCompletedSeries(): ManagedSeries[] {
    return this.loggedInUser.completedSeries;
  }

  setId(id: number): void {
    this.loggedInUser.id = id;
  }

  setUserName(userName: string): void {
    this.loggedInUser.userName = userName;
  }

  setPassword(password: string): void {
    this.loggedInUser.password = password;
  }

  setOngoingSeries(ongoingSeries: ManagedSeries[]): void {
    this.loggedInUser.ongoingSeries = ongoingSeries;
  }

  setPendingSeries(pendingSeries: ManagedSeries[]): void {
    this.loggedInUser.pendingSeries = pendingSeries;
  }

  setCompletedSeries(completedSeries: ManagedSeries[]): void {
    this.loggedInUser.completedSeries = completedSeries;
  }

  clear(): void {
    this.loggedInUser = null;
  }
}
