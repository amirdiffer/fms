import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter/filter.component';
import { assetsPath } from '@environments/environment';
import { TrafficFineTableFacade } from '../traffic-fine/+state/traffic-fine';
import { AssetTrafficFineFacade } from './+state/asset-traffic-fine';

@Component({
  selector: 'anms-traffic-fine',
  templateUrl: './traffic-fine.component.html',
  styleUrls: ['./traffic-fine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrafficFineComponent implements OnInit {
  assets = assetsPath;
  activeTab = 'Traffic Fine';
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon= 'assets/icons/search-solid.svg';
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'Total',
      filterCount: '2456',
      filterTagColor: '#6F89A7',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Paid',
      filterCount: '356',
      filterTagColor: '#4F4198',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Unpainted',
      filterCount: '124',
      filterTagColor: '#EB941D',
      onActive(index: number) {}
    },
    {
      filterTitle: 'Deducte',
      filterCount: '12',
      filterTagColor: '#F75A4A',
      onActive(index: number) {}
    }
  ];
  trafficFine_Table: TableSetting = {
    columns: [
      { lable: 'TC Code', type: 1, field: 'TC_Code', width: 100 },
      { lable: 'Type', type: 1, field: 'Type', width: 100 },
      { lable: 'Department', type: 1, field: 'Department', width: 100 },
      {
        lable: 'Operator',
        type: 1,
        field: 'Operator',
        renderer: 'doubleLineRenderer',
        width: 100
      },
      { lable: 'Plate No', type: 1, field: 'Plate_No', width: 100 },
      { lable: 'Mission Status', type: 1, field: 'Mission_Status',width: 100  },
      {
        lable: 'Time/Date',
        type: 1,
        field: 'Time_Date',
        renderer: 'doubleLineRenderer',
        width: 100
      },
      { lable: 'Duration', type: 1, field: 'Duration' ,width: 100 },
      { lable: 'Status', type: 1, field: 'Status',width: 100  },
      { lable: 'User', type: 1, field: 'User',width: 100  },
      { lable: 'Amount', type: 1, field: 'Amount',width: 100  }
    ],
    data: [
      {
        statusColor: '#6D59D9',
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        statusColor: '#6D59D9',
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        statusColor: '#6D59D9',
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        statusColor: '#6D59D9',
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        statusColor: '#6D59D9',
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        statusColor: '#6D59D9',
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        statusColor: '#6D59D9',
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        statusColor: '#6D59D9',
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        statusColor: '#6D59D9',
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      }
    ]
  };
  assetTraffic_Table: TableSetting = {
    columns: [
      {
        lable: 'Asset',
        type: 1,
        field: 'asset',
        renderer: 'assetsRenderer',
        thumbField: '',
        width: 200
      },
      { lable: 'Plate Number', type: 1, field: 'Plate_Number', width:100 },
      { lable: 'Type', type: 1, field: 'Type', width:100 },
      {
        lable: 'Operator',
        type: 1,
        field: 'Operator',
        renderer: 'doubleLineRenderer',
        width:100
      },
      { lable: 'Status', type: 1, field: 'Status', width:100 },
      { lable: 'Business Category', type: 1, field: 'Business_Category', width:100 },
      { lable: 'Total Fines', type: 1, field: 'Total_Fines', width:100 },
      { lable: 'Amount', type: 1, field: 'Amount', width:100 }
    ],
    data: [
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        thumbField: 'thumb1.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: { line1: 'Sam Smith', line2: '354684616' },
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      },
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        thumbField: 'thumb1.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: { line1: 'Sam Smith', line2: '354684616' },
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      },
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        thumbField: 'thumb1.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: { line1: 'Sam Smith', line2: '354684616' },
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      },
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        thumbField: 'thumb1.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: { line1: 'Sam Smith', line2: '354684616' },
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      },
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        thumbField: 'thumb1.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: { line1: 'Sam Smith', line2: '354684616' },
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      },
      {
        asset: {
          img: 'thumb1.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        thumbField: 'thumb1.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: { line1: 'Sam Smith', line2: '354684616' },
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      }
    ]
  };

  constructor(
    private _trafficFineFacade: TrafficFineTableFacade,
    private _assetTrafficFineFacade: AssetTrafficFineFacade
  ) {}

  ngOnInit(): void {
    this._trafficFineFacade.loadAll();
    this._assetTrafficFineFacade.loadAll();
  }
}
