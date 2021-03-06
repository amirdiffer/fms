import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableSetting } from '@core/table';
import {
  ButtonType,
  ColumnType,
  FilterType,
  TableComponent
} from '@core/table/table.component';
import { map } from 'rxjs/operators';
import { OrganizationFacade } from '../+state/organization';

@Component({
  selector: 'anms-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  downloadBtn = 'assets/icons/download-solid.svg';
  showCustomFilter = false;
  filtersColumns = [];

  //#region Table
  organization_Table: TableSetting = {
    name: 'organization',
    columns: [
      {
        lable: 'tables.column.organization',
        type: 1,
        field: 'Organization',
        filterApiKey: 'name'
      },
      {
        lable: 'tables.column.section',
        sortable: true,
        type: 1,
        field: 'Section'
      },
      {
        lable: 'tables.column.location',
        sortable: true,
        type: 1,
        field: 'Location'
      },
      {
        lable: 'tables.column.tf_payed',
        sortable: true,
        type: 1,
        field: 'TF_Payed'
      },
      {
        lable: 'tables.column.tf_unpaid',
        sortable: true,
        type: 1,
        field: 'TF_Unpaid'
      },
      {
        lable: '<img src="assets/icons/operator.svg">',
        type: 1,
        sortable: true,
        isIconLable: true,
        field: 'user',
        width: 100
      },
      {
        lable: '<img src="assets/icons/car-solid.svg">',
        type: 1,
        isIconLable: true,
        field: 'car',
        width: 100,
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
      onClick: (col, data, button?) => {
        // if ('external') {
        //   this.showOverView = true;
        // }
      },
      floatButton: [
        {
          button: 'edit',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this.router.navigate([
              '/fleet/department/edit-department/' + data.id
            ]);
          },
          permission: ['ORGANIZATION_UPDATE']
        },
        {
          button: 'external',
          color: '#3F3F3F',
          onClick: (col, data, button?) => {
            this.router.navigate([
              '/fleet/department/department-overview/' + data.id
            ]);
          },
          permission: [
            'ORGANIZATION_VIEW_DETAILS',
            'ORGANIZATION_VIEW_USERS',
            'ORGANIZATION_VIEW_TRAFFIC_FINES',
            'ORGANIZATION_VIEW_MOVEMENT_HISTORY'
          ]
        }
      ]
    }
  };

  data$ = this.facade.organization$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          Organization: y.organizationName,
          Section: y.numOfDepartments,
          Location: y.numOfLocations,
          car: y.numOfAssets,
          user: y.numOfUsers,
          TF_Unpaid: y.tfUnpaid,
          TF_Payed: y.tfPaid
        };
      });
    })
  );
  //#endregion

  constructor(private facade: OrganizationFacade, private router: Router) {}

  ngOnInit(): void {
    this.setFiltersColumns();
  }

  eventPagination() {
    this.facade.loadAll();
  }

  exportTable() {
    let filter = {
      Organization: 'Organization',
      Section: 'Section',
      Location: 'Location',
      TF_Payed: 'TF_Payed',
      TF_Unpaid: 'TF_Unpaid'
    };
    this.table.exportTable(this.organization_Table, 'Department', filter);
  }

  setFiltersColumns() {
    let removeField = [
      'Section',
      'Location',
      'TF_Payed',
      'TF_Unpaid',
      'user',
      'car'
    ];
    let filtersColumns = Object.values({ ...this.organization_Table.columns });
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
