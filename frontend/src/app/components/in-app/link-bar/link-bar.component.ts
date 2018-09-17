import { Component } from '@angular/core';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'pol-link-bar',
  templateUrl: './link-bar.component.html',
  styleUrls: ['./link-bar.component.scss']
})
export class LinkBarComponent {

  constructor(public dataService: DataService) {

  }
}
