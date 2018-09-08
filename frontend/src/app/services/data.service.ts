import { Injectable } from '@angular/core';

import { User } from 'src/app/models/user.model';

@Injectable({ providedIn: 'root' })
export class DataService {

  loggedInUser: User;

  constructor() {
    this.loggedInUser = new User();
  }

  clear() {
    this.loggedInUser = null;
  }
}
