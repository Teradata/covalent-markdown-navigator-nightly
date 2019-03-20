import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { ContextualDocsComponent } from './patterns/contextual-docs/contextual-docs.component';
import { InlineComponent } from './patterns/contextual-docs/inline/inline.component';
import { DialogComponent } from './patterns/contextual-docs/dialog/dialog.component';
import { DocsSideSheetComponent } from './patterns/contextual-docs/sidesheet/sidesheet.component';

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
        path: 'contextual-docs',
        children: [
          { path: '', component: ContextualDocsComponent },
          { path: 'inline', component: InlineComponent },
          { path: 'dialog', component: DialogComponent },
          { path: 'sidesheet', component: DocsSideSheetComponent },
        ],
      },
    ],
  },
];

export const appRoutes: any = RouterModule.forRoot(routes);
