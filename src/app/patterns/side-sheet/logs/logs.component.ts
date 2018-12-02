import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

// import { UserService, IUser } from './services/user.service';

@Component({
  selector: 'qs-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {

  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Side Sheet');
  }
}