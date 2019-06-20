import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { NavListComponent } from './layouts/nav-list/nav-list.component';
import { NavViewComponent } from './layouts/nav-view/nav-view.component';
import { CardOverComponent } from './layouts/card-over/card-over.component';

const routes: Routes = [
  { path: 'patterns/creation-flow', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [{ path: '', component: OverviewComponent }],
  },
  {
    path: 'layouts',
    component: MainComponent,
    children: [{ path: 'nav-list', component: NavListComponent }, 
               { path: 'nav-view', component: NavViewComponent }, 
               { path: 'card-over', component: CardOverComponent }],
  },
];

export const appRoutes: any = RouterModule.forRoot(routes);
