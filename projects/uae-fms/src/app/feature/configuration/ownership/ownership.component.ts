import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { TableComponent, TableSetting } from '@core/table';
import { map } from 'rxjs/operators';
import { OwnershipFacade } from '../+state/ownership';
import { TableFacade } from '@core/table/+state/table.facade';

@Component({
  selector: 'anms-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OwnershipComponent implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

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

  constructor(
    private facade: OwnershipFacade,
    private tableFacade: TableFacade,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }

  exportTable() {
    this.table.exportTable(this.ownerShip_Table, 'Ownership');
  }
}
