import { Series } from "src/app/models/series.model";

export class User {

  userName: string;
  password: string;
  name: string;
  surname: string;
  ongoingSeries: Series;
  pendingSeries: Series;
  completedSeries: Series;

  constructor() {

  }
}
