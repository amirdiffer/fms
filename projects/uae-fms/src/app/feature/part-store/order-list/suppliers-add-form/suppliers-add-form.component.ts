import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuppliersFacade } from '@feature/part-store/+state/order-list/suppliers';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'suppliers-add-form',
  templateUrl: './suppliers-add-form.component.html',
  styleUrls: ['./suppliers-add-form.component.scss']
})
export class SuppliersAddFormComponent extends Utility implements OnInit {
  @Output() cancel = new EventEmitter();
  form: FormGroup;
  formSubmitted = false;
  isEdit:boolean = false;
  id:number;
  /* Error and Submit Subscription */
  errorSubscription: Subscription;
  submitSubscription: Subscription;

  dialogOption:dialogOption;
  dialogModal = false;
  dialogSetting: IDialogAlert = {
    header: 'Supplier',
    hasError: false,
    isWarning: true,
    hasHeader: true,
    message: 'Are you sure that you want to cancel adding new supplier?',
    confirmButton: 'Yes',
    cancelButton: 'No'
  };


  constructor(private facade: SuppliersFacade, 
              private _fb: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _location: Location,
              private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.facade.reset();
    let activeRoute = this._activatedRoute.snapshot.url;
    if(activeRoute[1].path === "edit-supplier"){
      this.isEdit = true;
      this.id = + activeRoute[activeRoute.length-1].path;
      this.facade.getSpecificSupplier(this.id);
      this.patchValueForm();
    }
    this.form = this._fb.group({
      company: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required ],
      email: ['',Validators.compose([Validators.required , Validators.email]) ],
      address: ['', Validators.required]
    });
    this.errorAndSubmitHandler();
  }

  dialogConfirm(event): void {
    if(event && (this.dialogOption == dialogOption.cancel || this.dialogOption == dialogOption.success)){
      this._location.back();
    }
    this.dialogModal = false;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.dialogOption = dialogOption.success
    const payload = {
      companyName: this.form.value.company,
      address: this.form.value.address,
      agentName: this.form.value.name,
      agentPhoneNumber: this.form.value.phone,
      agentEmail: this.form.value.email
    }
    if(this.isEdit){
      let editPayload = {
        ...payload,
        id:this.id
      };
      this.facade.updateSupplier(editPayload)
    }else{
      this.facade.addSupplier(payload)
    }
  }

  errorAndSubmitHandler() {

    this.submitSubscription = this.facade.submitted$.subscribe((x) => {
      if (x) {
        this.dialogOption = dialogOption.success;
        this.dialogModal = true;
        this.dialogSetting.header = this.isEdit? 'Edit Supplier':'Add New Supplier';
        this.dialogSetting.message = this.isEdit ? 'Supplier Edited Successfully' :'Supplier Added Successfully';
        this.dialogSetting.isWarning = false;
        this.dialogSetting.hasError = false;
        this.dialogSetting.confirmButton = 'OK';
        this.dialogSetting.cancelButton = undefined;
      }
    });

    this.errorSubscription =this.facade.error$.subscribe((x) => {
      if (x?.error) {
        this.dialogOption = dialogOption.error;
        x?.error;
        this.dialogModal = true;
        this.dialogSetting.header =  this.isEdit? 'Edit Supplier':'Add New Supplier';
        this.dialogSetting.hasError = true;
        this.dialogSetting.message = 'Error occurred in progress';
        this.dialogSetting.cancelButton = undefined;
        this.dialogSetting.confirmButton = 'OK';
      }
    });
  }

  cancelForm(){
    this.dialogOption = dialogOption.cancel;
    this.dialogSetting = {
      header: 'Supplier',
      hasError: false,
      isWarning: true,
      message: 'Are you sure that you want to cancel?',
      confirmButton: 'Yes',
      cancelButton: 'No'
    }
    this.dialogModal = true
  }

  patchValueForm(){
    this.facade.specificSupplier$.subscribe(x => {
      if(x){
        this.form.patchValue({
          company: x.companyName,
          name: x.agentName,
          phone: x.agentPhoneNumber,
          email: x.agentEmail,
          address: x.address
        })
      }
    })
  }
}


export enum dialogOption{
  success='success',
  error = 'error',
  cancel = 'cancel'
}
