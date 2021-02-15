import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter/filter.component';
import { assetsPath } from '@environments/environment';
import { TrafficFineTableFacade } from '../traffic-fine/+state/traffic-fine';

@Component({
  selector: 'anms-traffic-fine',
  templateUrl: './traffic-fine.component.html',
  styleUrls: ['./traffic-fine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrafficFineComponent implements OnInit {
  assets = assetsPath;
  activeTab = 'Traffic Fine';
  downloadBtn= 'assets/icons/download-solid.svg';
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
      { lable: 'TC Code', type: 1, field: 'TC_Code', width: 150 },
      { lable: 'Type', type: 1, field: 'Type', width: 100 },
      { lable: 'Department', type: 1, field: 'Department', width: 200 },
      {
        lable: 'Operator',
        type: 1,
        field: 'Operator',
        renderer: 'doubleLineRenderer',
        width: 150
      },
      { lable: 'Plate No', type: 1, field: 'Plate_No', width: 100 },
      { lable: 'Mission Status', type: 1, field: 'Mission_Status' },
      {
        lable: 'Time/Date',
        type: 1,
        field: 'Time_Date',
        renderer: 'doubleLineRenderer',
        width: 150
      },
      { lable: 'Duration', type: 1, field: 'Duration' },
      { lable: 'Status', type: 1, field: 'Status' },
      { lable: 'User', type: 1, field: 'User' },
      { lable: 'Amount', type: 1, field: 'Amount' }
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
        field: 'Asset',
        renderer: 'assetRenderer',
        thumbField: 'assetPicture',
        width: 200
      },
      { lable: 'Plate Number', type: 1, field: 'Plate_Number' },
      { lable: 'Type', type: 1, field: 'Type' },
      {
        lable: 'Operator',
        type: 1,
        field: 'Operator',
        renderer: 'doubleLineRenderer'
      },
      { lable: 'Status', type: 1, field: 'Status' },
      { lable: 'Business Category', type: 1, field: 'Business_Category' },
      { lable: 'Total Fines', type: 1, field: 'Total_Fines' },
      { lable: 'Amount', type: 1, field: 'Amount' }
    ],
    data: [
      {
        assetPicture: 'thumb1.png',
        assetName: 'Asset Name',
        assetInfo: 'DPD 0000001',
        assetStatus: 'owned',
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
        assetPicture: 'thumb1.png',
        assetName: 'Asset Name',
        assetInfo: 'DPD 0000001',
        assetStatus: 'owned',
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
        assetPicture: 'thumb1.png',
        assetName: 'Asset Name',
        assetInfo: 'DPD 0000001',
        assetStatus: 'owned',
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
        assetPicture: 'thumb1.png',
        assetName: 'Asset Name',
        assetInfo: 'DPD 0000001',
        assetStatus: 'owned',
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
        assetPicture: 'thumb1.png',
        assetName: 'Asset Name',
        assetInfo: 'DPD 0000001',
        assetStatus: 'owned',
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
        assetPicture: 'thumb1.png',
        assetName: 'Asset Name',
        assetInfo: 'DPD 0000001',
        assetStatus: 'owned',
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

  constructor(private facade: TrafficFineTableFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();
  }
}
