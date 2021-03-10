import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter';
import { UsersFacade } from '../../+state/users';
import { Subscription } from 'rxjs';
import { IUserStatistics } from '@models/statistics';

@Component({
  selector: 'anms-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  downloadBtn = 'assets/icons/download-solid.svg';
  userStatistics$: Subscription;
  userStatisticsInitial: IUserStatistics = {
    totalUserNumber: 0,
    activeUsersNumber: 0,
    inActiveUsersNumber: 0
  };
  filterCard: FilterCardSetting[];
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
        field: 'Department',
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'tables.column.information',
        type: 1,
        field: 'Information',
        renderer: 'doubleLineRenderer'
      },
      { lable: 'tables.column.status', type: 1, field: 'Status' },
      { lable: 'tables.column.role', type: 1, field: 'Role' }
    ],
    data: [
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
    ]
  };

  constructor(private facade: UsersFacade) {}

  ngOnInit(): void {
    this.statisticsFilter(this.userStatisticsInitial);

    this.facade.loadAll();
    this.facade.users$.subscribe((data) => {
      console.log(data, 'users');
    });
    this.userStatistics$ = this.facade.statistics$.subscribe((data) => {
      if (data) {
        const updated: IUserStatistics = {
          totalUserNumber: 0,
          activeUsersNumber: data.activeUsersNumber,
          inActiveUsersNumber: data.inActiveUsersNumber
        };
        this.statisticsFilter(updated);
      }
    });
  }
  statisticsFilter(statisticsCount: IUserStatistics) {
    console.log('detected');
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
        filterCount: statisticsCount.totalUserNumber.toString(),
        filterTagColor: '#6EBFB5',
        onActive(index: number) {}
      },
      {
        filterTitle: 'statistic.active',
        filterCount: statisticsCount.activeUsersNumber.toString(),
        filterTagColor: '#6870B4',
        onActive(index: number) {}
      },
      {
        filterTitle: 'statistic.inactive',
        filterCount: statisticsCount.inActiveUsersNumber.toString(),
        filterTagColor: '#BA7967',
        onActive(index: number) {}
      }
    ];
  }
  ngOnDestroy() {
    this.userStatistics$.unsubscribe();
  }
}
