import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnType, TableComponent, TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter';
import { UsersFacade } from '../../+state/users';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FilterType } from '@core/table/table.component';

@Component({
  selector: 'anms-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  downloadBtn = 'assets/icons/download-solid.svg';
  filtersColumns = [];
  showCustomFilter = false;

  //#region Filter
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.this_month',
      filterCount: '',
      filterTagColor: '',
      isCalendar: true,
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.total',
      filterCount: '',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '',
      filterTagColor: '#BA7967',
      onActive(index: number) {}
    }
  ];
  //#endregion

  //#region Table
  data$ = this.facade.users$.pipe(
    map((x) => {
      return x.map((y) => {
        return {
          ...y,
          information: { emails: y.emails, phoneNumbers: y.phoneNumbers },
          roleName: y?.role?.roleName,
          statusColor: y.isActive ? '#7F87CA' : '#BA7967'
        };
      });
    })
  );

  users_Table: TableSetting = {
    name: 'users',
    columns: [
      {
        lable: 'tables.column.user',
        type: 1,
        field: 'User',
        renderer: 'userRenderer',
        thumbField: 'profileDocId',
        filterApiKey: 'userName',
        filterType: FilterType.list
      },
      {
        lable: 'tables.column.department',
        type: 1,
        field: 'department',
        renderer: 'doubleLineRenderer',
        rendererOptions: {
          line1: 'name',
          line2: 'organizationName'
        },
        filterApiKey: 'department',
        filterType: FilterType.list
      },
      {
        lable: 'tables.column.information',
        type: 1,
        field: 'information',
        renderer: 'doubleLineRenderer',
        rendererOptions: {
          line1: 'emails',
          line2: 'phoneNumbers',
          type: 'array'
        }
      },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'isActive',
        renderer: 'booleanRenderer',
        filterApiKey: 'isActive',
        filterType: FilterType.status
      },
      {
        lable: 'tables.column.role',
        type: 1,
        field: 'roleName',
        filterType: FilterType.list,
        filterApiKey: 'roles'
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
              '/configuration/user-management/users/edit-user/' + data.id
            ]);
          },
          permission: ['USER_NORMAL_UPDATE']
        }
      ]
    }
  };
  //#endregion

  constructor(private facade: UsersFacade, private router: Router) {}

  ngOnInit(): void {
    this.setFiltersColumns();
    this.facade.loadAll();
    this.facade.statistics$.subscribe((x) => {
      if (x) {
        this.filterCard = [
          {
            filterTitle: 'statistic.this_month',
            filterCount: '',
            filterTagColor: '',
            isCalendar: true,
            onActive(index: number) {}
          },
          {
            filterTitle: 'statistic.total',
            filterCount: `${x.activeUsersNumber + x.inActiveUsersNumber}`,
            filterTagColor: '#6EBFB5',
            onActive(index: number) {}
          },
          {
            filterTitle: 'statistic.active',
            filterCount: `${x.activeUsersNumber}`,
            filterTagColor: '#6870B4',
            onActive(index: number) {}
          },
          {
            filterTitle: 'statistic.inactive',
            filterCount: `${x.inActiveUsersNumber}`,
            filterTagColor: '#BA7967',
            onActive(index: number) {}
          }
        ];
      }
    });
  }

  eventPagination() {
    this.facade.loadAll();
  }

  exportTable() {
    let filter = {
      User: 'firstName|lastName|id',
      department: 'department.name|department.organizationName',
      information: 'information.emails|information.phoneNumbers',
      isActive: 'isActive?func:isActiveFunc',
      isActiveFunc: (y) => {
        return y ? 'Active' : 'Inactive';
      },
      roleName: 'roleName'
    };
    this.table.exportTable(this.users_Table, 'Users', filter);
  }

  setFiltersColumns() {
    let removeField = ['information'];
    let filtersColumns = Object.values({ ...this.users_Table.columns });
    filtersColumns.splice(1, 0, {
      lable: 'tables.column.organization',
      field: 'organization',
      filterApiKey: 'organization',
      filterType: FilterType.list
    });
    let addition = [
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
    this.facade.loadAll();
  }
}
