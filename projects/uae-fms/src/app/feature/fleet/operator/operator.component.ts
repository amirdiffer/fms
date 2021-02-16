import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { assetsPath } from '@environments/environment';
import { TableSetting } from '@core/table';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperatorComponent implements OnInit {
  assets = assetsPath;
  downloadBtn= 'assets/icons/download-solid.svg';
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
        width: 150,
        renderer: 'userRenderer',
        thumbField: 'profilePicture'
      },
      {
        lable: 'Organization',
        type: 1,
        field: 'Organization',
        width: 150,
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'Information',
        type: 1,
        field: 'Information',
        width: 150,
        renderer: 'doubleLineRenderer'
      },
      { lable: 'Type', type: 1, field: 'Type',width: 100 },
      { lable: 'Status', type: 1, field: 'Status',width: 100 },
      {
        lable: 'Asset',
        type: 1,
        field: 'asset',
        width: 180,
        renderer: 'assetsRenderer',
        thumbField: ''
      },
      { lable: 'TF PAid', type: 1, field: 'TF_PAid',width: 100  },
      { lable: 'TF Unpaid', type: 1, field: 'TF_Unpaid' ,width: 100 }
    ],
    data: [
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      },
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      },
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      },
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      },
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      },
      {
        picture: 'user-image.png',
        firstName: 'Sam',
        lastName: 'Smith',
        id: '1234567899',
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        Organization: { line1: 'Department Name', line2: 'Section Name' },
        Information: { line1: 'sample@gmail.com', line2: '+97150569899' },
        Type: 'Iserve',
        Status: 'Active',
        Asset: '',
        TF_PAid: '14',
        TF_Unpaid: '0',
        statusColor: '#81B29A'
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}
