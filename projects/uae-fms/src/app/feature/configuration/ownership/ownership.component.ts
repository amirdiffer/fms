import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { TableSetting } from '@core/table';
import { OwnershipFacade } from '../+state/ownership';

@Component({
  selector: 'anms-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OwnershipComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
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
        car: '1546'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793',
        car: '145'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793',
        car: '5'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793',
        car: '9995'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793',
        car: '98'
      },
      {
        Ownership: 'Rent',
        Owner: 'Joint-scopes company',
        Fleet_IT_Code: 'REC',
        Duration: '4 Year',
        Purpose: 'Rescue',
        Owner_Email: 'Sample@sample.com',
        Owner_Phone_No: '50 563 3793',
        car: '1666'
      }
    ]
  };

  constructor(
    private facade: OwnershipFacade,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.facade.loadAll();
    this.facade.ownership$.subscribe((data) => {
      if (data) {
        this.ownerShip_Table.data = data.map((item) => {
          return {
            Ownership: item.type,
            Owner: item.name,
            Fleet_IT_Code: item.fleetITCode,
            Duration: item.duration,
            Purpose: item.purpose,
            Owner_Email: item.email,
            Owner_Phone_No: item.phoneNumber
          };
        });
        this._cd.markForCheck();
      }
    });
  }
}
