import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "pol-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})
export class NotificationComponent {

  constructor(private dialogRef: MatDialogRef<NotificationComponent>,
              @Inject(MAT_DIALOG_DATA) private data: string) {

  }

  close() {
    this.dialogRef.close();
  }
}
