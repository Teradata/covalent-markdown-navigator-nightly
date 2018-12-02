import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

// import { UserService, IUser } from './services/user.service';

@Component({
  selector: 'qs-contextual-docs',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {

  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Contextual Docs - Dialog');
  }
}