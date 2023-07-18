import {Injectable, OnDestroy} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable, Subscription, of} from 'rxjs';
import {CustomerService} from '../../../shared/services/customer.service';
import {ICustomer} from '../../../types/Customer';
import {IGenericApiResponse} from '../../../types/GenericApiResponse';
import {RoutesEnums} from '../../../types/enums/RoutesEnum';

@Injectable({
  providedIn: 'root',
})
export class CustomersEditService implements OnDestroy {
  private editForm: FormGroup;

  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public customerService: CustomerService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public loadItemDataById(id: number): void {
    this.subscriptions.push(
      this.customerService
        .getById(id)
        .subscribe((result) => this.processLoadedData(result.resultItem))
    );
  }

  public saveData(itemId?: number): void {
    (Object as any)
      .values(this.editForm.controls)
      .forEach((control: {markAllAsTouched: () => any}) =>
        control.markAllAsTouched()
      );
    this.editForm.markAsTouched();

    if (this.editForm.valid) {
      const payload: ICustomer = this.preparePayload();
      this.saveOrUpdate(payload, itemId);
    }
  }

  public buildEditForm(): FormGroup {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      sex: [0, [Validators.required]],
    });

    return this.editForm;
  }

  public preparePayload(): ICustomer {
    const payload: ICustomer = {
      id: this.editForm.value.id,
      description: this.editForm.value.description,
      sex: this.editForm.value.sex,
      name: this.editForm.value.name,
    };

    return payload;
  }

  public delete(id: number): void {
    this.subscriptions.push(
      this.customerService
        .delete(id)
        .subscribe((result) => this.processDeleteData(result))
    );
  }

  private processLoadedData(result: ICustomer): void {
    this.editForm.patchValue({
      ...result,
    });
  }

  private saveOrUpdate(payload: ICustomer, itemId?: number): void {
    if (itemId == undefined) {
      this.subscriptions.push(
        this.customerService
          .create(payload)
          .subscribe((result) => this.processSaveData(result))
      );
    } else {
      this.subscriptions.push(
        this.customerService
          .update(payload, itemId)
          .subscribe((result) => this.processSaveData(result))
      );
    }
  }

  private processSaveData(result: IGenericApiResponse<ICustomer>): void {
    if (result && result.error !== '') {
      this.navigateToEdit(result.resultItem.id);
    }
  }

  private processDeleteData(result: IGenericApiResponse<boolean>): void {
    if (result && result.error !== '') {
      this.navigateToView();
    }
  }

  public navigateToEdit(id: number): void {
    this.router.navigate([
      '/',
      RoutesEnums.PAGES,
      RoutesEnums.CUSTOMERS,
      'edit',
      id,
    ]);
  }

  public navigateToView(): void {
    this.router.navigate([
      '/',
      RoutesEnums.PAGES,
      RoutesEnums.CUSTOMERS,
      'view',
    ]);
  }
}
