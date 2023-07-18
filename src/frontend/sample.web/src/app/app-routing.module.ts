import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RoutesEnums} from './types/enums/RoutesEnum';

const routes: Routes = [
  {
    path: RoutesEnums.PAGES,
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {path: '', redirectTo: RoutesEnums.PAGES, pathMatch: 'full'},
  {path: '**', redirectTo: RoutesEnums.PAGES},
];

const config: ExtraOptions = {
  useHash: false,
  relativeLinkResolution: 'legacy',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
