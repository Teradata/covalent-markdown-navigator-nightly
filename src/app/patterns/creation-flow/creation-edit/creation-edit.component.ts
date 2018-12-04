import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';

@Component({
  selector: 'qs-creation-edit',
  templateUrl: './creation-edit.component.html',
  styleUrls: ['./creation-edit.component.scss'],
})
export class CreationEditComponent implements OnInit {

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
  linksSummary: boolean = false;
  @ViewChild('twitter') twitter: String;
  @ViewChild('linkedin') linkedin: String;
  @ViewChild('facebook') facebook: String;


  blockSave: boolean = true;
  state1: StepState = "none";
  state2: StepState = "none";
  state3: StepState = "none";
  @ViewChild('form1') _form1: NgForm;
  @ViewChild('form2') _form2: NgForm;
  @ViewChild('form3') _form3: NgForm;

  states: array = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'];

  update(step, isValid): void {
    switch(step) {
      case 1:
        if(isValid) {
          this.state1 = 'complete';
        } else {
          this.state1 = 'required';
        }
        break;
      case 2:
        if(isValid) {
          this.state2 = 'complete';
        } else {
          this.state2 = 'required';
        }
        break;
      case 3:
        if(isValid) {
          this.state3 = 'complete';
          this.blockSave = false;
        } else {
          this.state3 = 'required';
        }
        if(this.twitter.nativeElement.value != "" || this.linkedin.nativeElement.value != "" ) {
          this.linksSummary = true;
        }
    } 
  } 
}