import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { ContextualDocsComponent } from './patterns/contextual-docs/contextual-docs.component';
import { InlineComponent } from './patterns/contextual-docs/inline/inline.component';
import { DialogComponent } from './patterns/contextual-docs/dialog/dialog.component';
import { DocsSideSheetComponent } from './patterns/contextual-docs/sidesheet/sidesheet.component';
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
        path: 'contextual-docs',
        children: [
          { path: '', component: ContextualDocsComponent },
          { path: 'inline', component: InlineComponent },
          { path: 'dialog', component: DialogComponent },
          { path: 'sidesheet', component: DocsSideSheetComponent },
        ],
      },
    ],
  }, {
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
