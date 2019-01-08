import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [
    { path: '', component: OverviewComponent },
  ],
},
];

export const appRoutes: any = RouterModule.forRoot(routes);
