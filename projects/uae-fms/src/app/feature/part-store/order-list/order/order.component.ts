import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { PartMasterFacade } from '@feature/part-store/+state/part-master';
import { Utility } from '@shared/utility/utility';
import { Observable, of } from 'rxjs';
import { AssetTypeFacade, SubAssetTypeFacade } from '@feature/configuration/+state/fleet-configuration';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SuppliersFacade } from '@feature/part-store/+state/order-list/suppliers';
import { OrderListFacade } from '@feature/part-store/+state/order-list/order';
import { Location } from '@angular/common';

@Component({
  selector: 'order-form',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends Utility implements OnInit , OnDestroy {
  searchIcon = 'assets/icons/search.svg';
  isAsset:boolean=true;
  isEdit:boolean=false;
  id:number;
  fleetType;
  partId:number;
  form: FormGroup;

  formSubmitted = false;

  itemList:any[]=[]
  itemFilterd:any[]=[]

  /* Observable */
  fleetConfigurationType$ : Observable<any> = of([])
  category$: Observable<any> = of([]);
  suppliers$: Observable<any> = of([]);


  /* Subscription */
  itemSubscription:Subscription;
  submitSubscription:Subscription;
  errorSubscription:Subscription;
  specificOrderSubscription:Subscription;


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

 

  constructor(
    private _fb: FormBuilder,
    private _fleetConfigurationAsset:AssetTypeFacade ,
    private _fleetConfigurationSubAsset: SubAssetTypeFacade,
    private _facadePartMaster : PartMasterFacade,
    private _facadeSupplier : SuppliersFacade,
    private _facadeOrderList : OrderListFacade,
    private _activatedRoute : ActivatedRoute,
    private _location: Location,
    private injector: Injector
  ) {
    super(injector);
    
  }


  ngOnInit(): void {
    this._facadeOrderList.reset();
    let activeRoute = this._activatedRoute.snapshot.url;
    
    activeRoute[activeRoute.length - 2].path === 'edit-order' ? 
    (
      this.isEdit =true , 
      this.id = +this._activatedRoute.snapshot.params.id,
      this.fleetType = this._activatedRoute.snapshot.url[this._activatedRoute.snapshot.url.length -3].path
    ):
    (
      this.isEdit=false,
      this.fleetType = this._activatedRoute.snapshot.url[this._activatedRoute.snapshot.url.length -2].path
    )
    this.fleetType === 'asset'? this.isAsset = true:this.isAsset = false;
    this.errorAndSubmitHandler();
    if(!this.isEdit && this._activatedRoute.snapshot.parent.params.id){
      this.partId = +this._activatedRoute.snapshot.parent.params.id;
    }
    console.log(this.fleetType)

    /* Form Builder */
    this.form = this._fb.group({
      fleetConfigurationType: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      item: ['', Validators.required],
      supplier: ['', Validators.required],
      hasReminder: false
    });

    /* Edit Form */
    


    /* Load Fleet Configuration */
    switch (this.fleetType) {
      case 'sub-asset':
        this._fleetConfigurationSubAsset.loadAll();
        this.fleetConfigurationType$ = this._fleetConfigurationSubAsset.subAssetType$.pipe(
          map(x=>{
            if(x){
              return x
            }
          })
        );
        break;
    
      case 'asset':
        this._fleetConfigurationAsset.loadAll();
        this.fleetConfigurationType$ = this._fleetConfigurationAsset.assetType$.pipe(
          map(x=>{
            if(x){
              return x
            }
          })
        );
        break;
    };


    /* Load Supplier Async */
    this._facadeSupplier.loadAll();
    this.suppliers$ = this._facadeSupplier.suppliers$.pipe(
      map(x=>{
        if (x){
          return x
        }
      })
    );

    this.patchValueForm();
    
  }


  dialogConfirm(event){
    if(event && (this.dialogOption == dialogOption.cancel || this.dialogOption == dialogOption.success)){
      this._location.back();
    }
    this.dialogModal = false;
  }

  cancelForm(){
    this.dialogOption = dialogOption.cancel;
    this.dialogSetting = {
      header: 'Order',
      hasError: false,
      isWarning: true,
      message: 'Are you sure that you want to cancel?',
      confirmButton: 'Yes',
      cancelButton: 'No'
    }
    this.dialogModal = true;

  }

  submitForm(){
    this.formSubmitted = true;
    this.form.markAllAsTouched();
    if(this.form.invalid)return;
    this.dialogOption = dialogOption.success;
    let formData = this.form.getRawValue();
    let payload = {
      itemId:formData.item.id,
      supplierId:formData.supplier,
      price:formData.price,
      quantity:formData.quantity,
      description:formData.description,
      hasReminder:formData.supplier,
    }
    if(this.isEdit){
      let editPayload = {
        ...payload,
        id:this.id
      };
      switch (this.fleetType) {
        case 'asset':
          this._facadeOrderList.updateOrderOfAsset(editPayload)
          break;
        case 'sub-asset':
          this._facadeOrderList.updateOrderOfSubAsset(editPayload)
          break;
      }

    }else{
      switch (this.fleetType) {
        case 'asset':
          this._facadeOrderList.addOrderPartAsset(payload)
          break;
        case 'sub-asset':
          this._facadeOrderList.addOrderPartSubAsset(payload)
          break;
      }
    }
  }

  onChangeType(event){
    this.form.get('item').reset();
    this._facadePartMaster.resetCategory();
    this._facadePartMaster.resetItem();
    switch (this.fleetType) {
      case 'sub-asset':
        this._facadePartMaster.loadAllCategoryOfSubAsset(event);
        this.category$ = this._facadePartMaster.partMasterSubAssetCategory$.pipe(
          map(x => {
            if(x){
              return x
            }
          })
        )
        break;
    
      case 'asset':
        this._facadePartMaster.loadAllCategoryOfAsset(event);
        this.category$ = this._facadePartMaster.partMasterAssetCategory$.pipe(
          map(x => {
            if(x){
              return x
            }
          })
        )
        break;
    };

  }

  onChangeCategory(event){
    this.form.get('item').reset();
    this._facadePartMaster.resetItem();
    switch (this.fleetType) {
      case 'sub-asset':
        this._facadePartMaster.loadAllItemOfSubAsset(event);
        break;
    
      case 'asset':
        this._facadePartMaster.loadAllItemOfAsset(event);
        break;
    };
    this.itemSubscription = this._facadePartMaster.partMasterItem$.subscribe(
      x =>{
        if(x){
          this.itemList = x;
        }
      }
    )
  }

  searchItem(event){
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



  errorAndSubmitHandler() {
    this.submitSubscription = this._facadeOrderList.submitted$.subscribe((x) => {
      if (x) {
        this.dialogOption = dialogOption.success;
        this.dialogModal = true;
        this.dialogSetting.header = this.isEdit ? 'Edit Order':'Add New Order';
        this.dialogSetting.message = this.isEdit? 'Order edited Successfully' :'Order added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });

    this.errorSubscription = this._facadeOrderList.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogOption = dialogOption.error;
        x?.error;
        this.dialogModal = true;
        this.dialogSetting.header = this.isEdit ? 'Edit Order' :'Add new Order';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
  }

  patchValueForm(){
    if(this.partId){
      console.log(this.fleetType)
      console.log(this.partId)
      switch (this.fleetType) {
        case 'asset':
          this._facadePartMaster.loadSpecificItemOfAsset(+this.partId)
          break;
      
        case 'sub-asset':
          this._facadePartMaster.loadSpecificItemOfSubAsset(+this.partId)
          break;
      };
      this._facadePartMaster.specificItem$.subscribe(x => {
        if(x) {
          console.log(x)
          this.onChangeType(x.assetConfigurationId);
          this.onChangeCategory(x.categoryId)
          this.form.patchValue({
            fleetConfigurationType: x.assetConfigurationId,
            category: x.categoryId,
            item: {id:x.id , name:x.name},
          });
          this.form.controls['fleetConfigurationType' ].disable();
          this.form.controls['category' ].disable();
          this.form.controls['item' ].disable();
        }
      })
    }
    if(this.isEdit){
      switch (this.fleetType) {
        case 'asset':
          this._facadeOrderList.getSpecificOrderPartAsset(this.id)
          break;
      
        case 'sub-asset':
          this._facadeOrderList.getSpecificOrderPartSubAsset(this.id)
          break;
      };

      this.specificOrderSubscription = this._facadeOrderList.specificOrder$.subscribe(x => {
        if(x){
          this.onChangeType(x.fleetConfigurationId);
          this.onChangeCategory(x.categoryId)
          this.form.patchValue({
            fleetConfigurationType: x.fleetConfigurationId,
            quantity: x.quantity,
            price:x.price,
            description: x.description,
            category: 
            x.categoryId,
            item: {id:x.itemId , name:x.itemName},
            supplier: x.supplierId,
            hasReminder: x.hasReminder
          })
        }
      })
    }
  }

  ngOnDestroy(){
    this._fleetConfigurationAsset.resetEntities();
  }
  
}


export enum dialogOption{
  success='success',
  error = 'error',
  cancel = 'cancel'
}
