import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NavPagesComponent} from '../nav-pages/nav-pages.component';
import {RoutesEnums} from '../types/enums/RoutesEnum';
import {NotFoundComponent} from '../shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NavPagesComponent,
    children: [
      {
        path: '404',
        component: NotFoundComponent,
      },
      {
        path: RoutesEnums.ABOUT,
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
      },
      {
        path: RoutesEnums.CUSTOMERS,
        loadChildren: () =>
          import('./customers/customers.module').then((m) => m.CustomersModule),
      },
      {
        path: '',
        redirectTo: '/pages/about',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
