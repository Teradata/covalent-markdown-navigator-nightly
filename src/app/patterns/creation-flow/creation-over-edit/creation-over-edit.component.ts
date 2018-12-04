import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';

@Component({
  selector: 'qs-creation-over-edit',
  templateUrl: './creation-over-edit.component.html',
  styleUrls: ['./creation-over-edit.component.scss'],
})
export class CreationOverEditComponent implements OnInit {
  user;

  constructor(private _titleService: Title,
    public media: TdMediaService) {
  }
  
  routes: Object[] = [{
      icon: 'home',
      route: '.',
      title: 'Home',
  }, {
    icon: 'library_books',
    route: '.',
    title: 'Documentation',
  }, {
    icon: 'color_lens',
    route: '.',
    title: 'Style Guide',
  }, {
    icon: 'view_quilt',
    route: '.',
    title: 'Layouts',
  }, {
    icon: 'picture_in_picture',
    route: '.',
    title: 'Components & Addons',
  },
  ];
  usermenu: Object[] = [{
    icon: 'swap_horiz',
    route: '.',
    title: 'Switch account',
  }, {
    icon: 'tune',
    route: '.',
    title: 'Account settings',
  }, {
    icon: 'exit_to_app',
    route: '.',
    title: 'Sign out',
  },
  ];
  cardlist: Object[] = [{
    icon: 'account_box',
    route: '.',
    title: 'John Jameson',
    description: 'Owner',
  }, {
    icon: 'description',
    route: '.',
    title: 'An item description',
    description: 'Description',
  }, {
    icon: 'vpn_key',
    route: '.',
    title: '1141e8e8-8d24-4956-93c2',
    description: 'API Key',
  },
  ];
  carddates: Object[] = [{
      icon: 'access_time',
      route: '.',
      date: '2017-07-07T00:25:49+00:00',
      description: 'Last Updated',
    }, {
      icon: 'today',
      route: '.',
      date: '2017-07-04T00:25:49+00:00',
      description: 'Created',
    },
  ];
  
  ngOnInit(): void {
    this._titleService.setTitle('Card Over');
    
    this.user = {
      name: {
        first: '',
        last: '',
      },
      email: '',
      nickname: '',
      address: {
         street: '',
         street2: '',
         city: '',
         state: '',
         postcode: '',
      }
    };
  }
}
