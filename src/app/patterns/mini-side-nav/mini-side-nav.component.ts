import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { TdMediaService } from '@covalent/core/media';
import { TdLayoutManageListComponent } from '@covalent/core/layout';
import { baseURL } from '../../../data';

import {
  tdCollapseAnimation,
  tdRotateAnimation,
  tdFadeInOutAnimation,
} from '@covalent/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-mini-side-nav',
  templateUrl: './mini-side-nav.component.html',
  styleUrls: ['./mini-side-nav.component.scss'],
  animations: [tdCollapseAnimation, tdRotateAnimation, tdFadeInOutAnimation],
})
export class MiniSideNavComponent implements AfterViewInit {
  @ViewChild('manageList')
  manageList: TdLayoutManageListComponent;

  miniNav: boolean = false;
  _margin: BehaviorSubject<string> = new BehaviorSubject('250');
  dir: 'ltr' | 'rtl';
  marginDirection: string;

  get margin(): Observable<string> {
    return this._margin.asObservable().pipe(share());
  }

  routes: Object[] = [
    {
      description: 'List of all examples including in the documentation',
      icon: 'picture_in_picture',
      route: '.',
      title: 'Chart Types',
    },
    {
      description: 'Atomic and Config Options',
      icon: 'insert_chart',
      route: 'bar',
      title: 'Bar',
    },
    {
      description: 'Atomic and Config Options',
      icon: 'show_chart',
      route: 'line',
      title: 'Line',
    },
    {
      description: 'Atomic and Config Options',
      icon: 'bubble_chart',
      route: 'scatter',
      title: 'Scatter',
    },
    {
      description: 'Example using line/bar and 2 y-axis',
      icon: 'multiline_chart',
      route: 'combination',
      title: 'Combination',
    },
  ];

  atomicComponentRoutes: Object[] = [
    {
      description:
        'Series component, determines chart type and series styling.',
      icon: 'style',
      route: '',
      title: 'Series',
    },
    {
      description:
        'Global tooltip component, enable/disable and other tooltip level options.',
      icon: 'info',
      route: '',
      title: 'Tooltip',
    },
    {
      description: 'X-Axis component, x-axis styling and other options',
      icon: 'trending_flat',
      route: '',
      title: 'X-Axis',
    },
    {
      description: 'Y-Axis component, y-axis styling and other options',
      icon: 'trending_up',
      route: '',
      title: 'Y-Axis',
    },
    {
      description: 'Chart legend options, including position and styling.',
      icon: 'text_fields',
      route: '',
      title: 'Legend',
    },
    {
      description:
        'Series Tooltip, extends from main tooltip settings and provides specific series level control.',
      icon: 'info',
      route: '',
      title: 'Series Tooltip',
    },
  ];

  constructor(public media: TdMediaService) {
    Object.assign(this, { baseURL });
  }

  handleDirEmitter(event: 'ltr' | 'rtl'): void {
    this.dir = event;
    this._margin.subscribe((d: any) => {
      if (this.dir === 'rtl') {
        this.marginDirection = '0';
        this.restMiniNav();
      } else {
        this.marginDirection = undefined;
      }
    });
  }

  toggleMiniNav(event: Event): void {
    event.stopPropagation();
    this.miniNav = !this.miniNav;
    this.checkMiniNav();
  }

  checkMiniNav(): void {
    if (this.miniNav) {
      this._margin.next('64');
    } else {
      this._margin.next('250');
    }
    this.restMiniNav();
  }

  openMiniNav(event: Event): void {
    event.stopPropagation();
    this.miniNav = !this.miniNav;
    this._margin.next('250');
    this.restMiniNav();
  }

  restMiniNav(): void {
    this.manageList.opened = false;
    setTimeout(() => {
      this.manageList.opened = true;
    }, 300);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.handleDirEmitter(this.dir);
      this.media.broadcast();
    });
  }
}
