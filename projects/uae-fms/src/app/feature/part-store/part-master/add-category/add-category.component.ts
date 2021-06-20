import { Component, HostListener, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { PartMasterFacade, PartMasterService } from '@feature/part-store/+state/part-master';
import { Utility } from '@shared/utility/utility';
import { Subscription } from 'rxjs';
import { DialogService } from '@core/dialog/dialog-template.component';

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
              injector: Injector,
              private dialogService: DialogService) {
                super(injector);
                this._partMasterFacade.resetCategory();
                this._partMasterFacade.resetItem();
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
      shortCode:['',[Validators.required]]
    })
  }
  cancelForm(){
    const dialog = this.dialogService.show('warning', 'Update part',
      'Are you sure', 'Yes', 'No');
    dialog.dialogClosed$.subscribe(result => {
      if (result === 'confirm') {
        this._partMasterService.setCategoryData({
          ...this.addCategoryData,
          isEdit:false,
          isForm:false,
        });
        this.goToList('part-store/part-master');
      }
    });
  }
  submit(){
    this.form.markAllAsTouched();
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
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

  errorHandele(submittedFacade){

    submittedFacade.submittedCategory$.subscribe((x) => {
      if (x) {
        const dialog = this.dialogService.show('success', this.isEdit ? 'Edit Category' : 'Add New Category',
          this.isEdit ? 'Changes Saved Successfully' : 'Category Added Successfully',
          'OK', '');
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
            this._partMasterService.setCategoryData({
              ...this.addCategoryData,
              isEdit:false,
              isForm:false,
            });
            this.goToList('part-store/part-master');
          }
        });
      }
    });
    submittedFacade.errorCategory$.subscribe((x) => {
      if (x?.error) {
        const dialog = this.dialogService.show('danger', this.isEdit ? 'Edit Category' : 'Add new Category',
          'Error occurred in progress', 'OK', '');
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
          } else {
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.partMasterFacadeSubscription$.unsubscribe();
    this.getCategoryDataSubscription$.unsubscribe();
  }

}
