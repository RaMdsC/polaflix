import { ManagedSeries } from 'src/app/models/managed-series.model';

export class OngoingSeries extends ManagedSeries {

  dateStarted: Date;

  constructor(id: number, name: string, dateStarted: Date) {
    super(id, name);
    this.dateStarted = dateStarted;
  }

  static newInstance(id: number, name: string): OngoingSeries {
    return new OngoingSeries(id, name, null);
  }
}
