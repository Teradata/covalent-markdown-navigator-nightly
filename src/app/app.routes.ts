import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { ManageListComponent } from './layouts/manage-list/manage-list.component';
import { NavListComponent } from './layouts/nav-list/nav-list.component';
import { NavViewComponent } from './layouts/nav-view/nav-view.component';
import { CardOverComponent } from './layouts/card-over/card-over.component';

import { CreationFlowComponent } from './patterns/creation-flow/creation-flow.component';
import { CreationEditComponent } from './patterns/creation-flow/creation-edit/creation-edit.component';
import { CreationOverComponent } from './patterns/creation-flow/creation-over/creation-over.component';
import { CreationOverEditComponent } from './patterns/creation-flow/creation-over-edit/creation-over-edit.component';
import { CreationDialogComponent } from './patterns/creation-flow/creation-dialog/creation-dialog.component';
import { CreationSidesheetComponent } from './patterns/creation-flow/creation-sidesheet/creation-sidesheet.component';

const routes: Routes = [
  { path: 'layouts/nav-view', redirectTo: '/', pathMatch: 'full' },
  { path: 'patterns/creation-flow', redirectTo: '/', pathMatch: 'full' },
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
        path: 'creation-flow',
        children: [
          { path: '', component: CreationFlowComponent },
          { path: 'edit', component: CreationEditComponent },
          {
            path: 'card-over',
            children: [
              { path: '', component: CreationOverComponent },
              { path: 'edit', component: CreationOverEditComponent },
            ],
          },
          {
            path: 'dialog',
            children: [{ path: '', component: CreationDialogComponent }],
          },
          { path: 'sidesheet', component: CreationSidesheetComponent },
        ],
      },
    ],
  },
  {
    path: 'layouts',
    component: MainComponent,
    children: [
      { path: 'manage-list', component: ManageListComponent },
      { path: 'nav-list', component: NavListComponent },
      { path: 'nav-view', component: NavViewComponent },
      { path: 'card-over', component: CardOverComponent },
    ],
  },
];

export const appRoutes: any = RouterModule.forRoot(routes);
