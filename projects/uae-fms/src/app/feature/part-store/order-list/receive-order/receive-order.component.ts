import { Component, Injector, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PartListFacade } from '@feature/part-store/+state/part-list';
import { Utility } from '@shared/utility/utility';
import { IPartMasterItem } from '@models/part-store.model';
import { environment } from '@environments/environment';
import { PartMasterFacade } from '@feature/part-store/+state/part-master';
import { OrderListFacade } from '@feature/part-store/+state/order-list/order';
import { Location } from '@angular/common';

@Component({
  selector: 'anms-receive-order',
  templateUrl: './receive-order.component.html',
  styleUrls: ['./receive-order.component.scss']
})
export class ReceiveOrderComponent extends Utility implements OnInit {
  calenderIcon = 'assets/icons/calendar-alt-regular.svg';
  id: number;
  itemId: number;
  fleetType: string;
  yearRange =`2000:${new Date().getFullYear()}`;
  /* Subscription */
  specificItemSubscription: Subscription;
  specificOrderSubscription: Subscription;
  submitSubscription: Subscription;
  errorSubscription: Subscription;

  form: FormGroup;

  /* Dialog */
  dialogModal = false;
  dialogOption: dialogOption;
  dialogSetting: IDialogAlert = {
    header: 'Request',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel adding new request?',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };

  submitted = false;

  images$: Observable<any> = of([]);
  item$: Observable<IPartMasterItem> = of({
    categoryName: '',
    description: '',
    makeName: '',
    modelName: '',
    name: '',
    suppliers: []
  });

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _fb: FormBuilder,
    private _facadePartMaster: PartMasterFacade,
    private _facadeOrderList: OrderListFacade,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._facadePartMaster.resetItem();
    this._facadeOrderList.reset();
    let activeRoute = this._activatedRoute.snapshot.url;
    this.id = +activeRoute[activeRoute.length - 1].path;

    this.fleetType = activeRoute[1].path;
    if (this.id) {
      switch (this.fleetType) {
        case 'asset':
          this._facadeOrderList.getSpecificOrderPartAsset(this.id);
          break;
        case 'sub-asset':
          this._facadeOrderList.getSpecificOrderPartSubAsset(this.id);
          break;
      }
    }

    this.specificOrderSubscription = this._facadeOrderList.specificOrder$.subscribe(
      (x) => {
        if (x) {
          switch (this.fleetType) {
            case 'asset':
              this._facadePartMaster.loadSpecificItemOfAsset(x.itemId);
              break;
            case 'sub-asset':
              this._facadePartMaster.loadSpecificItemOfSubAsset(x.itemId);
              break;
          }
        }
      }
    );

    this.specificItemSubscription = this._facadePartMaster.specificItem$.subscribe(
      (x) => {
        if (x) {
          if (x.documentIds !== null && x.documentIds.length == 0) {
            this.images$ = of([{ address: 'assets/thumb.png' }]);
          } else {
            this.images$ = of(
              x.documentIds.map((x) => {
                return {
                  address: environment.baseApiUrl + `document/${x}`
                };
              })
            );
          }
          this.item$ = of(x);
        }
      }
    );

    this.form = this._fb.group({
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      warrantyStartDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      room: ['', [Validators.required]],
      aisle: ['', [Validators.required]],
      shelf: ['', [Validators.required]],
      box: ['', [Validators.required]]
    });

    this.errorAndSubmitHandler();
  }

  cancelForm() {
    this.dialogOption = dialogOption.cancel;
    this.dialogSetting = {
      header: 'Receive Order',
      hasError: false,
      isWarning: true,
      message: 'Are you sure that you want to cancel?',
      confirmButton: 'Yes',
      cancelButton: 'No'
    };
    this.dialogModal = true;
  }

  dialogConfirm(event) {
    if (
      event &&
      (this.dialogOption == dialogOption.cancel ||
        this.dialogOption == dialogOption.success)
    ) {
      this._location.back();
    }
    this.dialogModal = false;
  }

  submit() {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    let formData = this.form.getRawValue();
    let payload = {
      id: this.id,
      warrantyExpireDate: formData.warrantyStartDate.toISOString(),
      quantity: +formData.quantity,
      price: +formData.price,
      description: formData.description,
      room: formData.room,
      aisle: formData.aisle,
      shelf: formData.shelf,
      box: formData.box
    };
    switch (this.fleetType) {
      case 'asset':
        this._facadeOrderList.receiveSpecificOrderPartofAsset(payload);
        break;
      case 'sub-asset':
        this._facadeOrderList.receiveSpecificOrderPartofSubAsset(payload);
        break;
    }
  }

  errorAndSubmitHandler() {
    this.submitSubscription = this._facadeOrderList.submitted$.subscribe(
      (x) => {
        if (x) {
          this.dialogOption = dialogOption.success;
          this.dialogModal = true;
          this.dialogSetting.header = 'Receive Order';
          this.dialogSetting.message = 'Receive Order Successfully';
          this.dialogSetting.isWarning = false;
          this.dialogSetting.hasError = false;
          this.dialogSetting.confirmButton = 'OK';
          this.dialogSetting.cancelButton = undefined;
        }
      }
    );

    this.errorSubscription = this._facadeOrderList.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogOption = dialogOption.error;
        x?.error;
        this.dialogModal = true;
        this.dialogSetting.header = 'Receive Order';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
  }
  ngOnDestroy() {
    this.specificItemSubscription?.unsubscribe();
    this.specificOrderSubscription?.unsubscribe();
  }
}
export enum dialogOption {
  success = 'success',
  error = 'error',
  cancel = 'cancel'
}
