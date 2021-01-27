import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter';

@Component({
  selector: 'anms-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'This Month',
      filterCount: '2456',
      filterTagColor: '#CBA786',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Total',
      filterCount: '356',
      filterTagColor: '#6EBFB5',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Active',
      filterCount: '124',
      filterTagColor: '#6870B4',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Inactive',
      filterCount: '12',
      filterTagColor: '#BA7967',
      onActive(index: number) {}
    }
  ];

  users_Table: TableSetting = {
    columns: [
      {
        lable: 'User',
        type: 1,
        field: 'User',
        renderer: 'userRenderer',
        thumbField: 'picture'
      },
      {
        lable: 'Department',
        type: 1,
        field: 'Department',
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'Information',
        type: 1,
        field: 'Information',
        renderer: 'doubleLineRenderer'
      },
      { lable: 'Status', type: 1, field: 'Status' },
      { lable: 'Role', type: 1, field: 'Role' }
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
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}
