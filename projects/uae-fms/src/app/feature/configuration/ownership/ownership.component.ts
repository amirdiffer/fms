import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnType, TableComponent, TableSetting } from '@core/table';
import { map } from 'rxjs/operators';
import { OwnershipFacade } from '../+state/ownership';
import { TableFacade } from '@core/table/+state/table.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.scss']
})
export class OwnershipComponent implements OnInit {
  //#region Table
  ownerShip_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.ownership', type: 1, field: 'Ownership' },
      { lable: 'tables.column.Owner', type: 1, field: 'Owner' },
      { lable: 'tables.column.fleet_it_code', type: 1, field: 'Fleet_IT_Code' },
      {
        lable: 'tables.column.duration',
        type: 1,
        field: 'Duration',
        sortable: true,
        width: 140
      },
      { lable: 'tables.column.purpose', type: 1, field: 'Purpose', width: 100 },
      { lable: 'tables.column.owner_email', type: 1, field: 'Owner_Email' },
      {
        lable: 'tables.column.owner_phone_no',
        type: 1,
        field: 'Owner_Phone_No'
      },
      {
        lable: '<img src="assets/icons/car-solid.svg">',
        type: 1,
        isIconLable: true,
        field: 'car',
        width: 70,
        sortable: true
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this.router.navigate([
              '/configuration/ownership/edit-ownership/' + data.id
            ]);
          },
          permission:['OWNERSHIP_UPDATE']
        }
      ]
    }
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
          car: item.numOfOwnedAssets || 0,
          id: item.id
        };
      })
    )
  );
  //#endregion

  //#region Variables
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  downloadBtn = 'assets/icons/download-solid.svg';
  //#endregion

  constructor(
    private facade: OwnershipFacade,
    private tableFacade: TableFacade,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.facade.loadAll();
  }

  exportTable() {
    let filter = {
      Ownership: 'Ownership',
      Owner: 'Owner',
      Fleet_IT_Code: 'Fleet_IT_Code',
      Duration: 'Duration',
      Purpose: 'Purpose',
      Owner_Email: 'Owner_Email',
      Owner_Phone_No: 'Owner_Phone_No',
    };
    this.table.exportTable(this.ownerShip_Table, 'Ownership', filter);
  }

  eventPagination() {
    this.facade.loadAll();
  }
}
