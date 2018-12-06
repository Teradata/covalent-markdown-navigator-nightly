import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { baseURL } from '../../../data';

@Component({
  selector: 'qs-nav-view',
  templateUrl: './nav-view.component.html',
  styleUrls: ['./nav-view.component.scss'],
})
export class NavViewComponent implements OnInit {

  productList: Object[] = [
    {
      title: 'AppCenter',
      icon: 'app_center',
      health: 'RUNNING',
      status: 'teal-700',
      color: 'primary',
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

  constructor(private _titleService: Title) {}

  ngOnInit(): void {
    this._titleService.setTitle( 'Teradata Covalent - Sandbox' );
    Object.assign(this, { baseURL })
  }
}
