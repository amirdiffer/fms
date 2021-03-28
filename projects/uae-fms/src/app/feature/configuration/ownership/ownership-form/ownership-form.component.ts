import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';
import { map } from 'rxjs/operators';
import { OwnershipFacade } from '../../+state/ownership';

@Component({
  selector: 'anms-ownership-form',
  templateUrl: './ownership-form.component.html',
  styleUrls: ['./ownership-form.component.scss']
})
export class OwnershipFormComponent extends Utility implements OnInit {
  ownerShip_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.ownership', type: 1, field: 'Ownership' },
      { lable: 'tables.column.Owner', type: 1, field: 'Owner' },
      { lable: 'tables.column.fleet_it_code', type: 1, field: 'Fleet_IT_Code' },
      {
        lable: 'tables.column.duration',
        type: 1,
        field: 'Duration',
        sortable: true
      },
      { lable: 'tables.column.purpose', type: 1, field: 'Purpose' },
      { lable: 'tables.column.owner_email', type: 1, field: 'Owner_Email' },
      {
        lable: 'tables.column.owner_phone_no',
        type: 1,
        field: 'Owner_Phone_No'
      },
      {
        lable: '<img src="../../../../assets/icons/car-solid.svg">',
        type: 1,
        isIconLable: true,
        field: 'car',
        width: 100,
        sortable: true
      }
    ],
    data: []
  };

  ownerShip$ = this.facade.ownership$.pipe(
    map((x) =>
      x.map((item) => {
        return {
          Ownership: item.type,
          Owner: item.name,
          Fleet_IT_Code: item.fleetITCode,
          Duration: item.duration,
          Purpose: item.purpose,
          Owner_Email: item.email,
          Owner_Phone_No: item.phoneNumber,
          car: item.numOfOwnedAssets || 0
        };
      })
    )
  );

  ownerShipForm: FormGroup;
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
    message: 'New ownership Successfully Added',
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
    injector: Injector,
    private _fb: FormBuilder,
    private facade: OwnershipFacade,
    private changeDetector: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.facade.loadAll();

    this.ownerShipForm = this._fb.group({
      type: ['EXTERNAL'],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      purpose: [''],
      fleetITCode: ['', [Validators.required]],
      duration: ['']
    });

    this.facade.submitted$.subscribe((x) => {
      if (x) {
        this.displaySuccessModal = true;
        this.dialogErrorSetting.hasError = false;
        this.changeDetector.detectChanges();
      }
    });

    this.facade.error$.subscribe((x) => {
      if (x?.error) {
        this.displayErrorModal = true;
        this.dialogErrorSetting.hasError = true;
        this.changeDetector.detectChanges();
      }
    });
  }
  submit() {
    this.submitted = true;
    if (this.ownerShipForm.invalid) {
      return;
    } else {
      this.facade.addOwnership(this.ownerShipForm.value);
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
