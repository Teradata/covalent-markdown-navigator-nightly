import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './login/login.component';
import { NavViewComponent } from './layouts/nav-view/nav-view.component';
import { NavListComponent } from './layouts/nav-list/nav-list.component';
import { ManageListComponent } from './layouts/manage-list/manage-list.component';
import { CardOverComponent } from './layouts/card-over/card-over.component';
import { CardsComponent } from './patterns/cards/cards.component';
import { StepperComponent } from './patterns/stepper/stepper.component';
import { AlertsComponent } from './patterns/alerts/alerts.component';
import { NavDrawerComponent } from './patterns/nav-drawer/nav-drawer.component';
import { EmptyStateComponent } from './patterns/empty-state/empty-state.component';
import { ContextualDocsComponent } from './patterns/contextual-docs/contextual-docs.component';
import { InlineComponent } from './patterns/contextual-docs/inline/inline.component';
import { DialogComponent } from './patterns/contextual-docs/dialog/dialog.component';
import { DocsSideSheetComponent } from './patterns/contextual-docs/sidesheet/sidesheet.component';
import { AlertsInlineComponent } from './patterns/alerts/alerts-inline/alerts-inline.component';

import { AlertsToastsComponent } from './patterns/alerts/alerts-toasts/alerts-toasts.component';

import { MiniSideNavComponent } from './patterns/mini-side-nav/mini-side-nav.component';
import { CreationFlowComponent } from './patterns/creation-flow/creation-flow.component';
import { CreationEditComponent } from './patterns/creation-flow/creation-edit/creation-edit.component';
import { CreationOverComponent } from './patterns/creation-flow/creation-over/creation-over.component';
import { CreationOverEditComponent } from './patterns/creation-flow/creation-over-edit/creation-over-edit.component';
import { CreationDialogComponent } from './patterns/creation-flow/creation-dialog/creation-dialog.component';
import { CreationSidesheetComponent } from './patterns/creation-flow/creation-sidesheet/creation-sidesheet.component';

import { BreadcrumbsComponent } from './patterns/breadcrumbs/breadcrumbs.component';

import { CardListComponent } from './patterns/cards/card-list/card-list.component';
import { CardGridComponent } from './patterns/cards/card-grid/card-grid.component';
import { CardImagesComponent } from './patterns/cards/card-images/card-images.component';

const routes: Routes = [{
    path: 'login',
    component: LoginComponent,
  }, {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: OverviewComponent },
    ],
  }, {
    path: 'layouts',
    component: MainComponent,
    children: [
      { path: 'nav-view', component: NavViewComponent },
      { path: 'nav-list', component: NavListComponent },
      { path: 'manage-list', component: ManageListComponent },
      { path: 'card-over', component: CardOverComponent },
    ],
  }, {
    path: 'patterns',
    component: MainComponent,
    children: [
      { path: 'stepper', component: StepperComponent },
      { path: 'cards', children: [
        { path: '', component: CardsComponent },
        { path: 'card-list', component: CardListComponent },
        { path: 'card-grid', component: CardGridComponent },
        { path: 'card-images', component: CardImagesComponent },
      ]},
      { path: 'alerts', children: [
        { path: '', component: AlertsComponent },
        { path: 'inline', component: AlertsInlineComponent },
        { path: 'toasts', component: AlertsToastsComponent },
      ]},
      { path: 'nav-drawer', component: NavDrawerComponent },
      { path: 'empty-state', component: EmptyStateComponent },
      { path: 'contextual-docs', children: [
        { path: '', component: ContextualDocsComponent },
        { path: 'inline', component: InlineComponent },
        { path: 'dialog', component: DialogComponent },
        { path: 'sidesheet', component: DocsSideSheetComponent },
      ]},
      { path: 'mini-side-nav', component: MiniSideNavComponent },
      { path: 'creation-flow', children: [
        { path: '', component: CreationFlowComponent },
        { path: 'edit', component: CreationEditComponent },
        { path: 'card-over', children: [
          { path: '', component: CreationOverComponent },
          { path: 'edit', component: CreationOverEditComponent },
        ]},
        { path: 'dialog', children: [
          { path: '', component: CreationDialogComponent },
        ]},
        { path: 'sidesheet', component: CreationSidesheetComponent },
      ]},
      
      { path: 'breadcrumbs', component: BreadcrumbsComponent },
    ],
  },
];

export const appRoutes: any = RouterModule.forRoot(routes);
