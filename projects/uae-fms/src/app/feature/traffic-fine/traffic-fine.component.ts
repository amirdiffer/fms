import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter/filter.component';
import { assetsPath } from '@environments/environment';

@Component({
  selector: 'anms-traffic-fine',
  templateUrl: './traffic-fine.component.html',
  styleUrls: ['./traffic-fine.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrafficFineComponent implements OnInit {
  assets = assetsPath;

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
      { lable: 'TC Code', type: 1, field: 'TC_Code' },
      { lable: 'Type', type: 1, field: 'Type' },
      { lable: 'Department', type: 1, field: 'Department' },
      { lable: 'Operator', type: 1, field: 'Operator' },
      { lable: 'Plate No', type: 1, field: 'Plate_No' },
      { lable: 'Mission Status', type: 1, field: 'Mission_Status' },
      { lable: 'Time/Date', type: 1, field: 'Time_Date' },
      { lable: 'Duration', type: 1, field: 'Duration' },
      { lable: 'Status', type: 1, field: 'Status' },
      { lable: 'User', type: 1, field: 'User' },
      { lable: 'Amount', type: 1, field: 'Amount' }
    ],
    data: [
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: 'Sam Smith 12345679',
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: '02/02/2020 12:00',
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: 'Sam Smith 12345679',
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: '02/02/2020 12:00',
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: 'Sam Smith 12345679',
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: '02/02/2020 12:00',
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: 'Sam Smith 12345679',
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: '02/02/2020 12:00',
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: 'Sam Smith 12345679',
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: '02/02/2020 12:00',
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: 'Sam Smith 12345679',
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: '02/02/2020 12:00',
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: 'Sam Smith 12345679',
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: '02/02/2020 12:00',
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: 'Sam Smith 12345679',
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: '02/02/2020 12:00',
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: 'Sam Smith 12345679',
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: '02/02/2020 12:00',
        Duration: '10 days',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      }
    ]
  };
  assetTraffic_Table: TableSetting = {
    columns: [
      { lable: 'Asset', type: 2, field: 'Asset', thumbField: 'thumbField' },
      { lable: 'Plate Number', type: 1, field: 'Plate_Number' },
      { lable: 'Type', type: 1, field: 'Type' },
      { lable: 'Operator', type: 1, field: 'Operator' },
      { lable: 'Status', type: 1, field: 'Status' },
      { lable: 'Business Category', type: 1, field: 'Business_Category' },
      { lable: 'Total Fines', type: 1, field: 'Total_Fines' },
      { lable: 'Amount', type: 1, field: 'Amount' }
    ],
    data: [
      {
        Asset: 'Asset Name',
        thumbField: 'assets/vehicle.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: 'Sam Smith 354684616',
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      },
      {
        Asset: 'Asset Name',
        thumbField: 'assets/vehicle.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: 'Sam Smith 354684616',
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      },
      {
        Asset: 'Asset Name',
        thumbField: 'assets/vehicle.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: 'Sam Smith 354684616',
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      },
      {
        Asset: 'Asset Name',
        thumbField: 'assets/vehicle.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: 'Sam Smith 354684616',
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      },
      {
        Asset: 'Asset Name',
        thumbField: 'assets/vehicle.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: 'Sam Smith 354684616',
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      },
      {
        Asset: 'Asset Name',
        thumbField: 'assets/vehicle.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: 'Sam Smith 354684616',
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      },
      {
        Asset: 'Asset Name',
        thumbField: 'assets/vehicle.png',
        Plate_Number: '12345678999',
        Type: 'Type Is Here',
        Operator: 'Sam Smith 354684616',
        Status: 'Paid',
        Business_Category: 'VIP',
        Total_Fines: '15000 AED',
        Amount: '12345 AED'
      }
    ]
  };

  constructor() {}

  ngOnInit(): void {}
}
