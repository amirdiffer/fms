import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from '@core/table';
import { SuppliersFacade } from '@feature/part-store/+state/order-list/suppliers';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'suppliers-add-form',
  templateUrl: './suppliers-add-form.component.html',
  styleUrls: ['./suppliers-add-form.component.scss']
})
export class SuppliersAddFormComponent extends Utility implements OnInit {
  @Output() cancel = new EventEmitter();
  form: FormGroup;
  formSubmitted = false;

  dialogModal = false;
  dialogSetting: IDialogAlert = {
    header: 'Supplier',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel adding new supplier?',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };


  constructor(private facade: SuppliersFacade, private formBuilder: FormBuilder, private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      company: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.errorAndSubmitHandler(this.facade);
  }

  dialogConfirm($event): void {
    if (this.dialogSetting.message === 'Supplier added Successfully') {
      this.router.navigate(['/part-store/order-list']).then()
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const payload = {
      companyName: this.form.value.company,
      address: this.form.value.address,
      agentName: this.form.value.name,
      agentPhoneNumber: this.form.value.phone,
      agentEmail: this.form.value.email
    }
    this.facade.addSupplier(payload)
  }

  errorAndSubmitHandler(facade) {

    facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new supplier';
        this.dialogSetting.message = 'Supplier added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });

    facade.error$.subscribe((x) => {
      if (x?.error) {
        x?.error;
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new supplier';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });

    this.facade.reset()
  }
}
