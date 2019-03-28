import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdMediaService } from '@covalent/core/media';

import { baseURL } from '../../../data';

@Component({
  selector: 'qs-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  constructor(private _titleService: Title, public media: TdMediaService) {
    Object.assign(this, { baseURL });
  }

  ngOnInit(): void {
    this._titleService.setTitle('Breadcrumbs');
  }
}
