import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdDialogService } from '@covalent/core';
import { TdMediaService } from '@covalent/core/media';
import { baseURL } from '../../../../data';

@Component({
  selector: 'qs-contextual-docs',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})

export class DialogComponent implements OnInit {

  constructor(private _titleService: Title,
    private _dialogService: TdDialogService,
    public media: TdMediaService) {
      Object.assign(this, { baseURL })
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

  ngOnInit(): void {
    this._titleService.setTitle('Contextual Docs - Dialog');
  }
}
