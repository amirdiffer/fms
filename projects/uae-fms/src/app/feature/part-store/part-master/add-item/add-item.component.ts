import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Utility } from '@shared/utility/utility';

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
  supplierAdded:boolean = false
  get itemInfo(): FormArray {
    return this.form.get('itemInfo') as FormArray;
  }

  
  dialogModal:boolean = false;
  dialogOption:dialogOption;
  dialogSetting: IDialogAlert;
  constructor(private _fb:FormBuilder,
              injector: Injector) {
                super(injector); 
              }

  ngOnInit(): void {
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