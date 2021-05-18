import { Component, HostListener, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { PartMasterFacade, PartMasterService } from '@feature/part-store/+state/part-master';
import { Utility } from '@shared/utility/utility';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuppliersService } from '../../+state/order-list/suppliers/suppliers.service';

@Component({
  selector: 'anms-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent extends Utility implements OnInit, OnDestroy {
  itemTypes = [
    { name: 'Item type 1', id: 1 },
    { name: 'Item type 2', id: 2 },
    { name: 'Item type 3', id: 3 },
    { name: 'Item type 4', id: 4 },
    { name: 'Item type 5', id: 5 },
    { name: 'Item type 6', id: 6 }
  ];
  form: FormGroup;
  isEdit:boolean=false;
  id:number;
  submited:boolean=false;
  supplierAdded:boolean = false;
  categoryData;


  model$:Observable<any>;
  trim$:Observable<any>;
  color$:Observable<any>;
  supplier$:Observable<any>


  isAsset:boolean = true;
  get itemInfo(): FormArray {
    return this.form.get('itemInfo') as FormArray;
  }


  dialogModal:boolean = false;
  dialogOption:dialogOption;
  dialogSetting: IDialogAlert;


  getCategoryDataSubscription$:Subscription;
  documentFile = [];

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this._partMasterService.setCategoryData({
      ...this.categoryData,
      isEdit:false,
      isItemForm:false,

    });
  }
  constructor(
              private _fb:FormBuilder,
              private _partMasterService : PartMasterService,
              private _partMasterFacade:PartMasterFacade,
              private _router: Router,
              private _supplierService : SuppliersService,
              injector: Injector,) {
                super(injector);
                this._partMasterFacade.resetItem();
              }

  ngOnInit(): void {
    this.form = this._fb.group({
      itemInfo: new FormArray([this.createItemInfoFormArray()])
    });
    this.getCategoryDataSubscription$ = this._partMasterService.getCategoryData().subscribe(x => {
      if (x == null){
        this._router.navigate(['/part-store/part-master'])
      }else{
        x.isEdit ? this.isEdit = true : this.isEdit = false;
        x.id ? this.id = x.id : null;
        if(x.fleetType !== 'ASSET'){
          console.log(x)
          this.isAsset = false;
          this.loadModel(x.makes);
          this.itemInfo.controls.map(formGroup => {formGroup.get('trim').clearValidators()});
          if(this.isEdit){
            this._partMasterFacade.loadSpecificItemOfSubAsset(this.id)
          }
        }else{
          this.isAsset = true ;
          this.loadTrim(x.makes)
          this.itemInfo.controls.map(formGroup => {formGroup.get('model').clearValidators()});
          if(this.isEdit){
            this._partMasterFacade.loadSpecificItemOfAsset(this.id)
          }
        }
        this.categoryData=x
        this.loadSupplier();
        this.errorHandele(this._partMasterFacade)
      }
    });

    this._partMasterFacade.specificItem$.subscribe(
      x => {
        if(x){
          this.itemInfo.controls.map(formGroup => {formGroup.patchValue({
            itemName: x.name,
            trim:x.trimId ? {id:x.trimId}: null,
            model:x.modelId ? x.modelId : null,
            threshold: x.needToOrderThreshold,
            color:x.trimColorId ? x.trimColorId : null,
            uploadFile: {files:x.documentIds}
          })});
          this.documentFile = x.documentIds;
          for (let index = 0; index < x.suppliers.length; index++) {
            this.supplier(0).controls[index].patchValue({
              supplier:x.suppliers[index].id
            })
            if(index == x.suppliers.length -1 ){
              break;
            }
            this.supplier(0).push(this.createSupplierFormArray());
          }

        }
      }
    )

    this.dialogSetting = {
      header: 'Add new item',
      hasError:false,
      isWarning:false,
      message: 'Message is Here',
      confirmButton: 'Yes',
      cancelButton: 'No'
    };
  }
  createItemInfoFormArray(){
    return this._fb.group({
      itemName: ['', [Validators.required]],
      trim:['',[Validators.required]],
      model:['',[Validators.required]],
      color:[null],
      threshold:['',[Validators.required]],
      suppliers:new FormArray([this.createSupplierFormArray()]),
      uploadFile:[null]
    });
  }

  createSupplierFormArray(){
    return this._fb.group({
      supplier:['',[Validators.required]]
    })
  }

  addItemInfo(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      this.submited =true;
      return
    };
    this.itemInfo.push(this.createItemInfoFormArray());
  }

  removeItemInfo(index){
    this.itemInfo.removeAt(index);
  }

  supplier (index) : FormArray {
    return this.itemInfo.at(index).get('suppliers') as FormArray
  }

  addSupplier(index){
    if(this.supplier(index).invalid){
      this.supplier(index).markAllAsTouched();
      this.supplierAdded = true;
      return;
    }
    this.supplier(index).push(this.createSupplierFormArray());
  }

  removeSupplier(index , j){
    this.supplier(index).removeAt(j);
  }

  loadSupplier(){
    this.supplier$ = this._supplierService.loadAllSupplier().pipe(
      map(result => {
        return result.message
      })
    )
  }

  loadTrim(makes){
    let trimList = []
    makes.map(
      make => {
        make.models.map(
          model => {
            model.trims.map(
              trim =>{
                trimList.push(trim);
                let colorList=[]
                trim.colors.map(
                  colors => {
                    colorList.push(colors)
                  }
                );
                this.loadColor(colorList)
              }
            )
          }
        )
      }
    );
    this.trim$ = of(trimList)
  }

  selectTrim(event){
    this.loadColor(event.colors)
  }

  loadColor(color){
    this.color$ = of(color)
  }

  loadModel(makes){
    let models = () => {
      let model =[];
      makes.map(
        make => {
          make.models.map(m => {
            model.push(m)
          })
        }
      );
      return model
    }
    this.model$ = of(models())    
  }
  dialogConfirm(event){
    if(event && (this.dialogOption == dialogOption.cancel || this.dialogOption == dialogOption.success)){
      this._partMasterService.setCategoryData({
        ...this.categoryData,
        isEdit:false,
        isItemForm:false,
      });
      this.goToList('part-store/part-master');
    }
    this.dialogModal = false;
  }

  cancelForm(){
    this.dialogOption = dialogOption.cancel;
    this.dialogSetting.message = 'Are you sure?',
    this.dialogSetting.isWarning = true,
    this.dialogSetting.hasError = false,
    this.dialogSetting.confirmButton= 'Yes',
    this.dialogSetting.cancelButton= 'No',
    this.dialogModal = true
  }

  submit(){
    this.submited = true;
    this.form.markAllAsTouched();
    if(this.form.invalid){
      return;
    }
    this.dialogOption = dialogOption.success
    const formValue = this.form.getRawValue();
    if(this.categoryData.fleetType === 'ASSET'){
      let data = {
        categoryId: this.categoryData.categoryId,
        name: formValue.itemInfo[0].itemName,
        trimId: formValue.itemInfo[0].trim.id,
        trimColorId: formValue.itemInfo[0].color,
        needToOrderThreshold: +formValue.itemInfo[0].threshold,
        supplierIds:formValue.itemInfo[0].suppliers.map(supplier => { return supplier.supplier}) ,
        documentIds: formValue.itemInfo[0].uploadFile != null ? formValue.itemInfo[0].uploadFile.files : []
      };
      if(this.isEdit){
        let editData = {...data, id:this.id}
        this._partMasterFacade.updateItemOfAsset(editData);
      }else{
        this._partMasterFacade.addItemOfAsset(data);
      }

    }else{
      let data = {
        categoryId: this.categoryData.categoryId,
        name: formValue.itemInfo[0].itemName,
        modelId: formValue.itemInfo[0].model,
        needToOrderThreshold: +formValue.itemInfo[0].threshold,
        supplierIds:formValue.itemInfo[0].suppliers.map(supplier => { return supplier.supplier}) ,
        documentIds: formValue.itemInfo[0].uploadFile.files
      };
      if(this.isEdit){
        let editData = {...data, id:this.id}
        this._partMasterFacade.updateItemOfSubAsset(editData);
      }else{
        this._partMasterFacade.addItemOfSubAsset(data);
      }
    }
  }

  uploadFile(event){
    event
    this.itemInfo.controls.map(formGroup => {formGroup.get('uploadFile').patchValue(event)})
  }

  errorHandele(facade){
    facade.submittedItem$.subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogSetting.header = this.isEdit ? 'Edit Category' : 'Add New Category';
        this.dialogSetting.message = this.isEdit ? 'Changes Saved Successfully' : 'Category Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });
    facade.errorItem$.subscribe((x) => {
      if (x?.error) {
        this.dialogModal = true;
        this.dialogOption == dialogOption.error
        this.dialogSetting.header = this.isEdit ? 'Edit Category' : 'Add new Category';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
  }

  ngOnDestroy(){
    this.getCategoryDataSubscription$.unsubscribe();
  }
}


export enum dialogOption{
  success='success',
  error = 'error',
  cancel = 'cancel'
}

