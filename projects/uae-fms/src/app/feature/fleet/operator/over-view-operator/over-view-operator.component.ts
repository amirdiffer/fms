import { Component, OnInit } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { ColumnType, TableSetting } from '@core/table';
import { OperatorFacade } from '../../+state/operator';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SettingsFacade } from '@core/settings/settings.facade';

@Component({
  selector: 'anms-over-view-operator',
  templateUrl: './over-view-operator.component.html',
  styleUrls: ['./over-view-operator.component.scss']
})
export class OverViewOperatorComponent implements OnInit {
  //region Variable
  downloadBtn = 'assets/icons/download-solid.svg';
  search = 'assets/icons/search-solid.svg';
  selectedTab = '0';

  activeLang = '';

  count$ = this.facade.conut$.pipe(map((_) => 3456));
  //#endregion

  //#region Table
  trafficFine_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.tc_code', type: 1, field: 'TC_Code', width: 100 },
      { lable: 'tables.column.type', type: 1, field: 'Type', width: 100 },
      {
        lable: 'tables.column.department',
        type: 1,
        field: 'Department',
        width: 150
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
        lable: 'tables.column.user_status',
        type: 1,
        field: 'userStatus',
        width: 100
      }
    ],
    data: [
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      },
      {
        TC_Code: '1234567890',
        Type: 'Description',
        Department: 'Department`s Name',
        Operator: { line1: 'Sam Smith', line2: '12345679' },
        Plate_No: '123456789',
        Mission_Status: 'Mission Status',
        Time_Date: { line1: '02/02/2020', line2: '12:00' },
        userStatus: 'Sms',
        Status: 'Paid',
        User: 'SMS',
        Amount: '12345 AED'
      }
    ]
  };

  movementHistoryTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.asset',
        type: 1,
        field: 'asset',
        width: 250,
        renderer: 'assetsRenderer'
      },
      {
        lable: 'tables.column.duration',
        type: 1,
        field: 'duration',
        sortable: true
      },
      {
        lable: 'tables.column.start_date',
        type: 1,
        field: 'startDate',
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'tables.column.end_date',
        type: 1,
        field: 'endDate',
        renderer: 'doubleLineRenderer'
      },
      {
        lable: 'tables.column.department',
        type: 1,
        field: 'department'
      }
    ],
    data: []
  };

  activityTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.title',
        type: ColumnType.lable,
        field: 'title',
        width: 300,
        renderer: 'lowOpacityRenderer'
      },
      {
        lable: 'tables.column.date',
        type: ColumnType.lable,
        field: 'date',
        width: 100,
        renderer: 'doubleLineRenderer'
      }
    ],
    data: []
  };
  //#endregion

  //#region Filter
  trafficFinFilterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.paid',
      filterCount: '2456',
      filterTagColor: '#42D0D9',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unpainted',
      filterCount: '2456',
      filterTagColor: '#9967D9',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.deducte',
      filterCount: '12',
      filterTagColor: '#20E19D',
      onActive(index: number) {}
    }
  ];
  //#endregion

  constructor(
    private facade: OperatorFacade,
    private router: Router,
    private settingFacade: SettingsFacade
  ) {}

  ngOnInit(): void {
    this.settingFacade.language.subscribe((lang) => {
      this.activeLang = lang;
    });

    for (let i = 0; i < 9; i++) {
      this.movementHistoryTable.data.push({
        asset: {
          img: 'user-image.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        duration: '2 Days',
        startDate: { line1: 'Saturday 02/02', line2: '12:30' },
        endDate: { line1: 'Saturday 02/02', line2: '12:30' },
        department: 'Department Name'
      });
    }

    for (let i = 0; i < 9; i++) {
      this.activityTable.data.push({
        title: {
          column: 'Asset Assign',
          subtitle: 'Asset DPD123456 Assign To This User'
        },
        date: { line1: 'Saturday 02/02', line2: '12:30' }
      });
    }
  }

  backToOperatorTable(): void {
    this.router.navigate(['/fleet/operator']).then();
  }
}
