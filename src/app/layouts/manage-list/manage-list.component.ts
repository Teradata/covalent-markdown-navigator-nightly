import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

// import { UserService, IUser } from './services/user.service';

@Component({
  selector: 'qs-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss'],
})
export class ManageListComponent implements OnInit {

  filteredUsers: Object = [{
    "displayName": "John Smith",
    "email": "john.smith@mail.com",
    "created": "12/1/12",
    "lastAccess": "1/1/18"
  }, {
    "displayName": "William Jones",
    "email": "william.jones@mail.com",
    "created": "12/1/12",
    "lastAccess": "1/1/18"
  }, {
    "displayName": "Jane Johnson",
    "email": "jane.johnson@mail.com",
    "created": "12/1/12",
    "lastAccess": "1/1/18"
  }, {
    "displayName": "Sam Sampson",
    "email": "sam.sampson@mail.com",
    "created": "12/1/12",
    "lastAccess": "1/1/18"
  }, {
    "displayName": "Christopher Heart",
    "email": "christopher.heart@mail.com",
    "created": "12/1/12",
    "lastAccess": "1/1/18"
  }];

  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Management List');
  }
}
