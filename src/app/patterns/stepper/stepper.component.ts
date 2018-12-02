import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

// import { UserService, IUser } from './services/user.service';

@Component({
  selector: 'qs-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  user; 
  
  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Stepper');
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