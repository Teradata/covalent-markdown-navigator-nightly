import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { CardsComponent } from './patterns/cards/cards.component';
import { CardListComponent } from './patterns/cards/card-list/card-list.component';
import { CardGridComponent } from './patterns/cards/card-grid/card-grid.component';
import { CardImagesComponent } from './patterns/cards/card-images/card-images.component';


import { NavDrawerComponent } from './patterns/nav-drawer/nav-drawer.component';
import { StepperComponent } from './patterns/stepper/stepper.component';

import { EmptyStateComponent } from './patterns/empty-state/empty-state.component';
import { EmptyFilterComponent } from './patterns/empty-state/empty-filter/empty-filter.component';
import { EmptyContentComponent } from './patterns/empty-state/empty-content/empty-content.component';

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

import { AlertsComponent } from './patterns/alerts/alerts.component';
import { AlertsInlineComponent } from './patterns/alerts/alerts-inline/alerts-inline.component';
import { AlertsToastsComponent } from './patterns/alerts/alerts-toasts/alerts-toasts.component';

const routes: Routes = [
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
      {
        path: 'alerts',
        children: [
          { path: '', component: AlertsComponent },
          { path: 'inline', component: AlertsInlineComponent },
          { path: 'toasts', component: AlertsToastsComponent },
        ],
      },
      { path: 'stepper', component: StepperComponent },
      { 
        path: 'empty-state',
        children: [
          { path: '', component: EmptyStateComponent },
          { path: 'filter', component: EmptyFilterComponent },
          { path: 'no-content', component: EmptyContentComponent },
        ],
      },
      { path: 'nav-drawer', component: NavDrawerComponent },
      {
        path: 'cards',
        children: [
          { path: '', component: CardsComponent },
          { path: 'card-list', component: CardListComponent },
          { path: 'card-grid', component: CardGridComponent },
          { path: 'card-images', component: CardImagesComponent },
        ],
      },
    ],
  },
  { path: 'layouts/nav-view', redirectTo: '/', pathMatch: 'full' },
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
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: OverviewComponent }],
  },
];

export const appRoutes: any = RouterModule.forRoot(routes);
