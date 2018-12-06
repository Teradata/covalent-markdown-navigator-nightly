import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

import { CovalentBreadcrumbsModule } from '@covalent/core/breadcrumbs';
import { baseURL } from '../../../data';

@Component({
  selector: 'qs-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {

  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService) {
    Object.assign(this, { baseURL })
  }

  ngOnInit(): void {
    this._titleService.setTitle('Breadcrumbs');
  }
}