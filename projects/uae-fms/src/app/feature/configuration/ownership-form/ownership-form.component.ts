import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Injector
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      { lable: 'tables.column.duration', type: 1, field: 'Duration' },
      { lable: 'tables.column.purpose', type: 1, field: 'Purpose' },
      { lable: 'tables.column.owner_email', type: 1, field: 'Owner_Email' },
      {
        lable: 'tables.column.owner_phone_no',
        type: 1,
        field: 'Owner_Phone_No'
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
        Owner_Phone_No: '50 563 3793'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793'
      }
    ]
  };
  ownerShipForm: FormGroup;
  submited = false;

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
      duration: ['', [Validators.required]]
    });
  }
  submit() {
    this.submited = true;
    if (this.ownerShipForm.invalid) {
      return;
    } else this.goToList();
  }
}
