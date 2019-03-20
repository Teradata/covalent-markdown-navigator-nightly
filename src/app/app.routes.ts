import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { OverviewComponent } from './overview/overview.component';
import { CardsComponent } from './patterns/cards/cards.component';
import { CardListComponent } from './patterns/cards/card-list/card-list.component';
import { CardGridComponent } from './patterns/cards/card-grid/card-grid.component';
import { CardImagesComponent } from './patterns/cards/card-images/card-images.component';

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
];

export const appRoutes: any = RouterModule.forRoot(routes);
