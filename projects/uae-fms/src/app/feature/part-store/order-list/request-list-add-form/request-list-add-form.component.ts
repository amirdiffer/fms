import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Utility } from '@shared/utility/utility';

import { Observable, Subscription } from 'rxjs';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { ActivatedRoute } from '@angular/router';
import { PartMasterFacade } from '@feature/part-store/+state/part-master';
import { map } from 'rxjs/operators';
import { BodyShopTechnicianFacade } from '@feature/workshop/+state';
import { RequestListFacade } from '@feature/part-store/+state/order-list/request';
import { SubAssetFacade } from '@feature/fleet/+state/sub-asset';
import { AssetSearchThroughFacade } from '@feature/fleet/+state/assets/search-through';

@Component({
  selector: 'anms-request-list-add-form',
  templateUrl: './request-list-add-form.component.html',
  styleUrls: ['./request-list-add-form.component.scss']
})
export class RequestListAddFormComponent
  extends Utility
  implements OnInit, OnDestroy {
  fleetType = 'asset';
  isAsset: boolean = true;
  id: number;
  isEdit: boolean = false;
  form: FormGroup;

  submited = false;

  /* Async Form */
  category$: Observable<any>;
  item$: Observable<any>;

  /* Fleet Search */
  fleetList: any[] = [];
  fleetFilterd: any[] = [];
  fleetSubscription: Subscription;

  /* Item Search */
  itemList: any[] = [];
  itemFilterd: any[] = [];
  itemSubscription: Subscription;

  /* Technician Search */
  technicianList: any[] = [];
  technicianFilterd: any[] = [];
  technicianSubscription: Subscription;

  /* Error and Submit Subscription */
  errorSubscription: Subscription;
  submitSubscription: Subscription;

  /* specific request subscription */
  specificSubscription: Subscription;
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


  constructor(private _assetSearchThrough: AssetSearchThroughFacade,
              private _subAssetFacade:SubAssetFacade,
              private _facadePartMaster: PartMasterFacade,
              private _facadeTechnician:BodyShopTechnicianFacade,
              private _facadeRequestList : RequestListFacade,
              private _fb: FormBuilder, 
              private _activateRoute: ActivatedRoute,
              private injector: Injector) {super(injector);}

  ngOnInit(): void {
    let activateUrl = this._activateRoute.snapshot.url;
    this.fleetType = activateUrl[1].path;
    this.id = +activateUrl[activateUrl.length - 1].path;
    if (this.id) {
      this.isEdit = true;
    }

    /* Form Builder */
    this.form = this._fb.group({
      fleet: ['', Validators.required],
      category: ['', Validators.required],
      item: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      technician: ['', Validators.required]
    });

    this._facadeRequestList.reset();
    this._facadePartMaster.resetCategory();
    this._facadePartMaster.resetItem();
    this._facadeTechnician.loadAll();
    this.patchValueForm();
    this.errorAndSubmitHandler();

    switch (this.fleetType) {
      case 'asset':
        this._assetSearchThrough.loadAvailableAsset();
        this.isAsset = true;
        this.fleetSubscription = this._assetSearchThrough.searchAsset$.subscribe(
          x=>{
            if(x){
              this.fleetList = x;
            }
          }
        );
        break;
      case 'sub-asset':
        this._subAssetFacade.loadAll();
        this.isAsset = false;
        this.fleetSubscription = this._subAssetFacade.subAsset$.subscribe(
          (x) => {
            if (x) {
              this.fleetList = x.map((item) => {
                return {
                  ...item,
                  dpd: item.serialNumber
                };
              });
            }
          }
        );
        break;
    }
    this.itemSubscription = this._facadePartMaster.partMasterItem$.subscribe(
      (x) => {
        if (x) {
          this.itemList = x;
        }
      }
    );

    this.technicianSubscription = this._facadeTechnician.bodyShop$.subscribe(
      (x) => {
        if (x) {
          this.technicianList = x;
        }
      }
    );
  }

  onSubmit(): void {
    this.submited = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.dialogOption = dialogOption.success;
    let formData = this.form.getRawValue();
    let payload = {
      fleetId: formData.fleet.id,
      itemId: formData.item.id,
      quantity: +formData.quantity,
      description: formData.description,
      technicianId: formData.technician.id
    };

    if (this.isEdit) {
      let editPayload = {
        ...payload,
        id: this.id
      };
      switch (this.fleetType) {
        case 'asset':
          this._facadeRequestList.updateRequestOfAsset(editPayload);
          break;
        case 'sub-asset':
          this._facadeRequestList.updateRequestOfSubAsset(editPayload);
          break;
      }
    } else {
      switch (this.fleetType) {
        case 'asset':
          this._facadeRequestList.addRequestPartAsset(payload);
          break;
        case 'sub-asset':
          this._facadeRequestList.addRequestPartSubAsset(payload);
          break;
      }
    }
  }

  cancelForm() {
    this.dialogOption = dialogOption.cancel;
    this.dialogSetting = {
      header: 'Request',
      hasError: false,
      isWarning: true,
      message: 'Are you sure that you want to cancel adding new request?',
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
      this.fleetType === 'asset'
        ? this.goToList('part-store/order-list/asset')
        : this.goToList('part-store/order-list/sub-asset');
    }
    this.dialogModal = false;
  }

  /* PrimeNG Autocompelete */
  searchFleet(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.fleetList.length; index++) {
      let fleet = this.fleetList[index];
      if (fleet.dpd.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(fleet);
      }
    }
    this.fleetFilterd = filtered;
  }

  searchItem(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.itemList.length; index++) {
      let item = this.itemList[index];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.itemFilterd = filtered;
  }

  searchtechnician(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.technicianList.length; index++) {
      let technician = this.technicianList[index];
      if (
        technician.user.firstName.toLowerCase().indexOf(query.toLowerCase()) ==
        0
      ) {
        filtered.push(technician);
      }
    }
    this.technicianFilterd = filtered;
  }

  fleetSelect(event) {
    this.form.get('item').reset();
    switch (this.fleetType) {
      case 'asset':
        this._facadePartMaster.loadAllCategoryOfAsset(
          event.assetConfigurationId
        );
        this.category$ = this._facadePartMaster.partMasterAssetCategory$.pipe(
          map((x) => {
            if (x) {
              return x;
            }
          })
        );
        break;
      case 'sub-asset':
        this._facadePartMaster.loadAllCategoryOfSubAsset(
          event.subAssetConfigurationId
        );
        this.category$ = this._facadePartMaster.partMasterSubAssetCategory$.pipe(
          map((x) => {
            if (x) {
              return x;
            }
          })
        );
        break;
    }
  }

  categorySelect(event) {
    this.form.get('item').reset();
    switch (this.fleetType) {
      case 'asset':
        this._facadePartMaster.loadAllItemOfAsset(event);
        break;
      case 'sub-asset':
        this._facadePartMaster.loadAllItemOfSubAsset(event);
        break;
    }
    this.item$ = this._facadePartMaster.partMasterItem$.pipe(
      map((x) => {
        if (x) {
          return x;
        }
      })
    );
  }

  errorAndSubmitHandler() {
    this.submitSubscription = this._facadeRequestList.submitted$.subscribe(
      (x) => {
        if (x) {
          this.dialogOption = dialogOption.success;
          this.dialogModal = true;
          this.dialogSetting.header = this.isEdit
            ? 'Edit request'
            : 'Add new request';
          this.dialogSetting.message = this.isEdit
            ? 'Request edited Successfully'
            : 'Request added Successfully';
          this.dialogSetting.isWarning = false;
          this.dialogSetting.hasError = false;
          this.dialogSetting.confirmButton = 'OK';
          this.dialogSetting.cancelButton = undefined;
        }
      }
    );

    this.errorSubscription = this._facadeRequestList.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogOption = dialogOption.error;
        x?.error;
        this.dialogModal = true;
        this.dialogSetting.header = this.isEdit
          ? 'Edit request'
          : 'Add new request';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
  }

  patchValueForm() {
    if (this.isEdit) {
      switch (this.fleetType) {
        case 'asset':
          this._facadeRequestList.getSpecificRequestPartAsset(this.id);
          break;
        case 'sub-asset':
          this._facadeRequestList.getSpecificRequestPartSubAsset(this.id);
          break;
      }
    }

    this.specificSubscription = this._facadeRequestList.specificRequest$.subscribe(
      (x) => {
        if (x && this.isEdit) {
          switch (this.fleetType) {
            case 'asset':
              this.fleetSelect({
                assetConfigurationId: x.fleetConfigurationId
              });
              break;
            case 'sub-asset':
              this.fleetSelect({
                subAssetConfigurationId: x.fleetConfigurationId
              });
              break;
          }
          this.categorySelect(x.categoryId);
          this.form.patchValue({
            fleet: { dpd: x.fleetName, id: x.fleetConfigurationId },
            category: x.categoryId,
            item: { name: x.itemName, id: x.itemId },
            quantity: x.quantity,
            description: x.description,
            technician: {
              id: x.technician.id,
              user: { firstName: x.technician.firstName }
            }
          });
        }
      }
    );
  }

  ngOnDestroy() {
    this.fleetSubscription?.unsubscribe();
    this.itemSubscription?.unsubscribe();
    this.submitSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
    this.technicianSubscription?.unsubscribe();
    this.specificSubscription?.unsubscribe();
  }
}

export enum dialogOption {
  success = 'success',
  error = 'error',
  cancel = 'cancel'
}
