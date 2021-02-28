import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FilterCardSetting } from '@core/filter/filter.component';
import { assetsPath } from '@environments/environment';
import { TableSetting } from '@core/table';
import { OperatorFacade } from '../+state/operator';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperatorComponent implements OnInit {
  assets = assetsPath;
  downloadBtn = 'assets/icons/download-solid.svg';
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '2456',
      filterTagColor: '#6C7198',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '356',
      filterTagColor: '#5B8972',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.vacation',
      filterCount: '124',
      filterTagColor: '#DDB16C',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '12',
      filterTagColor: '#E07A5F',
      onActive(index: number) {}
    }
  ];

  operator_Table: TableSetting = {
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
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'tables.column.information',
        type: 1,
        field: 'Information',
        width: 150,
        renderer: 'doubleLineRenderer'
      },
      { lable: 'tables.column.type', type: 1, field: 'Type', width: 100 },
      { lable: 'tables.column.status', type: 1, field: 'Status', width: 100 },
      {
        lable: 'tables.column.asset',
        type: 1,
        field: 'asset',
        width: 180,
        renderer: 'assetsRenderer',
        thumbField: ''
      },
      { lable: 'tables.column.tf_paid', type: 1, field: 'TF_PAid', width: 100 },
      {
        lable: 'tables.column.tf_unpaid',
        type: 1,
        field: 'TF_Unpaid',
        width: 100
      }
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

  constructor(private _operatorFacade: OperatorFacade) {}

  ngOnInit(): void {
    this._operatorFacade.loadAll();
  }
}
