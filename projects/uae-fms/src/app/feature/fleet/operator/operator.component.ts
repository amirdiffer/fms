import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { assetsPath, environment } from '@environments/environment';
import { ColumnType, TableComponent, TableSetting } from '@core/table';
import { OperatorFacade } from '../+state/operator';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FilterType } from '@core/table/table.component';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  assets = assetsPath;
  downloadBtn = 'assets/icons/download-solid.svg';
  showOverView = false;
  fileServerBaseUrl = environment.baseFileServer;
  showCustomFilter = false;
  filtersColumns = [];

  //#region Filter
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '',
      filterTagColor: '#6C7198',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '',
      filterTagColor: '#5B8972',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.vacation',
      filterCount: '',
      filterTagColor: '#DDB16C',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '',
      filterTagColor: '#E07A5F',
      onActive(index: number) {}
    }
  ];
  //#endregion

  data$ = this._operatorFacade.operator$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          Operator: y.firstName + ' ' + y.lastName,
          Organization: {
            line1: y.department.name,
            line2: y.department.organizationName
          },
          Information: { line1: y.emails[0], line2: y.phoneNumbers[0] },
          Type: 'Operator',
          Status: y.isActive ? 'Active' : 'Inactive',
          asset: {
            img: y.profileDocId
              ? this.fileServerBaseUrl + y.profileDocId
              : 'assets/thumb1.png'
          },
          TF_PAid: 0,
          TF_Unpaid: 0
        };
      });
    })
  );

  operator_Table: TableSetting = {
    name: 'operator',
    columns: [
      {
        lable: 'tables.column.operator',
        type: 1,
        field: 'Operator',
        width: 150,
        renderer: 'userRenderer',
        thumbField: 'profilePicture'
      },
      {
        lable: 'tables.column.organization',
        type: 1,
        field: 'Organization',
        width: 150,
        renderer: 'doubleLineRenderer',
        filterApiKey: 'organization',
        filterType: FilterType.list
      },
      {
        lable: 'tables.column.information',
        type: 1,
        field: 'Information',
        width: 150,
        renderer: 'doubleLineRenderer'
      },
      { lable: 'tables.column.username', type: 1, field: 'userName', width: 100 },
      {
        lable: 'tables.column.type',
        type: 1,
        field: 'Type',
        width: 100,
        filterType: FilterType.list,
        filterApiKey: 'roles'
      },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'Status',
        width: 100,
        filterType: FilterType.status,
        filterApiKey: 'isActive'
      },
      /* {
        lable: 'tables.column.asset',
        type: 1,
        field: 'asset',
        width: 80,
        renderer: 'assetsRenderer',
        thumbField: 'assetPicture',
        override: 'assets/thumb.png'
      }, */
      /*       {
        lable: 'tables.column.tf_paid',
        type: 1,
        field: 'TF_PAid',
        width: 100,
        sortable: true
      },
      {
        lable: 'tables.column.tf_unpaid',
        type: 1,
        field: 'TF_Unpaid',
        width: 100,
        sortable: true
      }, */
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
            this._router.navigate(['/fleet/operator/edit-operator/' + data.id]);
          },
          permission: ['USER_OPERATOR_UPDATE']
        },
        {
          button: 'external',
          onClick: (col, data, button?) => {
            this._router.navigate(['/fleet/operator/' + data.id]);
          },
          permission: [
            'USER_OPERATOR_VIEW_DETAILS_GENERAL',
            'USER_OPERATOR_VIEW_DETAILS_TRAFFIC_FINE',
            'USER_OPERATOR_VIEW_DETAILS_MOVEMENT_HISTORY'
          ]
        }
      ]
    }
  };

  constructor(
    private _operatorFacade: OperatorFacade,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.setFiltersColumns();
    this._operatorFacade.loadStatistics();

    this._operatorFacade.statistics$.subscribe((response) => {
      if (response) {
        this.filterCard.map((filter) => {
          switch (filter.filterTitle) {
            case 'statistic.total':
              filter.filterCount = response.message.total;
              break;
            case 'statistic.active':
              filter.filterCount = response.message.active;
              break;
            case 'statistic.inactive':
              filter.filterCount = response.message.inActive;
              break;
            case 'statistic.vacation':
              filter.filterCount = response.message.vacation;
              break;
            default:
              break;
          }
        });
      }
    });
  }

  exportTable() {
    let filter = {
      Operator: 'Operator',
      Organization: 'Organization',
      Information: 'Information',
      Type: 'Type',
      Status: 'Status'
    };
    this.table.exportTable(this.operator_Table, 'Operator', filter);
  }

  eventPagination() {
    this._operatorFacade.loadAll();
  }

  setFiltersColumns() {
    let removeField = ['Operator', 'Information'];
    let filtersColumns = Object.values({ ...this.operator_Table.columns });
    filtersColumns.splice(2, 0, {
      lable: 'tables.column.department',
      field: 'department',
      filterApiKey: 'department',
      filterType: FilterType.list
    });
    let addition = [
      {
        lable: 'tables.column.firstname',
        field: 'firstName',
        filterApiKey: 'firstName',
        filterType: FilterType.string
      },
      {
        lable: 'tables.column.lastname',
        field: 'lastName',
        filterApiKey: 'lastName',
        filterType: FilterType.string
      },
      {
        lable: 'tables.column.email',
        field: 'emails',
        filterApiKey: 'emails',
        filterType: FilterType.string
      },
      {
        lable: 'tables.column.phone_number',
        field: 'phoneNumbers',
        filterApiKey: 'phoneNumbers',
        filterType: FilterType.string
      }
    ];
    filtersColumns = filtersColumns.concat(addition);
    this.filtersColumns = filtersColumns.filter(
      (x) => !removeField.includes(x['field'])
    );
  }

  customFilterEvent(data: object[]) {
    this._operatorFacade.loadAll();
  }
}
