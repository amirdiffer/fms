import { Component, OnInit, Inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetMasterFacade } from '@feature/fleet/+state/assets/asset-master';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { Utility } from '@shared/utility/utility';
import { OperatorFacade } from '@feature/fleet/+state/operator';
import { OrganizationFacade } from '@feature/fleet/+state/organization';
import { MovementService } from '@feature/fleet/movement/movement.service';
import { MovementRequestsFacade } from '@feature/fleet/+state/movement/permanent/requests';

@Component({
  selector: 'anms-movement-confirm',
  templateUrl: './movement-confirm.component.html',
  styleUrls: ['./movement-confirm.component.scss']
})
export class MovementConfirmComponent extends Utility implements OnInit {
  confirmForm: FormGroup;
  assetSuggests = [];
  assetSuggestsB;
  operatorSuggests = [];
  operatorSuggestsB;
  organizationSuggests = [];
  organizationSuggestsB;
  submitted = false;
  dialogSuccessSetting: IDialogAlert = {
    header: 'Success',
    hasError: false,
    message: 'Assigned Successfully',
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

  constructor(
    private _fb: FormBuilder,
    private _assetFacade: AssetMasterFacade,
    private _operatorFacade: OperatorFacade,
    private _orgFacade: OrganizationFacade,
    private _requestFacade: MovementRequestsFacade,
    private _movementService: MovementService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MovementConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.confirmForm = this._fb.group({
      asset: ['', Validators.compose([Validators.required])],
      department: ['', Validators.compose([Validators.required])],
      operator: ['', Validators.compose([Validators.required])],
      comment: ['', Validators.compose([Validators.required])],
      movementType: ['temporary'],
      startDate: [''],
      startTime: [''],
      endDate: [''],
      endTime: [''],
      gps: ['', Validators.compose([Validators.required])],
      sendNotification: [true],
      fuelCart: [true],
      serialNumber: ['', Validators.compose([Validators.required])]
    });
    this._assetFacade.loadAll();
    this._assetFacade.assetMaster$.subscribe((x) => {
      this.assetSuggestsB = x.map((y) => ({
        id: y.id,
        name: y['makeName'] + ' ' + y['modelName']
      }));
    });

    this._orgFacade.loadAll();
    this._orgFacade.organization$.subscribe((x) => {
      this.organizationSuggestsB = x.map((y) => ({
        id: y.id,
        name: y['organizationName']
      }));
    });

    this._movementService.operators().subscribe((x) => {
      let operator: Array<any> = x.message;
      this.operatorSuggestsB = operator.map((y) => ({
        id: y.id,
        name: y['firstName'] + ' ' + y['lastName']
      }));
    });

    this._requestFacade.assigned$.subscribe((x) => {
      if (x) {
        this.displaySuccessModal = true;
        this.dialogErrorSetting.hasError = false;
      }
    });

    this._requestFacade.error$.subscribe((x) => {
      if (x?.error) {
        this.displayErrorModal = true;
        this.dialogErrorSetting.hasError = true;
        this.dialogErrorSetting.message = x.error.message!=""?x.error.message:"Error occurred during operation";
      }
    });
  }

  filterAssets(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.assetSuggests = this.assetSuggestsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.toLocaleLowerCase().indexOf(event.query.toLocaleLowerCase()) >= 0
    );
  }

  filterOperators(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.operatorSuggests = this.operatorSuggestsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.toLocaleLowerCase().indexOf(event.query.toLocaleLowerCase()) >= 0
    );
  }

  filterOrganizations(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    this.organizationSuggests = this.organizationSuggestsB.filter(
      (x) =>
        (x.id + '').indexOf(event.query) >= 0 ||
        x.name.toLocaleLowerCase().indexOf(event.query.toLocaleLowerCase()) >= 0
    );
  }

  submit(): void {
    this.submitted = true;
    this.confirmForm.get('department').markAsDirty();
    this.confirmForm.get('operator').markAsDirty();
    this.confirmForm.get('comment').markAsDirty();
    this.confirmForm.get('gps').markAsDirty();
    this.confirmForm.get('serialNumber').markAsDirty();
    if (this.confirmForm.invalid) {
      return;
    }
    let d = this.confirmForm.getRawValue();
    let _data = {
      assetId: d.asset.id,
      operatorId: d.operator.id,
      organizationId: d.department.id,
      departmentId: d.department.id,
      comment: d.comment,
      gpsMeterSource: d.gps,
      shouldSendNotification: d.sendNotification,
      hasFuelCard: d.fuelCart,
      fuelCardSerialNumber: d.serialNumber
    };
    this._requestFacade.assigning(this.data, _data);
  }

  dialogConfirm(confirmed) {
    if (confirmed) {
      this.displaySuccessModal = false;
      this.displayErrorModal = false;
      this._requestFacade.reset();
    } else this.displaySuccessModal = false;
  }

  successConfirm($event) {
    this._requestFacade.reset();
    this.displayErrorModal = false;
    this.displaySuccessModal = false;
    this.dialogRef.close(true);
  }
}
