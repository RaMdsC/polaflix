import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { NotificationComponent } from 'src/app/components/notification/notification.component';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(private dialog: MatDialog) {

  }

  showNotification(message: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    this.dialog.open(NotificationComponent, dialogConfig);
  }
}
