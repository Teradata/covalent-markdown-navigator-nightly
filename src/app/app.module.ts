import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import {
  MatMenuModule, MatButtonToggleModule,
  MatProgressSpinnerModule, MatSlideToggleModule, MatDialogModule, MatSnackBarModule,
  MatTabsModule, MatSidenavModule, MatRippleModule, MatRadioModule, MatGridListModule,
  MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatAutocompleteModule
} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule, MatTooltip } from '@angular/material/tooltip';
import { CovalentExpansionPanelModule } from '@covalent/core/expansion-panel';
import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentMessageModule, CovalentStepsModule, CovalentDialogsModule } from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentBreadcrumbsModule } from '@covalent/core/breadcrumbs';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';
import { MOCK_API } from '../config/api.config';

import { MainComponent } from './main.component';
import { LoginComponent } from './login/login.component';
import { NavViewComponent } from './layouts/nav-view/nav-view.component';
import { OverviewComponent } from './overview/overview.component';
import { ManageListComponent } from './layouts/manage-list/manage-list.component';
import { NavListComponent } from './layouts/nav-list/nav-list.component';
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
import { BreadcrumbsComponent } from './patterns/breadcrumbs/breadcrumbs.component';
import { CardListComponent } from './patterns/cards/card-list/card-list.component';
import { CardGridComponent } from './patterns/cards/card-grid/card-grid.component';
import { CardImagesComponent } from './patterns/cards/card-images/card-images.component';
import { CreationEditComponent } from './patterns/creation-flow/creation-edit/creation-edit.component';
import { CreationOverComponent } from './patterns/creation-flow/creation-over/creation-over.component';
import { CreationOverEditComponent } from './patterns/creation-flow/creation-over-edit/creation-over-edit.component';
import { CreationDialogComponent, DialogContentExampleDialog} from './patterns/creation-flow/creation-dialog/creation-dialog.component';
import { CreationSidesheetComponent } from './patterns/creation-flow/creation-sidesheet/creation-sidesheet.component';
import { EmptyFilterComponent } from './patterns/empty-state/empty-filter/empty-filter.component';
import { EmptyContentComponent } from './patterns/empty-state/empty-content/empty-content.component';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

export function getAPI(): string {
  return MOCK_API;
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    OverviewComponent,
    ManageListComponent,
    NavViewComponent,
    NavListComponent,
    CardOverComponent,
    CardsComponent,
    StepperComponent,
    AlertsComponent,
    NavDrawerComponent,
    EmptyStateComponent,
    ContextualDocsComponent,
    InlineComponent,
    DialogComponent,
    DocsSideSheetComponent,
    AlertsInlineComponent,
    AlertsToastsComponent,
    MiniSideNavComponent,
    CreationFlowComponent,
    BreadcrumbsComponent,
    CardListComponent,
    CardGridComponent,
    CardImagesComponent,
    CreationEditComponent,
    CreationOverComponent,
    CreationOverEditComponent,
    CreationDialogComponent,
    DialogContentExampleDialog,
    CreationSidesheetComponent,
    EmptyFilterComponent,
    EmptyContentComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    // angular modules
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    // material modules
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    // covalent modules
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentLoadingModule,
    CovalentMessageModule,
    CovalentHighlightModule,
    CovalentBreadcrumbsModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    // routes
    appRoutes,
  ], // modules needed to run this module
  providers: [
    httpInterceptorProviders,
  ], // additional providers needed for this module
  entryComponents: [ CreationDialogComponent, DialogContentExampleDialog ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
