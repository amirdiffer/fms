import { Component, HostListener, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { PartMasterFacade, PartMasterService } from '@feature/part-store/+state/part-master';
import { Utility } from '@shared/utility/utility';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent extends Utility implements OnInit , OnDestroy {
  form: FormGroup;
  addCategoryData;
  isEdit:boolean = false;
  submitted:boolean=false;
  id;
  editCategoryData;

  partMasterFacadeSubscription$:Subscription;
  getCategoryDataSubscription$:Subscription;
  /* Dialog */
  dialogOption:dialogOption;
  dialogSetting: IDialogAlert;
  dialogModal:boolean = false;

  /* Browser Back */
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this._partMasterService.setCategoryData({
      ...this.addCategoryData,
      isEdit:false,
      isForm:false,
    })
  }
  constructor(private _fb: FormBuilder,
              private _partMasterService : PartMasterService,
              private _partMasterFacade: PartMasterFacade,
              private _router : Router,
              private _activatedRoute:ActivatedRoute,
              injector: Injector) { 
                super(injector);
                this._partMasterFacade.resetCategory();
               }

  ngOnInit(): void {
    this.partMasterFacadeSubscription$ = this._partMasterFacade.specificCategory$.subscribe(x => {
      if(x && this.isEdit){
        this.editCategoryData = x
        this.form.patchValue({
          categoryName:x.name,
          shortCode:x.shortCode
        });
      }
    })
    this.errorHandele(this._partMasterFacade);
    this.getCategoryDataSubscription$ = this._partMasterService.getCategoryData().subscribe(x => {
      if (x == null){
        this._router.navigate(['/part-store/part-master'])
      }else{
        if(x.isEdit){
          this.isEdit = true;
          this.id = x.id
          x.fleetType =='ASSET'
          ?
          this._partMasterFacade.loadSpecificCategoryOfAsset(this.id)
          :
          this._partMasterFacade.loadSpecificCategoryOfSubAsset(this.id)
        }
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
    this.dialogModal = true;
  }
  submit(){
    this.form.markAllAsTouched();
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.dialogOption = dialogOption.success;
    const getFormRawVal = this.form.getRawValue();

    if(this.isEdit){
      const data = {
        id:this.id,
        fleetType:this.addCategoryData.fleetType,
        fleetConfigurationId:this.editCategoryData.fleetConfigurationId,
        name:getFormRawVal.categoryName,
        shortCode:getFormRawVal.shortCode
      }
      this.addCategoryData.fleetType =='ASSET'
      ?
      this._partMasterFacade.updateCategoryOfAsset(data)
      :
      this._partMasterFacade.updateCategoryOfSubAsset(data)
      
    }else{
      const data = {
        fleetType:this.addCategoryData.fleetType,
        fleetConfigurationId:this.addCategoryData.fleetConfigurationId,
        name:getFormRawVal.categoryName,
        shortCode:getFormRawVal.shortCode
      }
      this._partMasterFacade.addCategory(data);
    }
  }
  dialogConfirm(event){
    if(event && (this.dialogOption == dialogOption.cancel || this.dialogOption == dialogOption.success)){
      this._partMasterService.setCategoryData({
        ...this.addCategoryData,
        isEdit:false,
        isForm:false,
      })
      this.goToList('part-store/part-master');
    }
    this.dialogModal = false;

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

  ngOnDestroy(): void {
    this.partMasterFacadeSubscription$.unsubscribe();
    this.getCategoryDataSubscription$.unsubscribe();
  }

}


export enum dialogOption{
  success='success',
  error = 'error',
  cancel = 'cancel'
} 