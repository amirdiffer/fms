import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableSetting } from '@core/table';

@Component({
  selector: 'anms-over-view-operator',
  templateUrl: './over-view-operator.component.html',
  styleUrls: ['./over-view-operator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverViewOperatorComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  search = 'assets/icons/search-solid.svg';
  selectedTab = '1';

  trafficFine_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.tc_code', type: 1, field: 'TC_Code', width: 100 },
      { lable: 'tables.column.type', type: 1, field: 'Type', width: 100 },
      {
        lable: 'tables.column.department',
        type: 1,
        field: 'Department',
        width: 100
      },
      {
        lable: 'tables.column.plate_no',
        type: 1,
        field: 'Plate_No',
        width: 100
      },
      {
        lable: 'tables.column.mission_status',
        type: 1,
        field: 'Mission_Status',
        width: 100
      },
      {
        lable: 'tables.column.time_date',
        type: 1,
        field: 'Time_Date',
        renderer: 'doubleLineRenderer',
        width: 100
      },
      {
        lable: 'tables.column.duration',
        type: 1,
        field: 'Duration',
        width: 100
      }
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

  constructor() {}

  ngOnInit(): void {}
}
