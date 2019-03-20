import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';

import { CreationFlowComponent } from './patterns/creation-flow/creation-flow.component';
import { CreationEditComponent } from './patterns/creation-flow/creation-edit/creation-edit.component';
import { CreationOverComponent } from './patterns/creation-flow/creation-over/creation-over.component';
import { CreationOverEditComponent } from './patterns/creation-flow/creation-over-edit/creation-over-edit.component';
import { CreationDialogComponent } from './patterns/creation-flow/creation-dialog/creation-dialog.component';
import { CreationSidesheetComponent } from './patterns/creation-flow/creation-sidesheet/creation-sidesheet.component';

const routes: Routes = [
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
];

export const appRoutes: any = RouterModule.forRoot(routes);
