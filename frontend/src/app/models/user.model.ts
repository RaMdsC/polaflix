import { ManagedSeries } from 'src/app/models/managed-series.model';

export class User {

  id: number;
  userName: string;
  password: string;
  ongoingSeries: ManagedSeries[];
  pendingSeries: ManagedSeries[];
  completedSeries: ManagedSeries[];

  constructor() {
    this.ongoingSeries = [];
    this.pendingSeries = [];
    this.completedSeries = [];
  }
}
