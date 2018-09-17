import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'pol-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.scss']
})
export class UserSpaceComponent implements OnInit {

  constructor(public dataService: DataService,
              private contentService: ContentService) {

  }

  ngOnInit(): void {
    // Load the user series data
    this.contentService.loadUserSeries();
  }
}
