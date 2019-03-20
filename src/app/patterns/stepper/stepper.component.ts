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
  state1: String = 'none';
  state2: String = 'none';
  state3: String = 'none';
  blockSave: boolean = true;
  
  constructor(private _titleService: Title,
              public media: TdMediaService) {
    Object.assign(this, { baseURL });
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
      },
    };
  }

  update(step, isValid): void {
    switch (step) {
      case 1:
        if (isValid) {
          this.state1 = 'complete';
        } else {
          this.state1 = 'required';
        }
        break;
      case 2:
        if (isValid) {
          this.state2 = 'complete';
        } else {
          this.state2 = 'required';
        }
        break;
      case 3:
        if (isValid) {
          this.state3 = 'complete';
          this.blockSave = false;
        } else {
          this.state3 = 'required';
        }
    }
  } 
}