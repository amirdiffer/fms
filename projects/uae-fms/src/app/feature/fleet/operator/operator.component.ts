import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { assetsPath } from '@environments/environment';
import { TableSetting } from '@core/table';

@Component({
  selector: 'anms-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperatorComponent implements OnInit {
  assets = assetsPath;

  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'Total',
      filterCount: '2456',
      filterTagColor: '#6C7198',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Active',
      filterCount: '356',
      filterTagColor: '#5B8972',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Vacation',
      filterCount: '124',
      filterTagColor: '#DDB16C',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Inactive',
      filterCount: '12',
      filterTagColor: '#E07A5F',
      onActive(index: number) {}
    }
  ];

  operator_Table: TableSetting = {
    columns: [
      {
        lable: 'Operator',
        type: 1,
        field: 'Operator',
        renderer: 'userRenderer',
        thumbField: 'profilePicture'
      },
      {
        lable: 'Organization',
        type: 1,
        field: 'Organization',
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'Information',
        type: 1,
        field: 'Information',
        renderer: 'doubleLineRenderer'
      },
      { lable: 'Type', type: 1, field: 'Type' },
      { lable: 'Status', type: 1, field: 'Status' },
      {
        lable: 'Asset',
        type: 1,
        field: 'Asset',
        renderer: 'assetRenderer',
        thumbField: 'assetPicture'
      },
      { lable: 'TF PAid', type: 1, field: 'TF_PAid' },
      { lable: 'TF Unpaid', type: 1, field: 'TF_Unpaid' }
    ],
    data: [
      {
        profilePicture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        userInfo: '1234567899',
        assetPicture: 'thumb1.png',
        assetName: 'Asset Name',
        assetInfo: 'DPD 0000001',
        assetStatus: 'owned',
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0'
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}
