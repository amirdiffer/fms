import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { PartMasterService } from '@feature/part-store/+state/part-master';
import { Utility } from '@shared/utility/utility';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'anms-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent extends Utility implements OnInit {
  itemTypes = [
    { name: 'Item type 1', id: 1 },
    { name: 'Item type 2', id: 2 },
    { name: 'Item type 3', id: 3 },
    { name: 'Item type 4', id: 4 },
    { name: 'Item type 5', id: 5 },
    { name: 'Item type 6', id: 6 }
  ];
  form: FormGroup;
  submited:boolean=false;
  supplierAdded:boolean = false;
  categoryData;
  manufacturer$:Observable<any>
  model$:Observable<any>

  get itemInfo(): FormArray {
    return this.form.get('itemInfo') as FormArray;
  }

  
  dialogModal:boolean = false;
  dialogOption:dialogOption;
  dialogSetting: IDialogAlert;
  constructor(
              private _fb:FormBuilder,
              private _partMasterService : PartMasterService,
              private _router: Router,
              injector: Injector,) {
                super(injector); 
              }

  ngOnInit(): void {
    this._partMasterService.getCategoryData().subscribe(x => {
      if (x == null){
        this._router.navigate(['/part-store/part-master'])
      }else{
        this.categoryData=x
        this.loadMake(x.makes)
        
      }
    });
    this.form = this._fb.group({
      itemInfo: new FormArray([this.createItemInfoFormArray()])
    });
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
      make:['',[Validators.required]],
      model:['',[Validators.required]],
      suppliers:new FormArray([this.createSupplierFormArray()]),
      uploadFile:['']
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

  loadMake(make:IMake[]){
    this.manufacturer$ = of(make);
  }

  selectMake(event){
    this.loadModel(event.models)
  }

  loadModel(model:IModel[]){
    this.model$ = of(model)
  }
  
  dialogConfirm(event){
    if(event && this.dialogOption == dialogOption.cancel){
      this.goToList('part-store/part-master')
    }
  }

  cancelForm(){
    this.dialogOption = dialogOption.cancel;
    this.dialogSetting.message = 'Are you sure?',
    this.dialogSetting.isWarning = true,
    this.dialogModal = true
  }

  submit(){
    this.submited = true;
    this.form.markAllAsTouched()
  }
}


export enum dialogOption{
  success='success',
  error = 'error',
  cancel = 'cancel'
}

export interface IMake {
  id?:number;
  name?:string;
  description?:string;
  models?:IModel[]
}

export interface IModel {
  id?:number;
  name?:string;
  description?:string;
  trims:any[]
}