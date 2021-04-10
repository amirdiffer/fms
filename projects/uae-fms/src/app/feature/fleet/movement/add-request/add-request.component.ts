import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Injector
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import {
  MovementOverviewFacade,
  MovementRequestsFacade
} from '@feature/fleet/+state/movement';
import { Utility } from '@shared/utility/utility';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import { AssetTypeFacade } from '@feature/configuration/+state/asset-configuration';
import { MovementService } from '@feature/fleet/movement/movement.service';

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
    confirmButton: 'Ok'
  };
  dialogErrorSetting: IDialogAlert = {
    header: 'Error',
    hasError: true,
    message: 'Some Error Occurred',
    confirmButton: 'Ok'
  };
  displayCancelModal = false;
  displaySuccessModal = false;
  displayErrorModal = false;

  assetTypes = [];
  oldAssetSuggests = [];
  oldAssetSuggestsB;

  constructor(
    private _fb: FormBuilder,
    private facade: MovementRequestsFacade,
    private overViewFacade: MovementOverviewFacade,
    private changeDetector: ChangeDetectorRef,
    private assetFacade: AssetMasterFacade,
    private _movementService: MovementService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.assetFacade.loadAll();
    this.requestForm = this._fb.group({
      requestType: ['NEW'],
      assetType: [null, Validators.compose([Validators.required])],
      reason: ['', Validators.compose([Validators.required])],
      quality: [''],
      oldAssetId: ['']
    });
    this.facade.submitted$.subscribe((x) => {
      if (x) {
        this.displaySuccessModal = true;
        this.facade.loadAll();
        this.overViewFacade.loadAll();
        this.dialogErrorSetting.hasError = false;
        this.changeDetector.detectChanges();
      }
    });

    this.assetFacade.assetMaster$.subscribe((x) => {
      this.oldAssetSuggestsB = x.map((y) => ({
        id: y.id,
        name: y['makeName'] + ' ' + y['modelName']
      }));
    });

    this._movementService.assetTypes().subscribe((x) => {
      this.assetTypes = x.message.map((y) => ({ id: y.id, name: y['name'] }));
      if (this.assetTypes.length)
        this.requestForm.get('assetType').patchValue(this.assetTypes[0]);
    });

    this.facade.error$.subscribe((x) => {
      if (x?.error) {
        this.displayErrorModal = true;
        this.dialogErrorSetting.hasError = true;
        this.changeDetector.detectChanges();
      }
    });
  }

  filterAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.oldAssetSuggests = this.oldAssetSuggestsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.indexOf(event.query) >= 0
    );
  }

  submit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      this.displayErrorModal = true;
      return;
    } else {
      let d = this.requestForm.getRawValue();
      let _data = {
        requesterId: 103,
        requestType: d.requestType,
        movementType: 'PERMANENT',
        oldAssetId: d.oldAssetId.id,
        assetTypeId: d.assetType.id,
        reason: d.reason,
        quantity: d.quality
      };
      if (_data.requestType == 'NEW') _data.oldAssetId = undefined; else _data.quantity = undefined;
      this.facade.addMovementRequest(_data);
    }
  }
  showCancelAlert() {
    this.displayCancelModal = true;
  }

  dialogConfirm(confirmed) {
    if (confirmed) {
      this.displaySuccessModal = false;
      this.facade.reset();
      this.goToList();
    } else this.displaySuccessModal = false;
  }

  successConfirm($event) {
    this.displaySuccessModal = false;
    this.facade.reset();
    this.goToList();
  }
}
