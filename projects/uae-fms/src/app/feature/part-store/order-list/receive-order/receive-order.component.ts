import { Component, Injector, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PartListFacade } from '@feature/part-store/+state/part-list';
import { Utility } from '@shared/utility/utility';
import { IPartMasterItem } from '@models/part-store.model';
import { MyOrderAssetFacade, MyOrderAssetService } from '@feature/part-store/+state/order-list/my-order/asset';
import {
  MyOrderSubAssetFacade,
  MyOrderSubAssetService
} from '@feature/part-store/+state/order-list/my-order/sub-asset';
import { environment } from '@environments/environment';
import { PartMasterFacade } from '@feature/part-store/+state/part-master';

@Component({
  selector: 'anms-receive-order',
  templateUrl: './receive-order.component.html',
  styleUrls: ['./receive-order.component.scss']
})
export class ReceiveOrderComponent extends Utility implements OnInit {
  calenderIcon = 'assets/icons/calendar-alt-regular.svg';
  id: number;
  fleetType;
  partSubscription: Subscription;
  form: FormGroup;

  dialogModal = false;
  dialogOption: dialogOption;
  dialogSetting: IDialogAlert;

  submitted = false;

  images$: Observable<any>;
  item$: Observable<IPartMasterItem> = of({
    categoryName: '',
    description: '',
    makeName: '',
    modelName: '',
    name: ''
  });

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _facadePartList: PartListFacade,
              private _fb: FormBuilder,
              private myOrderAssetFacade: MyOrderAssetFacade,
              private myOrderSubAssetFacade: MyOrderSubAssetFacade,
              private myOrderAssetService: MyOrderAssetService,
              private myOrderSubAssetService: MyOrderSubAssetService,
              private facadePartMaster: PartMasterFacade,
              injector: Injector) {
    super(injector);
    this._facadePartList.resetPartAssetState();
    this._facadePartList.resetPartSubAssetState();
  }

  ngOnInit(): void {

    this.dialogSetting = {
      header: 'Receive Order',
      hasError: false,
      isWarning: false,
      message: 'Message is Here',
      confirmButton: 'Yes',
      cancelButton: 'No'
    };


    let getURL = this._activatedRoute.snapshot.url;
    this.id = +getURL[getURL.length - 1].path;
    this.fleetType = this._activatedRoute.snapshot.queryParams.fleetType;
    this.form = this._fb.group({
      quantity: [{ value: '', disabled: true }],
      price: [{ value: '', disabled: true }],
      warrantyStartDate: [{ value: '', disabled: true }],
      description: ['', [Validators.required]],
      room: ['', [Validators.required]],
      aisle: ['', [Validators.required]],
      shelf: ['', [Validators.required]],
      box: ['', [Validators.required]]
    });

    if (this.fleetType) {
      this.checkFleetType();
    }

    if (this.id) {
      console.log(this.id);
      switch (this.fleetType) {
        case 'asset':
          this._facadePartList.loadSpecificPartOfAsset(this.id);
          break;
        case 'sub-asset':
          this._facadePartList.loadSpecificPartOfSubAsset(this.id);
          break;
      }
      this.formPatchValue();
      this.errorHandele();

      this.facadePartMaster.specificItem$.subscribe(
        x => {
          if (x) {
            if (x.documentIds !== null && x.documentIds.length == 0) {
              this.images$ = of([{ address: 'assets/camera.png' }]);
            } else {
              this.images$ = of(x.documentIds?.map(x => {
                return {
                  address: environment.baseApiUrl + `document/${x}`
                };
              }));
            }
            console.log(x);
            this.item$ = of(x);
            if (this.fleetType === 'asset') {
              this.myOrderAssetService.getOrderById(x.id).subscribe((response) => {
                const message = response.message;
                if (message.status !== 'JUST_REGISTERED') {
                  this.dialogModal = true;
                  this.dialogSetting.message = 'This order has been received before.';
                  this.dialogSetting.isWarning = true;
                  this.dialogSetting.hasError = false;
                  this.dialogSetting.cancelButton = undefined;
                  this.dialogSetting.confirmButton = 'OK';
                }
              });
            } else {
              this.myOrderSubAssetService.getOrderById(x.id).subscribe((response) => {
                const message = response.message;
                if (message.status !== 'JUST_REGISTERED') {
                  this.dialogModal = true;
                  this.dialogSetting.message = 'This order has been received before.';
                  this.dialogSetting.isWarning = true;
                  this.dialogSetting.hasError = false;
                  this.dialogSetting.cancelButton = undefined;
                  this.dialogSetting.confirmButton = 'OK';
                }
              });
            }
          }
        }
      );
    }
  }

  formPatchValue() {
    switch (this.fleetType) {
      case 'asset':
        this.partSubscription = this._facadePartList.specificAssetPart$.subscribe(x => {
          if (x) {
            this.form.patchValue({
              quantity: x.quantity,
              price: x.price,
              warrantyStartDate: new Date(x.warrantyExpireDate),
              description: x.description,
              room: x.room,
              aisle: x.aisle,
              shelf: x.shelf,
              box: x.box
            });
          }
        });
        break;
      case 'sub-asset':
        this.partSubscription = this._facadePartList.specificSubAssetPart$.subscribe(x => {
          console.log(x);
        });
        break;
    }
  }

  checkFleetType() {
    switch (this.fleetType) {
      case 'asset':
        this._facadePartList.loadAllAssetPartList(this.id);
        this.facadePartMaster.loadSpecificItemOfAsset(this.id);
        break;
      case 'sub-asset':
        this._facadePartList.loadAllSubAssetPartList(this.id);
        this.facadePartMaster.loadSpecificItemOfSubAsset(this.id);
        break;
    }
  }

  cancelForm() {
    this.dialogOption = dialogOption.cancel;
    this.dialogSetting.message = 'Are you sure?';
    this.dialogSetting.isWarning = true;
    this.dialogSetting.hasError = false;
    this.dialogSetting.confirmButton = 'Yes';
    this.dialogSetting.cancelButton = 'No';
    this.dialogModal = true;
  }

  dialogConfirm(event) {
    if (event && (this.dialogOption == dialogOption.cancel || this.dialogOption == dialogOption.success)) {
      this._router.navigate(['/part-store/order-list']).then();
    }
    this.dialogModal = false;
    if (this.dialogSetting.message === 'This order has been received before.') {
      this._router.navigate(['/part-store/order-list']).then();
    }
  }

  submit() {
    this.submitted = true;
    this.form.markAllAsTouched();
    this.dialogOption = dialogOption.success;
    if (this.form.invalid) return;
    const rawData = this.form.getRawValue();
    const data = {
      id: this.id,
      warrantyExpireDate: rawData.warrantyStartDate,
      quantity: rawData.quantity,
      price: rawData.price,
      description: rawData.description,
      room: rawData.room,
      aisle: rawData.aisle,
      shelf: rawData.shelf,
      box: rawData.box
    };

    switch (this.fleetType) {
      case 'asset':
        console.log(data);
        this.myOrderAssetFacade.receiveOrder(data);
        break;
      case 'sub_asset':
        this.myOrderSubAssetFacade.receiveOrder(data);
        break;
    }
  }

  errorHandele() {
    (this.fleetType === 'asset' ? this._facadePartList.updatedAssetPart$ : this._facadePartList.updatedSubAssetPart$).subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Update Part';
        this.dialogSetting.message = 'Part Updated Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });
    (this.fleetType === 'asset' ? this._facadePartList.errorAssetPart$ : this._facadePartList.errorAssetPart$).subscribe((x) => {
      if (x?.error) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Update Part';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });

  }

  ngOnDestroy() {
    this.partSubscription?.unsubscribe();
  }
}

export enum dialogOption {
  success = 'success',
  error = 'error',
  cancel = 'cancel'
}
