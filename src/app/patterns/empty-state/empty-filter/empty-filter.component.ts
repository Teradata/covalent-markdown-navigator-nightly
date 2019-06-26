import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TdMediaService } from '@covalent/core/media';
import { baseURL } from '../../../../data';

@Component({
  selector: 'qs-empty-filter',
  templateUrl: './empty-filter.component.html',
  styleUrls: ['./empty-filter.component.scss'],
})
export class EmptyFilterComponent implements OnInit {

  constructor(private _titleService: Title,
              public media: TdMediaService) {
    Object.assign(this, { baseURL });
  }

  ngOnInit(): void {
    this._titleService.setTitle('Empty State');
  }
}
