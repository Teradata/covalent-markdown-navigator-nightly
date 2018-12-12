import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';
import { baseURL } from '../../../data';

@Component({
  selector: 'qs-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss'],
})
export class ManageListComponent implements OnInit {

  filteredUsers: Object = [{
    'displayName': 'John Smith',
    'email': 'john.smith@mail.com',
    'created': '12/1/12',
    'lastAccess': '1/1/18',
  }, {
    'displayName': 'William Jones',
    'email': 'william.jones@mail.com',
    'created': '12/1/12',
    'lastAccess': '1/1/18',
  }, {
    'displayName': 'Jane Johnson',
    'email': 'jane.johnson@mail.com',
    'created': '12/1/12',
    'lastAccess': '1/1/18',
  }, {
    'displayName': 'Sam Sampson',
    'email': 'sam.sampson@mail.com',
    'created': '12/1/12',
    'lastAccess': '1/1/18',
  }, {
    'displayName': 'Christopher Heart',
    'email': 'christopher.heart@mail.com',
    'created': '12/1/12',
    'lastAccess': '1/1/18',
  }];

  constructor(private _titleService: Title,
              public media: TdMediaService) {
    Object.assign(this, { baseURL });
  }

  ngOnInit(): void {
    this._titleService.setTitle('Management List');
  }
}
