import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of} from 'rxjs';
import {IGenericApiResponse} from '../../../types/GenericApiResponse';
import {ICustomer} from '../../../types/Customer';
import {CustomerMock} from './mock/customer.mock';
import {CustomerService} from '../../../shared/services/customer.service';

class CustomersServiceMock {
  private response: IGenericApiResponse<ICustomer> = {
    resultItem: CustomerMock,
    error: 'no error',
  };

  private responseDelete: IGenericApiResponse<boolean> = {
    resultItem: true,
    error: 'no error',
  };

  public getById(id: number): Observable<IGenericApiResponse<ICustomer>> {
    return of(this.response);
  }
  public update(
    payload: object,
    id: number
  ): Observable<IGenericApiResponse<ICustomer>> {
    return of(this.response);
  }
  public create(payload: object): Observable<IGenericApiResponse<ICustomer>> {
    return of(this.response);
  }

  public delete(id: number): Observable<IGenericApiResponse<boolean>> {
    return of(this.responseDelete);
  }
}

export const ConfigureTestBed = () => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [
      FormBuilder,
      {provide: CustomerService, useClass: CustomersServiceMock},
    ],
  });
};
