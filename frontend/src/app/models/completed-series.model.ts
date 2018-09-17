import { ManagedSeries } from 'src/app/models/managed-series.model';

export class CompletedSeries extends ManagedSeries {

  dateCompleted: Date;

  constructor(id: number, name: string, dateCompleted: Date) {
    super(id, name);
    this.dateCompleted = dateCompleted;
  }

  static newInstance(id: number, name: string): CompletedSeries {
    return new CompletedSeries(id, name, null);
  }
}
