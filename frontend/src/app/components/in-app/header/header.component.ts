import { Component } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'pol-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public dataService: DataService,
              private authService: AuthService) {

  }

  handleLogout() {
    this.authService.logout();
  }
}
