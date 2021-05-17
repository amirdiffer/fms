import { Component, EventEmitter, Injector, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { SuppliersFacade } from '@feature/part-store/+state/order-list/suppliers';
import { Utility } from '@shared/utility/utility';
import { MyOrderAssetFacade } from '@feature/part-store/+state/order-list/my-order/asset';
import { MyOrderSubAssetFacade } from '@feature/part-store/+state/order-list/my-order/sub-asset';
import { Observable, Subscription } from 'rxjs';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { ActivatedRoute } from '@angular/router';
import { PartMasterFacade } from '@feature/part-store/+state/part-master';
import { map } from 'rxjs/operators';
import { BodyShopTechnicianFacade } from '@feature/workshop/+state/body-shop';
import { RequestListFacade } from '@feature/part-store/+state/order-list/request';
import { SubAssetFacade } from '@feature/fleet/+state/sub-asset';

@Component({
  selector: 'anms-request-list-add-form',
  templateUrl: './request-list-add-form.component.html',
  styleUrls: ['./request-list-add-form.component.scss']
})
export class RequestListAddFormComponent extends Utility implements OnInit , OnDestroy{
  @Output() cancel = new EventEmitter();
  fleetType='asset';
  form: FormGroup;

  submited = false;


  /* Async Form */
  category$:Observable<any>;
  item$:Observable<any>;

  /* Fleet Search */
  fleetList: any[]=[];
  fleetFilterd: any[]=[];
  fleetSubscription:Subscription;

  /* Item Search */
  itemList:any[]=[];
  itemFilterd:any[]=[];
  itemSubscription: Subscription;

  /* Technician Search */
  technicianList:any[]=[];
  technicianFilterd:any[]=[];
  technicianSubscription: Subscription;


  /* Error and Submit Subscription */
  errorSubscription: Subscription;
  submitSubscription: Subscription;


  /* Dialog */
  dialogModal = false;
  dialogOption:dialogOption;
  dialogSetting: IDialogAlert = {
    header: 'Request',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel adding new request?',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };


  constructor(private _assetFacade:AssetMasterFacade,
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
    this._facadeRequestList.reset();
    this._facadeTechnician.loadAll();
    this.errorAndSubmitHandler();

    /* Form Builder */
    this.form = this._fb.group({
      fleet: ['', Validators.required],
      category: ['', Validators.required],
      item: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      technician: ['', Validators.required],
    });

    switch (this.fleetType) {
      case 'asset':
        this._assetFacade.loadAll();
        this.fleetSubscription = this._assetFacade.assetMaster$.subscribe(
          x=>{
            if(x){
              this.fleetList = x
            }
          }
        );
        break;
      case 'sub-asset':
        this._subAssetFacade.loadAll();
        this.fleetSubscription = this._subAssetFacade.subAsset$.subscribe(
          x=>{
            console.log(x)
            if(x){
              this.fleetList = x.map(
                item => {
                  return {
                    
                  }
                }
              )
            }
          }
        );
        break;
    }
    this.itemSubscription = this._facadePartMaster.partMasterItem$.subscribe(
      x=>{
        if(x){
          this.itemList = x
        }
      }
    );
    
    this.technicianSubscription = this._facadeTechnician.bodyShop$.subscribe(
      x =>{
        if(x){
          this.technicianList = x
        }
      }
    )
  }


  onSubmit(): void {
    this.submited = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.dialogOption = dialogOption.success
    let formData = this.form.getRawValue();
    let payload = {
      fleetId: formData.fleet.id,
      itemId: formData.item.id,
      quantity: +formData.quantity,
      description: formData.description,
      technicianId: formData.technician.id
    };

    switch (this.fleetType){
      case 'asset':
        this._facadeRequestList.addRequestPartAsset(payload)
        break;
      case 'sib-asset':
        this._facadeRequestList.addRequestPartSubAsset(payload)
        break;
    }
  }

  cancelForm(){
    this.dialogOption = dialogOption.cancel;
    this.dialogSetting = {
      header: 'Request',
      hasError: false,
      isWarning: true,
      message: 'Are you sure that you want to cancel adding new request?',
      confirmButton: 'Yes',
      cancelButton: 'No'
    }
    this.dialogModal = true;
    
  }

  dialogConfirm(event){
    if(event && (this.dialogOption == dialogOption.cancel || this.dialogOption == dialogOption.success)){
      this.goToList('part-store/order-list');
    }
    this.dialogModal = false;
  }

  /* PrimeNG Autocompelete */

  searchFleet(event) {
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.fleetList.length; index++) {
      let fleet = this.fleetList[index];
      if (this.fleetType == 'asset' && fleet.dpd.indexOf(query) == 0) {
        filtered.push(fleet);
      }
      if (this.fleetType == 'sub-asset' && fleet.serialNumber.indexOf(query) == 0) {
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

  searchtechnician(event){
    let query = event.query;
    let filtered = [];
    for (let index = 0; index < this.technicianList.length; index++) {
      let technician = this.technicianList[index];
      if (technician.user.firstName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(technician);
      }
    }
    this.technicianFilterd = filtered;
  }

  fleetSelect(event){
    this.form.get('item').reset()
    switch (this.fleetType) {
      case 'asset':
        this._facadePartMaster.loadAllCategoryOfAsset(event.assetConfigurationId);
        this.category$ = this._facadePartMaster.partMasterAssetCategory$.pipe(
          map(x=>{
            if(x){
              console.log(x)
              return x
            }
          })
        )
        break;
    }
  }

  categorySelect(event){
    this.form.get('item').reset()
    switch (this.fleetType) {
      case 'asset':
        this._facadePartMaster.loadAllItemOfAsset(event);
        this.item$ = this._facadePartMaster.partMasterItem$.pipe(
          map(x=>{
            if(x){
              return x
            }
          })
        );
        break;
    }
  }

  


  errorAndSubmitHandler() {
    this.submitSubscription = this._facadeRequestList.submitted$.subscribe((x) => {
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

    this.errorSubscription = this._facadeRequestList.error$.subscribe((x) => {
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
  }

  ngOnDestroy(){
    this.fleetSubscription.unsubscribe();
    this.itemSubscription.unsubscribe();
    this.submitSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.technicianSubscription.unsubscribe();
  }
}


export enum dialogOption{
  success='success',
  error = 'error',
  cancel = 'cancel'
}
