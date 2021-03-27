import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { MovementOverviewFacade } from '@feature/fleet/+state/movement';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRequestComponent extends Utility implements OnInit {
  requestForm: FormGroup;
  submitted = false;
  dialogCancelSetting: IDialogAlert = {
    header: 'Cancel',
    hasError: false,
    isWarning: true,
    message: 'Are you sure you want to cancel?',
    confirmButton: 'Cancel',
    cancelButton: 'No'
  };
  dialogSuccessSetting: IDialogAlert = {
    header: 'Success',
    hasError: false,
    message: 'New Request Successfully Added',
    confirmButton: 'Ok',
  };
  dialogErrorSetting: IDialogAlert = {
    header: 'Error',
    hasError: true,
    message: 'Some Error Occurred',
    confirmButton: 'Ok',
  };
  displayCancelModal = false;
  displaySuccessModal = false;
  displayErrorModal = false;

  assetTypes = [
    { name: 'Asset type 1', id: 1 },
    { name: 'Asset type 2', id: 2 },
    { name: 'Asset type 3', id: 3 },
    { name: 'Asset type 4', id: 4 },
    { name: 'Asset type 5', id: 5 },
    { name: 'Asset type 6', id: 6 }
  ];
  oldAssetSuggests = [
    { name: 'Old asset type 1', id: 1 },
    { name: 'Old asset type 2', id: 2 },
    { name: 'Old asset type 3', id: 3 },
    { name: 'Old asset type 4', id: 4 },
    { name: 'Old asset type 5', id: 5 },
    { name: 'Old asset type 6', id: 6 }
  ];
  constructor(
    private _fb: FormBuilder,
    private facade: MovementOverviewFacade,
    private changeDetector: ChangeDetectorRef,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.requestForm = this._fb.group({
      requestType: ['new'],
      assetType: ['', Validators.compose([Validators.required])],
      reason: ['', Validators.compose([Validators.required])],
      quality: [''],
      oldAssetType: ['']
    });
    this.facade.submitted$.subscribe(x => {
      if (x) {
        this.displaySuccessModal = true;
        this.dialogErrorSetting.hasError=false;
        this.changeDetector.detectChanges();
      }
    });

    this.facade.error$.subscribe(x => {
      if (x?.error) {
        this.displayErrorModal = true;
        this.dialogErrorSetting.hasError=true;
        this.changeDetector.detectChanges();
      }
    })
  }
  filterAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.oldAssetSuggests = [
      { name: 'Old asset type 1', id: 1 },
      { name: 'Old asset type 2', id: 2 },
      { name: 'Old asset type 3', id: 3 },
      { name: 'Old asset type 4', id: 4 },
      { name: 'Old asset type 5', id: 5 },
      { name: 'Old asset type 6', id: 6 }
    ];
  }
  submit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    } else {
      let d = this.requestForm.getRawValue();
      let _data = {
        "requesterId": 11953127,
        "requestType": d.requestType,
        "movementType": "Permanent",
        "assetTypeId": d.assetType.id,
        "reason": d.resone,
        "quantity": d.quality,
        "startDate": "2018-10-18T21:13:06.253Z",
        "endDate": "2008-09-13T21:13:24.636Z"
      };
      this.facade.addMovementRequest(_data);
    }
  }
  showCancelAlert() {
    this.displayCancelModal = true;
  }

  dialogConfirm(confirmed) {
    if (confirmed) {
      this.displaySuccessModal = false;
      this.goToList();
    } else this.displaySuccessModal = false;
  }
}
