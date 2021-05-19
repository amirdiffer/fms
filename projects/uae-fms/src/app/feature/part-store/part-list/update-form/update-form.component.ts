import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { PartListFacade } from '@feature/part-store/+state/part-list';
import { Utility } from '@shared/utility/utility';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'anms-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent  extends Utility implements OnInit , OnDestroy {
  calenderIcon = 'assets/icons/calendar-alt-regular.svg';
  id:number;
  fleetType;
  partSubscription:Subscription;
  form:FormGroup;

  dialogModal:boolean = false;
  dialogOption:dialogOption;
  dialogSetting: IDialogAlert;

  submitted:boolean = false;
  constructor(private _activatedRoute: ActivatedRoute,
              private _router:Router,
              private _facadePartList: PartListFacade,
              private _fb: FormBuilder,
              injector: Injector,) {
                super(injector);
                this._facadePartList.resetPartAssetState();
                this._facadePartList.resetPartSubAssetState();
               }

  ngOnInit(): void {

    this.dialogSetting = {
      header: 'Update a part',
      hasError:false,
      isWarning:false,
      message: 'Message is Here',
      confirmButton: 'Yes',
      cancelButton: 'No'
    };


    let getURL = this._activatedRoute.snapshot.url;
    this.id = +getURL[getURL.length -1].path;
    this.fleetType = this._activatedRoute.snapshot.queryParams.fleetType;
    this.form = this._fb.group({
      quantity:[{value:'' ,  disabled: true}],
      price:[{value:'' ,  disabled: true}],
      warrantyStartDate:[{value:'' ,  disabled: true}],
      description:['', [Validators.required]],
      room:['', [Validators.required]],
      aisle:['', [Validators.required]],
      shelf:['', [Validators.required]],
      box:['', [Validators.required]]
    })
    if(this.id){
      switch (this.fleetType) {
        case 'asset':
          this._facadePartList.loadSpecificPartOfAsset(this.id);
          break;
        case 'sub-asset':
          this._facadePartList.loadSpecificPartOfAsset(this.id);
          break;
      }
      this.formPatchValue();
      this.errorHandele();
    }
  };

  formPatchValue(){
    switch (this.fleetType) {
      case 'asset':
        this.partSubscription = this._facadePartList.specificAssetPart$.subscribe(x =>{
          console.log(x)
          if(x){
            this.form.patchValue({
              quantity:x.quantity,
              price:x.price,
              warrantyStartDate: moment.utc(x.startDate*1000, true).local().toDate(),
              description:x.description,
              room:x.room,
              aisle:x.aisle,
              shelf:x.shelf,
              box:x.box,
            })
          }
        });
        break;
      case 'sub-asset':
        this.partSubscription = this._facadePartList.specificSubAssetPart$.subscribe(x =>{
          console.log(x)
        });
        break;
    }
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

  dialogConfirm(event){
    if(event && (this.dialogOption == dialogOption.cancel || this.dialogOption == dialogOption.success)){
      this._router.navigate(['../../'] , {relativeTo:this.route , queryParams: { fleetType: this.fleetType.toLowerCase()}})
    }
    this.dialogModal = false;
  }

  submit(){
    this.submitted=true;
    this.form.markAllAsTouched();
    this.dialogOption = dialogOption.success;
    if(this.form.invalid)return;
    const rawData = this.form.getRawValue();
    const data = {
      id:this.id,
      description:rawData.description,
      room:rawData.room,
      aisle:rawData.aisle,
      shelf:rawData.shelf,
      box:rawData.box,
    }

    switch (this.fleetType) {
      case 'asset':
        this._facadePartList.updatePartOfAsset(data)
        break;
      case 'sub_asset':
        this._facadePartList.updatePartOfAsset(data)
        break;
    }
  }


  errorHandele(){
    (this.fleetType === 'asset' ? this._facadePartList.updatedAssetPart$ :  this._facadePartList.updatedSubAssetPart$).subscribe((x) => {
      if (x) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Update Part';
        this.dialogSetting.message = 'Part Updated Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });
    (this.fleetType === 'asset' ? this._facadePartList.errorAssetPart$ :  this._facadePartList.errorAssetPart$).subscribe((x) => {
      if (x?.error) {
        this.dialogModal = true;
        this.dialogSetting.header = 'Update Part';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });

  }

  ngOnDestroy(){
    this.partSubscription.unsubscribe();
  }

}


export enum dialogOption{
  success='success',
  error = 'error',
  cancel = 'cancel'
}
