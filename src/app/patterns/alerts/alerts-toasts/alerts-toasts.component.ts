import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';
import { MatSnackBar } from '@angular/material';

import { baseURL } from '../../../../data';

@Component({
  selector: 'qs-alerts-toasts',
  templateUrl: './alerts-toasts.component.html',
  styleUrls: ['./alerts-toasts.component.scss'],
})
export class AlertsToastsComponent implements OnInit {

  constructor(private _titleService: Title,
              private _snackBarService: MatSnackBar,
              public media: TdMediaService) {
    Object.assign(this, { baseURL });
  }

  ngOnInit(): void {
    this._titleService.setTitle('Alerts');
  }
   showSnackBar(): void {
    this._snackBarService
      .open('Connection timed out.  Showing limited messages.', 'RETRY', { duration: 3000 });
  }
}
