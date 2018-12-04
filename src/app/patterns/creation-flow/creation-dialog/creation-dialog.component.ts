import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';

@Component({
  selector: 'dialog-content-example',
  templateUrl: 'creation-dialog.component.html',
  styleUrls: ['creation-dialog.component.scss'],
})
export class CreationDialogComponent {
  constructor(private _titleService: Title,
    public media: TdMediaService,
    public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'creation-dialog-content',
  templateUrl: 'creation-dialog-content.html',
})
export class DialogContentExampleDialog {}