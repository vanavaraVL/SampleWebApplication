import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ApiHelper} from './services/api.helper';
import {CustomerService} from './services/customer.service';

const sharedComponents = [NotFoundComponent];
const sharedProviders = [ApiHelper, CustomerService];

@NgModule({
  providers: [...sharedProviders],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    ...sharedComponents,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [...sharedComponents],
})
export class SharedModule {
  constructor() {}
}
