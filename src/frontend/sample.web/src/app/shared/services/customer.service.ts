import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {IAppConfig} from '../../types/AppConfig';
import {APP_CONFIG} from '../../../injection-tokens';
import {ICustomer} from '../../types/Customer';
import {IGenericApiResponse} from '../../types/GenericApiResponse';
import {ApiEndpointsEnums} from '../../types/enums/ApiEndpointsEnum';
import {ApiHelper} from './api.helper';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private apiHelper: ApiHelper,
    @Inject(APP_CONFIG) private appConfig: IAppConfig
  ) {}

  public getById(id: number): Observable<IGenericApiResponse<ICustomer>> {
    return this.http
      .get<IGenericApiResponse<ICustomer>>(
        `${this.appConfig.apiUrl}${ApiEndpointsEnums.CUSTOMERS}/${id}`
      )
      .pipe(catchError((error) => this.apiHelper.handleError(error)));
  }

  public getAll(): Observable<IGenericApiResponse<ICustomer[]>> {
    return this.http
      .get<IGenericApiResponse<ICustomer[]>>(
        `${this.appConfig.apiUrl}${ApiEndpointsEnums.CUSTOMERS}`
      )
      .pipe(catchError((error) => this.apiHelper.handleError(error)));
  }

  public create(
    payload: ICustomer
  ): Observable<IGenericApiResponse<ICustomer>> {
    return this.http
      .post<IGenericApiResponse<ICustomer>>(
        `${this.appConfig.apiUrl}${ApiEndpointsEnums.CUSTOMERS}/`,
        payload
      )
      .pipe(catchError((error) => this.apiHelper.handleError(error)));
  }

  public update(
    payload: ICustomer,
    id: number
  ): Observable<IGenericApiResponse<ICustomer>> {
    return this.http
      .put<IGenericApiResponse<ICustomer>>(
        `${this.appConfig.apiUrl}${ApiEndpointsEnums.CUSTOMERS}/${id}`,
        payload
      )
      .pipe(catchError((error) => this.apiHelper.handleError(error)));
  }

  public delete(id: number): Observable<IGenericApiResponse<boolean>> {
    return this.http
      .delete<IGenericApiResponse<boolean>>(
        `${this.appConfig.apiUrl}${ApiEndpointsEnums.CUSTOMERS}/${id}`
      )
      .pipe(catchError((error) => this.apiHelper.handleError(error)));
  }
}
