import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { AlertsComponent } from './patterns/alerts/alerts.component';
import { AlertsInlineComponent } from './patterns/alerts/alerts-inline/alerts-inline.component';
import { AlertsToastsComponent } from './patterns/alerts/alerts-toasts/alerts-toasts.component';

const routes: Routes = [
  { path: 'layouts/nav-view', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [{ path: '', component: OverviewComponent }],
  },
  {
    path: 'patterns',
    component: MainComponent,
    children: [
      {
        path: 'alerts',
        children: [
          { path: '', component: AlertsComponent },
          { path: 'inline', component: AlertsInlineComponent },
          { path: 'toasts', component: AlertsToastsComponent },
        ],
      },
    ],
  },
];

export const appRoutes: any = RouterModule.forRoot(routes);
