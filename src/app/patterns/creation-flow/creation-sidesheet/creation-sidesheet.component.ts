import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';
import { baseURL } from '../../../../data';

@Component({
  selector: 'qs-creation-flow',
  templateUrl: './creation-sidesheet.component.html',
  styleUrls: ['./creation-sidesheet.component.scss'],
})
export class CreationSidesheetComponent implements OnInit {

  constructor(private _titleService: Title,
              public media: TdMediaService) {
    Object.assign(this, { baseURL })
  }

  ngOnInit(): void {
    this._titleService.setTitle('Creation Flow');
  }
}