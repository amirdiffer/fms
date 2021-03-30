import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utility } from '@shared/utility/utility';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';

@Component({
  selector: 'anms-add-request',
  templateUrl: './add-temporary-request.component.html',
  styleUrls: ['./add-temporary-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTemporaryRequestComponent extends Utility implements OnInit {
  dialogModal = false;

  dialogSetting: IDialogAlert = {
    header: 'Add New Request',
    hasError: false,
    message: 'Message is Here',
    confirmButton: 'Register Now',
    cancelButton: 'Cancel'
  };

  submited = false;
  requestForm: FormGroup;
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
  constructor(private _fb: FormBuilder, private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.requestForm = this._fb.group({
      requestType: ['new'],
      assetType: [''],
      resone: [''],
      quality: [''],
      oldAssetType: [''],
      duration: ['']
    });
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

  dialogConfirm(event): void {
    this.dialogModal = false;
    if (event) {
      this.router.navigate(['/fleet/movement/temporary']).then();
    }
  }

  cancel(): void {
    this.dialogModal = true;
    this.dialogSetting.message =
      'Are you sure that you want to cancel adding new request?';
    this.dialogSetting.isWarning = true;
    this.dialogSetting.cancelButton = 'No';
    this.dialogSetting.confirmButton = 'Yes';
  }

  submit(): void {
    this.submited = true;
    if (this.requestForm.invalid) {
      return;
    }

    this.dialogModal = true;
    this.dialogSetting.message = 'Request successfully added';
    this.dialogSetting.isWarning = false;
    this.dialogSetting.cancelButton = undefined;
    this.dialogSetting.confirmButton = 'OK';
  }
}
