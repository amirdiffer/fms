import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter';
import { UsersFacade } from '../../+state/users';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.this_month',
      filterCount: '',
      filterTagColor: '',
      isCalendar: true,
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.total',
      filterCount: '356',
      filterTagColor: '#6EBFB5',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '124',
      filterTagColor: '#6870B4',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '12',
      filterTagColor: '#BA7967',
      onActive(index: number) { }
    }
  ];

  data$ = this.facade.users$.pipe(
    map(x => {
      return x.map(y => {
        return { ...y, information: { emails: y.emails, phoneNumbers: y.phoneNumbers }, roleName: y.role.roleName };
      });
    }));

  /* of([
    {
      statusColor: '#7F87CA',
      firstName: 'Sam',
      lastName: 'Smith',
      id: '1234567899',
      picture: 'user-image.png',
      Department: { line1: 'Department name', line2: 'Section Name' },
      Information: { line1: 'sample@gmail.com', line2: '+97150563793' },
      Status: 'Active',
      Role: 'Fleet Manager'
    },
    {
      statusColor: '#7F87CA',
      firstName: 'Sam',
      lastName: 'Smith',
      id: '1234567899',
      picture: 'user-image.png',
      Department: { line1: 'Department name', line2: 'Section Name' },
      Information: { line1: 'sample@gmail.com', line2: '+97150563793' },
      Status: 'Active',
      Role: 'Fleet Manager'
    },
    {
      statusColor: '#7F87CA',
      firstName: 'Sam',
      lastName: 'Smith',
      id: '1234567899',
      picture: 'user-image.png',
      Department: { line1: 'Department name', line2: 'Section Name' },
      Information: { line1: 'sample@gmail.com', line2: '+97150563793' },
      Status: 'Active',
      Role: 'Fleet Manager'
    },
    {
      statusColor: '#7F87CA',
      firstName: 'Sam',
      lastName: 'Smith',
      id: '1234567899',
      picture: 'user-image.png',
      Department: { line1: 'Department name', line2: 'Section Name' },
      Information: { line1: 'sample@gmail.com', line2: '+97150563793' },
      Status: 'Active',
      Role: 'Fleet Manager'
    },
    {
      statusColor: '#7F87CA',
      firstName: 'Sam',
      lastName: 'Smith',
      id: '1234567899',
      picture: 'user-image.png',
      Department: { line1: 'Department name', line2: 'Section Name' },
      Information: { line1: 'sample@gmail.com', line2: '+97150563793' },
      Status: 'Active',
      Role: 'Fleet Manager'
    },
    {
      statusColor: '#7F87CA',
      firstName: 'Sam',
      lastName: 'Smith',
      id: '1234567899',
      picture: 'user-image.png',
      Department: { line1: 'Department name', line2: 'Section Name' },
      Information: { line1: 'sample@gmail.com', line2: '+97150563793' },
      Status: 'Active',
      Role: 'Fleet Manager'
    },
    {
      statusColor: '#7F87CA',
      firstName: 'Sam',
      lastName: 'Smith',
      id: '1234567899',
      picture: 'user-image.png',
      Department: { line1: 'Department name', line2: 'Section Name' },
      Information: { line1: 'sample@gmail.com', line2: '+97150563793' },
      Status: 'Active',
      Role: 'Fleet Manager'
    }
  ]) */

  users_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.user',
        type: 1,
        field: 'User',
        renderer: 'userRenderer',
        thumbField: 'picture'
      },
      {
        lable: 'tables.column.department',
        type: 1,
        field: 'department',
        renderer: 'doubleLineRenderer',
        rendererOptions: {
          line1: "name",
          line2: "organizationName"
        }
      },
      {
        lable: 'tables.column.information',
        type: 1,
        field: 'information',
        renderer: 'doubleLineRenderer',
        rendererOptions: {
          line1: "emails",
          line2: "phoneNumbers",
          type: "array"
        }
      },
      { lable: 'tables.column.status', type: 1, field: 'isActive' },
      { lable: 'tables.column.role', type: 1, field: 'roleName' },
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
        this.dataService.dataToEditFromTable = data;
        this.dataService.isEditing = true;
        this.router
          .navigate(['/configuration/user-management/users/add-new-user'])
          .then();
      },
      floatButton: [
        {
          button: 'edit',
          color: '#3F3F3F'
        }
      ]
    }
  };

  constructor(
    private facade: UsersFacade,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.facade.loadAll();
    this.data$.subscribe(x => {
      // console.log(x);
    })
  }
}
