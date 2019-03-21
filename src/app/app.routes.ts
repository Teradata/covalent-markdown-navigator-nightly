import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { EmptyStateComponent } from './patterns/empty-state/empty-state.component';
import { EmptyFilterComponent } from './patterns/empty-state/empty-filter/empty-filter.component';
import { EmptyContentComponent } from './patterns/empty-state/empty-content/empty-content.component';

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
        path: 'empty-state',
        children: [
          { path: '', component: EmptyStateComponent },
          { path: 'filter', component: EmptyFilterComponent },
          { path: 'no-content', component: EmptyContentComponent },
        ],
      },
    ],
  },
];

export const appRoutes: any = RouterModule.forRoot(routes);
