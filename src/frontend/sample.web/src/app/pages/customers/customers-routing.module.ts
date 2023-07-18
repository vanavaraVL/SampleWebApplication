import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from './customers.component';
import {CustomersEditComponent} from './customers-edit/customers-edit.component';
import {CustomersViewComponent} from './customers-view/customers-view.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      {
        path: 'view',
        component: CustomersViewComponent,
      },
      {
        path: 'edit/:id',
        component: CustomersEditComponent,
      },
      {
        path: 'add',
        component: CustomersEditComponent,
      },
      {
        path: '**',
        component: CustomersViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}

export const routedComponents = [
  CustomersComponent,
  CustomersEditComponent,
  CustomersViewComponent,
];
