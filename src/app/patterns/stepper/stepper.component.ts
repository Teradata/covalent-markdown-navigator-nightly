import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';
import { baseURL } from '../../../data';

@Component({
  selector: 'qs-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  user; 
  
  constructor(private _titleService: Title,
              public media: TdMediaService) {
    Object.assign(this, { baseURL })
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