import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { SuppliersFacade } from '@feature/part-store/+state/order-list/suppliers';
import { Utility } from '@shared/utility/utility';
import { MyOrderAssetFacade } from '@feature/part-store/+state/order-list/my-order/asset';
import { MyOrderSubAssetFacade } from '@feature/part-store/+state/order-list/my-order/sub-asset';

@Component({
  selector: 'anms-request-list-add-form',
  templateUrl: './request-list-add-form.component.html',
  styleUrls: ['./request-list-add-form.component.scss']
})
export class RequestListAddFormComponent extends Utility implements OnInit {
  @Output() cancel = new EventEmitter();
  form: FormGroup;
  formSubmitted = false;

  users = [];

  dialogModal = false;
  dialogSetting: IDialogAlert = {
    header: 'Request',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel adding new request?',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };


  constructor(private assetfacade: MyOrderAssetFacade, private subAssetFacade: MyOrderSubAssetFacade, private formBuilder: FormBuilder, private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      asset: ['', Validators.required],
      part: ['', Validators.required],
      quantity: ['', Validators.required],
      department: ['', Validators.required],
      requestedBy: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.errorAndSubmitHandler(this.assetfacade);
    this.errorAndSubmitHandler(this.subAssetFacade);
  }

  dialogConfirm($event): void {
    if (this.dialogSetting.message === 'Request added Successfully') {
      this.router.navigate(['/part-store/order-list']).then();
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const payload = {
      fleetId: 1,
      itemId: 1,
      quantity: 10,
      description: "123",
      technicianId: 2
    };
    this.assetfacade.addRequest(payload);
  }

  errorAndSubmitHandler(facade) {

    facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Add new request';
        this.dialogSetting.message = 'Request added Successfully';
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
        this.dialogSetting.header = 'Add new request';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });

    this.assetfacade.reset();
    this.subAssetFacade.reset();
  }
}
