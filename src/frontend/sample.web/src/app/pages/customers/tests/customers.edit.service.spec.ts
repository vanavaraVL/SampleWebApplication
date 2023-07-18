import {TestBed} from '@angular/core/testing';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {CustomersEditService} from '../services/customers.edit.service';
import {ConfigureTestBed as configureTestBed} from './testBedConfiguration';
import {ICustomer} from '../../../types/Customer';
import {CustomerMock} from './mock/customer.mock';

describe('CustomersEditService', () => {
  let service: CustomersEditService;
  let mockData: ICustomer;

  let form: FormGroup;
  let spy: any,
    spyUpd: any,
    spyRoute: any,
    spyRouteView: any,
    spyCreate: any,
    spyDelete: any;

  beforeEach(() => {
    configureTestBed();
    service = TestBed.inject(CustomersEditService);
    mockData = CustomerMock;

    form = service.buildEditForm();
    spy = spyOn(service, 'preparePayload').and.callThrough();
    spyUpd = spyOn(service.customerService, 'update').and.callThrough();
    spyCreate = spyOn(service.customerService, 'create').and.callThrough();
    spyDelete = spyOn(service.customerService, 'delete').and.callThrough();
    spyRoute = spyOn(service, 'navigateToEdit').and.stub();
    spyRoute = spyOn(service, 'navigateToView').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    TestBed.resetTestingModule();
  });

  it('buildEditForm() should return a form of correct structure and set it as a state', () => {
    expect(form).not.toBeUndefined();
    expect(form.controls['name'].validator).not.toBeNull();
    expect(form.controls['description'].validator).not.toBeNull();
    expect(form.controls['sex']).not.toBeNull();

    TestBed.resetTestingModule();
  });

  it('loadItemDataById() should load AND patch data to the form', () => {
    service.loadItemDataById(1);

    expect(form.controls['name'].value).toEqual(mockData.name);
    expect(form.controls['description'].value).toEqual(mockData.description);
    expect(form.controls['sex'].value).toEqual(mockData.sex);

    TestBed.resetTestingModule();
  });

  it('saveData() should UPDATE', () => {
    service.loadItemDataById(1);

    expect(form.valid);

    service.saveData(1);

    expect(spy).toHaveBeenCalled();
    expect(spyUpd).toHaveBeenCalled();

    TestBed.resetTestingModule();
  });

  it('saveData() should CREATE', () => {
    service.loadItemDataById(1);

    expect(form.valid);

    service.saveData();

    expect(spy).toHaveBeenCalled();
    expect(spyCreate).toHaveBeenCalled();

    TestBed.resetTestingModule();
  });

  it('saveData() should not save form when invalid', () => {
    service.loadItemDataById(1);

    form.setErrors({incorrect: true});
    expect(form.valid).toBeFalse();

    service.saveData(1);
    expect(spy).not.toHaveBeenCalled();

    TestBed.resetTestingModule();
  });

  it('delete() should DELETE', () => {
    service.delete(1);

    expect(spyDelete).toHaveBeenCalled();

    TestBed.resetTestingModule();
  });
});
