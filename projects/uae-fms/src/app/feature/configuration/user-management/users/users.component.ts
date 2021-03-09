import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter';
import { UsersFacade } from '../../+state/users';
import { IUser } from '@models/configuration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  downloadBtn = 'assets/icons/download-solid.svg';
  getUsersSubscription: Subscription;
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
      filterCount: '356',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '124',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '12',
      filterTagColor: '#BA7967',
      onActive(index: number) {}
    }
  ];

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
        renderer: ''
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
    data: []
  };

  constructor(private facade: UsersFacade) {}
  ngOnDestroy(): void {
    this.getUsersSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.facade.loadAll();
    this.getUsersSubscription = this.facade.users$.subscribe(
      (users: IUser[]) => {
        if (users) {
          this.users_Table.data = [];
          users.forEach((u) => {
            this.users_Table.data.push({
              statusColor: '#7F87CA',
              firstName: u.firstName,
              lastName: u.lastName,
              id: u.id,
              picture: 'user-image.png',
              Department: u.department.name,
              Information: { line1: u.emails[0], line2: u.phoneNumbers[0] },
              Status: 'Active',
              Role: u.roleId
            });
          });
        }
      }
    );
  }
}
