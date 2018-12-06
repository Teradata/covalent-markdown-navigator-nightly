import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';
import { baseURL } from '../../../../data';

@Component({
  selector: 'qs-inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.scss'],
})
export class InlineComponent implements OnInit {
  user;

  constructor(private _titleService: Title,
              public media: TdMediaService) {
    Object.assign(this, { baseURL })
  }

  ngOnInit(): void {
    this._titleService.setTitle('Contextual Docs - Inline');
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
      },
    };
  }
}
