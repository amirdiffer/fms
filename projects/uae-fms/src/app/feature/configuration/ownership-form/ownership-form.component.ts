import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogAlert } from '@core/alert-dialog/alert-dialog.component';
import { TableSetting } from '@core/table';
import { Utility } from '@shared/utility/utility';

@Component({
  selector: 'anms-ownership-form',
  templateUrl: './ownership-form.component.html',
  styleUrls: ['./ownership-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    data: [
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793',
        car: '466'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793',
        car: '466'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793',
        car: '346'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793',
        car: '34'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793',
        car: '474'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793',
        car: '87'
      }
    ]
  };
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
    message: 'New ownership Successfully Added'
  };
  dialogErrorSetting: IDialogAlert = {
    header: 'Error',
    hasError: true,
    message: 'Some Error Occurred'
  };
  displayCancelModal = false;
  displaySuccessModal = false;
  displayErrorModal = false;

  constructor(injector: Injector, private _fb: FormBuilder) {
    super(injector);
  }

  ngOnInit(): void {
    this.ownerShipForm = this._fb.group({
      ownershipType: ['external'],
      owner: ['', [Validators.required]],
      ownerEmail: ['', [Validators.required, Validators.email]],
      ownerPhone: [''],
      purpose: [''],
      fleetITCode: ['', [Validators.required]],
      duration: ['']
    });
  }
  submit() {
    this.submitted = true;
    if (this.ownerShipForm.invalid) {
      return;
    } else {
      this.displayErrorModal = true;
      setTimeout(() => {
        this.displayErrorModal = false;
        this.goToList();
      }, 2000);
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
