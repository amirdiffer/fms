import { Route } from '@angular/compiler/src/core';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { PartMasterFacade, PartMasterService } from '@feature/part-store/+state/part-master';
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
  addCategoryData;
  isEdit:boolean = false
  constructor(private _fb: FormBuilder,
              private _partMasterService : PartMasterService,
              private _partMasterFacade: PartMasterFacade,
              private _router : Router,
              injector: Injector) { super(injector) }

  ngOnInit(): void {
    this.errorHandele(this._partMasterFacade)
    this._partMasterService.getCategoryData().subscribe(x => {
      console.log(x)
      if (x == null){
        this._router.navigate(['/part-store/part-master'])
      }else{
        this.addCategoryData=x
      }
    });

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
    if(this.form.invalid){
      return;
    }
    this.dialogOption = dialogOption.success;
    const getFormRawVal = this.form.getRawValue();
    const data = {
      fleetType:this.addCategoryData.fleetType,
      fleetConfigurationId:this.addCategoryData.fleetConfigurationId,
      name:getFormRawVal.categoryName,
      shortCode:getFormRawVal.shortCode
    }
    this._partMasterFacade.addCategory(data)
  }
  dialogConfirm(event){
    if(event && (this.dialogOption == dialogOption.cancel || this.dialogOption == dialogOption.success)){
      this.goToList('part-store/part-master')
    }
    // if(event && this.dialogOption == dialogOption.success){
    //   this.goToList('part-store/part-master')
    // }
  }
  errorHandele(submittedFacade){
    submittedFacade.submittedCategory$.subscribe((x) => {
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
    submittedFacade.errorCategory$.subscribe((x) => {
      if (x?.error) {
        this.dialogModal = true;
        this.dialogSetting.header = this.isEdit ? 'Edit Category' : 'Add new Category';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
  }

}


export enum dialogOption{
  success='success',
  error = 'error',
  cancel = 'cancel'
} 