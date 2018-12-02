import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { LoginComponent } from './login/login.component';
import { NavStepperComponent } from './patterns/nav-stepper/nav-stepper.component';
import { NavViewComponent } from './layouts/nav-view/nav-view.component';
import { NavListComponent } from './layouts/nav-list/nav-list.component';
import { ManageListComponent } from './layouts/manage-list/manage-list.component';
import { CardOverComponent } from './layouts/card-over/card-over.component';
import { CardsComponent } from './patterns/cards/cards.component';
import { StepperComponent } from './patterns/stepper/stepper.component';
import { AlertsComponent } from './patterns/alerts/alerts.component';
import { NavDrawerComponent } from './patterns/nav-drawer/nav-drawer.component';
import { EmptyStateComponent } from './patterns/empty-state/empty-state.component';
import { SideSheetComponent } from './patterns/side-sheet/side-sheet.component';
import { ContextualDocsComponent } from './patterns/contextual-docs/contextual-docs.component';
import { InlineComponent } from './patterns/contextual-docs/inline/inline.component';
import { DialogComponent } from './patterns/contextual-docs/dialog/dialog.component';
import { DocsSideSheetComponent } from './patterns/contextual-docs/docs-side-sheet/docs-side-sheet.component';
import { AlertsInlineComponent } from './patterns/alerts/alerts-inline/alerts-inline.component';

import { AlertsToastsComponent } from './patterns/alerts/alerts-toasts/alerts-toasts.component';

import { LogsComponent } from './patterns/side-sheet/logs/logs.component';
import { FiltersComponent } from './patterns/side-sheet/filters/filters.component';
import { MiniSideNavComponent } from './patterns/mini-side-nav/mini-side-nav.component';
import { CreationFlowComponent } from './patterns/creation-flow/creation-flow.component';
import { BreadcrumbsComponent } from './patterns/breadcrumbs/breadcrumbs.component';


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
      { path: 'navview', component: NavViewComponent },
      { path: 'navlist', component: NavListComponent },
      { path: 'managelist', component: ManageListComponent },
      { path: 'cardover', component: CardOverComponent },
    ],
  }, {
    path: 'patterns',
    component: MainComponent,
    children: [
      { path: 'navstepper', component: NavStepperComponent },
      { path: 'stepper', component: StepperComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'alerts', children: [
        { path: '', component: AlertsComponent },
        { path: 'inline', component: AlertsInlineComponent },
        { path: 'toasts', component: AlertsToastsComponent },
      ]},
      { path: 'navdrawer', component: NavDrawerComponent },
      { path: 'emptystate', component: EmptyStateComponent },
      { path: 'docs', children: [
        { path: '', component: ContextualDocsComponent },
        { path: 'inline', component: InlineComponent },
        { path: 'dialog', component: DialogComponent },
        { path: 'sidesheet', component: DocsSideSheetComponent },
      ]},
      { path: 'sidesheet', children:   [
        { path: '', component: SideSheetComponent },
        { path: 'filters', component: FiltersComponent },
        { path: 'logs', component: LogsComponent },
      ]},
      { path: 'minisidenav', component: MiniSideNavComponent },
      { path: 'creationflow', component: CreationFlowComponent },
      { path: 'breadcrumbs', component: BreadcrumbsComponent },
    ],
  },
];

export const appRoutes: any = RouterModule.forRoot(routes);
