import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';
import { baseURL } from '../../../../data';

@Component({
  selector: 'creation-dialog-content',
  templateUrl: 'creation-dialog-content.html',
})
export class DialogContentExampleDialogComponent {}

@Component({
  selector: 'dialog-content-example',
  templateUrl: 'creation-dialog.component.html',
  styleUrls: ['creation-dialog.component.scss'],
})
export class CreationDialogComponent {
  constructor(
    private _titleService: Title,
    public media: TdMediaService,
    public dialog: MatDialog,
  ) {
    Object.assign(this, { baseURL });
  }

  openDialog(): void {
    const dialogRef: any = this.dialog.open(
      DialogContentExampleDialogComponent,
      {
        width: '600px',
      },
    );

    dialogRef.afterClosed().subscribe();
  }
}
