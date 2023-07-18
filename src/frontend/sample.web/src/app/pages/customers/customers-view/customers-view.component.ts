import {Component, OnInit, OnDestroy} from '@angular/core';
import {ICustomer} from '../../../types/Customer';
import {Observable, Subscription, of} from 'rxjs';
import {Router} from '@angular/router';
import {RoutesEnums} from '../../../types/enums/RoutesEnum';
import {CustomersEditService} from '../services/customers.edit.service';
import {CustomerService} from '../../../shared/services/customer.service';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
})
export class CustomersViewComponent implements OnInit, OnDestroy {
  public customers: ICustomer[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private customerEditService: CustomersEditService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.customerService
        .getAll()
        .subscribe((result) => this.processLoadedData(result.resultItem))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public add(): void {
    this.router.navigate([
      '/',
      RoutesEnums.PAGES,
      RoutesEnums.CUSTOMERS,
      'add',
    ]);
  }

  public edit(index: number): void {
    this.router.navigate([
      '/',
      RoutesEnums.PAGES,
      RoutesEnums.CUSTOMERS,
      'edit',
      this.customers[index].id,
    ]);
  }

  public delete(index: number): void {
    this.customerEditService.delete(this.customers[index].id);
  }

  private processLoadedData(result: ICustomer[]) {
    this.customers = result;
  }
}
