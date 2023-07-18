import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CustomersEditService} from '../services/customers.edit.service';

@Component({
  selector: 'app-customers-edit',
  templateUrl: './customers-edit.component.html',
})
export class CustomersEditComponent implements OnInit {
  public editForm: FormGroup;
  public editState: string;

  public sex: number[] = [0, 1];
  private itemId: number | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private customerEditService: CustomersEditService
  ) {
    this.editForm = this.customerEditService.buildEditForm();
  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params.id || undefined;
    this.editState = this.itemId ? 'Edit' : 'Add new';

    if (this.itemId && this.itemId > 0) {
      this.customerEditService.loadItemDataById(this.itemId);
    }
  }

  public saveData(): void {
    this.customerEditService.saveData(this.itemId);
  }

  public validate(controlName: string): string {
    if (!this.editForm.get(controlName)?.touched) {
      return '';
    }
    if (this.editForm.hasError('required', [controlName])) {
      return `<b>The field ${controlName}</b> is required`;
    }

    return '';
  }
}
