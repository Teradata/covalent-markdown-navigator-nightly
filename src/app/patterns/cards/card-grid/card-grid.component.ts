import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

// import { UserService, IUser } from './services/user.service';


@Component({
  selector: 'qs-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss'],
})
export class CardGridComponent implements OnInit {

 cards = [
  {
    color: 'pink-800',
    icon: 'zoom_in',
    route: '/',
    title: 'Discover Data',
    description: 'Discover type and location of data',
  }, {
    color: 'purple-800',
    icon: 'lock_open',
    route: '/',
    title: 'Access Data',
    description: 'Connect and ingest data',
  }, {
    color: 'deep-purple-800',
    icon: 'crop_rotate',
    route: '/',
    title: 'Prepare Data',
    description: 'Clean, validate and profile data',
  }, {
    color: 'indigo-800',
    icon: 'widgets',
    route: '/',
    title: 'Enrich Data',
    description: 'Combine and enhance existing data',
  }, {
    color: 'blue-800',
    icon: 'group',
    route: '/',
    title: 'Socialize Results',
    description: 'Present results for colleague affirmation',
  }, {
    color: 'light-blue-800',
    icon: 'backup',
    route: '/',
    title: 'Deploy Models',
    description: 'Deliver models in production',
  }, {
    color: 'cyan-800',
    icon: 'show_chart',
    route: '/',
    title: 'Monitor Models',
    description: 'Monitor production and challenger models',
  }, {
    color: 'teal-800',
    icon: 'wrap_text',
    route: '/',
    title: 'Analytics Workflow',
    description: 'Coordinate analytic process flow phases',
  }
  ];

  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _changeDetectorRef: ChangeDetectorRef,
              public media: TdMediaService) {
  }

  ngOnInit(): void {
    this._titleService.setTitle('Cards');
  }
}
