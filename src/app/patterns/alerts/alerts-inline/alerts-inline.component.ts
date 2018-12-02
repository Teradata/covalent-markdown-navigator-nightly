import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdDialogService } from '@covalent/core';
import { TdMediaService } from '@covalent/core/media';
import { MatSnackBar } from '@angular/material';

// import { UserService, IUser } from './services/user.service';

@Component({
  selector: 'qs-alerts-inline',
  templateUrl: './alerts-inline.component.html',
  styleUrls: ['./alerts-inline.component.scss'],
})
export class AlertsInlineComponent implements OnInit {

  constructor(private _titleService: Title,
              private _snackBarService: MatSnackBar,
              private _dialogService: TdDialogService,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Alerts');
  }
  openAlert(): void {
    this._dialogService.openAlert({
      message: 'You don\'t have the required permissions to view this item! Contact an administrator!',
      title: '401 Permissions Error',
      closeButton: 'Ok',
    });
  }
  openConfirm(): void {
    this._dialogService.openConfirm({
      message: 'Are you sure you want to delete this item? It\'s used on other items.',
      title: 'Confirm',
      cancelButton: 'Cancel',
      acceptButton: 'Delete',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        // DO SOMETHING
      } else {
        // DO SOMETHING ELSE
      }
    });
  }
   showSnackBar(): void {
    this._snackBarService
      .open('Connection timed out.  Showing limited messages.', 'RETRY', { duration: 3000 });
  }
}