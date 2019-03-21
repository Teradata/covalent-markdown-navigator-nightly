import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { BreadcrumbsComponent } from './patterns/breadcrumbs/breadcrumbs.component';

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
    children: [{ path: 'breadcrumbs', component: BreadcrumbsComponent }],
  },
];

export const appRoutes: any = RouterModule.forRoot(routes);
