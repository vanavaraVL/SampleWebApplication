import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  CustomersRoutingModule,
  routedComponents,
} from './customers-routing.module';
import {CustomersComponent} from './customers.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [...routedComponents],
  imports: [CommonModule, CustomersRoutingModule, SharedModule],
  exports: [CustomersComponent, SharedModule],
})
export class CustomersModule {}
