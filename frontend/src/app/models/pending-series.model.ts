import { ManagedSeries } from 'src/app/models/managed-series.model';

export class PendingSeries extends ManagedSeries {

  dateAdded: Date;

  constructor(id: number, name: string, dateAdded: Date) {
    super(id, name);
    this.dateAdded = dateAdded;
  }

  static newInstance(id: number, name: string): PendingSeries {
    return new PendingSeries(id, name, null);
  }
}
