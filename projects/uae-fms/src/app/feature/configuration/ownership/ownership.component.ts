import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnType, TableComponent, TableSetting } from '@core/table';
import { map } from 'rxjs/operators';
import { OwnershipFacade } from '../+state/ownership';
import { TableFacade } from '@core/table/+state/table.facade';
import { Router } from '@angular/router';
import { FilterType } from '@core/table/table.component';

@Component({
  selector: 'anms-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.scss']
})
export class OwnershipComponent implements OnInit {
  filtersColumns = [];
  showCustomFilter = false;
  //#region Table
  ownerShip_Table: TableSetting = {
    name: 'ownership',
    columns: [
      {
        lable: 'tables.column.ownership',
        type: 1,
        field: 'Ownership',
        filterApiKey: 'type',
        filterType: FilterType.status
      },
      { lable: 'tables.column.Owner', type: 1, field: 'Owner' },
      {
        lable: 'tables.column.fleet_it_code',
        type: 1,
        field: 'Fleet_IT_Code',
        filterApiKey: 'fleetITCode'
      },
      {
        lable: 'tables.column.duration',
        type: 1,
        field: 'Duration',
        sortable: true,
        width: 140,
        filterApiKey: 'duration'
      },
      {
        lable: 'tables.column.purpose',
        type: 1,
        field: 'Purpose',
        width: 100,
        filterApiKey: 'purpose'
      },
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
          permission: ['OWNERSHIP_UPDATE']
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
  ) {}

  ngOnInit(): void {
    this.setFiltersColumns();
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
      Owner_Phone_No: 'Owner_Phone_No'
    };
    this.table.exportTable(this.ownerShip_Table, 'Ownership', filter);
  }

  eventPagination() {
    this.facade.loadAll();
  }

  setFiltersColumns() {
    let removeField = ['car', 'Owner_Email', 'Owner_Phone_No', 'Owner'];
    let filtersColumns = Object.values({ ...this.ownerShip_Table.columns });
    let addition = [];
    filtersColumns = filtersColumns.concat(addition);
    this.filtersColumns = filtersColumns.filter(
      (x) => !removeField.includes(x['field'])
    );
  }

  customFilterEvent(data: object[]) {
    this.facade.loadAll();
  }
}
