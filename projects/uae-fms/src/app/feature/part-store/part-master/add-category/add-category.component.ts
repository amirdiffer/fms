import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent extends Utility implements OnInit {
  dialogModal:boolean = false;
  dialogOption:dialogOption;
  dialogSetting: IDialogAlert;
  form: FormGroup;
  submitted:boolean=false;
  constructor(private _fb: FormBuilder,injector: Injector) { super(injector) }

  ngOnInit(): void {
    this.form = this._fb.group({
      categoryName:['',[Validators.required]],
      shortCode:['']
    })
    this.dialogSetting = {
      header: 'Add new category',
      hasError:false,
      isWarning:false,
      message: 'Message is Here',
      confirmButton: 'Yes',
      cancelButton: 'No'
    };
  }
  cancelForm(){
    this.dialogOption = dialogOption.cancel;
    this.dialogSetting.message = 'Are you sure?',
    this.dialogSetting.isWarning = true,
    this.dialogModal = true
  }
  submit(){
    this.form.markAllAsTouched();
    this.submitted = true;
  }
  dialogConfirm(event){
    if(event && this.dialogOption == dialogOption.cancel){
      this.goToList('part-store/part-master')
    }
  }

}


export enum dialogOption{
  success='success',
  error = 'error',
  cancel = 'cancel'
} 