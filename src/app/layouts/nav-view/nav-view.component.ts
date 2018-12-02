import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { TdDigitsPipe } from '@covalent/core/common';
import { TdLoadingService } from '@covalent/core/loading';

import { UserService, IUser } from '../../users';

import { ItemsService, ProductsService, AlertsService } from '../../../services';

import { multi } from './data';

@Component({
  selector: 'qs-nav-view',
  templateUrl: './nav-view.component.html',
  styleUrls: ['./nav-view.component.scss'],
  viewProviders: [ ItemsService, ProductsService, AlertsService ],
})
export class NavViewComponent implements OnInit {


  systems: ISystem[];
  systemType: ECSSystemType | string = '';

  // Chart
  axisTime: Function;
  datePipe: DatePipe;
  single: any[];
  multi: any[];
  services: any[];

  // Generic Chart options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  autoScale: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  productList: Object[] = [
    {
      title: 'AppCenter',
      icon: 'app_center',
      health: 'RUNNING',
      status: 'teal-700',
      color: 'primary',
      url: 'https://appcenter.appcenter.ps.ac.uda.io/',
    },
    {
      title: 'Data Labs',
      icon: 'data-labs',
      health: 'AVAILABLE',
      status: 'orange-700',
      color: 'accent',
    },
    {
      title: 'Listener',
      icon: 'ingest',
      health: 'AVAILABLE',
      status: 'orange-700',
      color: 'accent',
    },
    {
      title: 'QueryGrid',
      icon: 'querygrid',
      health: 'AVAILABLE',
      status: 'orange-700',
      color: 'primary',
    },
    {
      title: 'Unity',
      icon: 'unity',
      health: 'AVAILABLE',
      status: 'orange-700',
      color: 'warn',
    },
    {
      title: 'Viewpoint',
      icon: 'viewpoint',
      health: 'RUNNING',
      status: 'teal-700',
      color: 'primary',
    },
    {
      title: 'Workload Analytics',
      icon: 'workload-analytics',
      health: 'RUNNING',
      status: 'teal-700',
      color: 'primary',
    },
  ];

  serviceList: Object[] = [
    {
      title: 'Audit Service',
      icon: 'verified_user',
      health: 'HEALTHY',
      status: 'teal-700',
    },
    {
      title: 'Authentication Service',
      icon: 'phonelink_lock',
      health: 'HEALTHY',
      status: 'teal-700',
    },
    {
      title: 'Dictionary Service',
      icon: 'data_usage',
      health: 'AVAILABLE',
      status: 'orange-700',
    },
    {
      title: 'Notifications Service',
      icon: 'email',
      health: 'HEALTHY',
      status: 'teal-700',
    },
    {
      title: 'Query Service',
      icon: 'desktop_windows',
      health: 'HEALTHY',
      status: 'teal-700',
    },
    {
      title: 'System Management',
      icon: 'dns',
      health: 'HEALTHY',
      status: 'teal-700',
    },
    {
      title: 'User Management',
      icon: 'people',
      health: 'HEALTHY',
      status: 'teal-700',
    },
  ];

  constructor(private _titleService: Title,
              private _itemsService: ItemsService,
              private _userService: UserService,
              private _alertsService: AlertsService,
              private _productsService: ProductsService,
              private _loadingService: TdLoadingService) {
                // Chart
                this.multi = multi.map((group: any) => {
                  group.series = group.series.map((dataItem: any) => {
                    dataItem.name = new Date(dataItem.name);
                    return dataItem;
                  });
                  return group;
                });
  }

  ngOnInit(): void {
    this._titleService.setTitle( 'Terdata Covalent - Sandbox' );
    this._loadingService.register('items.load');
    this._itemsService.query().subscribe((items: Object[]) => {
      this.items = items;
      setTimeout(() => {
        this._loadingService.resolve('items.load');
      }, 750);
    }, (error: Error) => {
      this._itemsService.staticQuery().subscribe((items: Object[]) => {
        this.items = items;
        setTimeout(() => {
          this._loadingService.resolve('items.load');
        }, 750);
      });
    });
    this._loadingService.register('alerts.load');
    this._alertsService.query().subscribe((alerts: Object[]) => {
      this.alerts = alerts;
      setTimeout(() => {
        this._loadingService.resolve('alerts.load');
      }, 750);
    });
    this._loadingService.register('products.load');
    this._productsService.query().subscribe((products: Object[]) => {
      this.products = products;
      setTimeout(() => {
        this._loadingService.resolve('products.load');
      }, 750);
    });
    this._loadingService.register('favorites.load');
    this._productsService.query().subscribe((products: Object[]) => {
      this.products = products;
      setTimeout(() => {
        this._loadingService.resolve('favorites.load');
      }, 750);
    });
    this._loadingService.register('users.load');
    this._userService.query().subscribe((users: IUser[]) => {
      this.users = users;
      setTimeout(() => {
        this._loadingService.resolve('users.load');
      }, 750);
    }, (error: Error) => {
      this._userService.staticQuery().subscribe((users: IUser[]) => {
        this.users = users;
        setTimeout(() => {
          this._loadingService.resolve('users.load');
        }, 750);
      });
    });
  }

  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }

  toggleDescription(): void {
    this.showDescription = !this.showDescription;
  }
}
