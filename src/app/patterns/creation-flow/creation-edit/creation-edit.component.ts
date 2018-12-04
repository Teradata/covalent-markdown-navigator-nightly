import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';

@Component({
  selector: 'qs-creation-edit',
  templateUrl: './creation-edit.component.html',
  styleUrls: ['./creation-edit.component.scss'],
})
export class CreationEditComponent {
  user; 
  

  constructor(private _titleService: Title,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Creation Flow');

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