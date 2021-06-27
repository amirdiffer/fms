import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { PartListFacade } from '@feature/part-store/+state/part-list';
import { Utility } from '@shared/utility/utility';
import { Subscription } from 'rxjs';
import { DialogService } from '@core/dialog/dialog-template.component';

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

  submitted:boolean = false;
  constructor(private _activatedRoute: ActivatedRoute,
              private _router:Router,
              private _facadePartList: PartListFacade,
              private _fb: FormBuilder,
              injector: Injector,
              private dialogService: DialogService) {
                super(injector);
                this._facadePartList.resetPartAssetState();
                this._facadePartList.resetPartSubAssetState();
               }

  ngOnInit(): void {
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
          if(x){
            this.form.patchValue({
              quantity:x.quantity,
              price:x.price,
              warrantyStartDate:new Date(x.warrantyExpireDate),
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
        this.partSubscription = this._facadePartList.specificSubAssetPart$.subscribe();
        break;
    }
  }

  cancelForm(){
    const dialog = this.dialogService.show('warning', 'Update a part',
      'Are you sure?', 'Yes', 'No');
    dialog.dialogClosed$.subscribe(result => {
      if (result === 'confirm') {
        this._router.navigate(['../../'] ,
          {relativeTo:this.route , queryParams: { fleetType: this.fleetType.toLowerCase()}}).then();
      }
    });
  }

  submit(){
    this.submitted=true;
    this.form.markAllAsTouched();
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
        const dialog = this.dialogService.show('success', 'Update part',
          'Part Updated Successfully', 'OK', '');
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
            this._router.navigate(['../../'] ,
              {relativeTo:this.route , queryParams: { fleetType: this.fleetType.toLowerCase()}}).then();
          }
        });
      }
    });
    (this.fleetType === 'asset' ? this._facadePartList.errorAssetPart$ :  this._facadePartList.errorAssetPart$).subscribe((x) => {
      if (x?.error) {
        const dialog = this.dialogService.show('danger', 'Update part',
          'Error occurred in progress', 'OK', '');
        dialog.dialogClosed$.subscribe(result => {
          if (result === 'confirm') {
          } else {
          }
        });
      }
    });

  }

  ngOnDestroy(){
    this.partSubscription.unsubscribe();
  }

}
