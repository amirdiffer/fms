import { Component, OnInit } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { SettingsFacade } from '@core/settings/settings.facade';
import { FilterCardSetting } from '@core/filter';
import { map } from 'rxjs/operators';
import { OrganizationFacade } from '@feature/fleet/+state/organization';

@Component({
  selector: 'anms-department-overview',
  templateUrl: './department-overview.component.html',
  styleUrls: ['./department-overview.component.scss']
})
export class DepartmentOverviewComponent implements OnInit {

  //#region Variable
  activeLang = '';

  selectedTab!: string;

  count$ = this.facade.conut$.pipe(map((x) => 3456));

  sections: Section[] = [
    {
      name: 'Section 1',
      isSelected: true,
      locations: [{ name: 'Location 1' }, { name: 'Location 2' }, { name: 'Location 3' }]
    },
    {
      name: 'Section 2',
      isSelected: false,
      locations: [{ name: 'Location 1' }, { name: 'Location 2' }, { name: 'Location 3' }]
    },
    {
      name: 'Section 3',
      isSelected: false,
      locations: [{ name: 'Location 1' }, { name: 'Location 2' }, { name: 'Location 3' }]
    }
  ];
  //#endregion

  //#region Filter
  userTabFilter: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '2456',
      filterTagColor: '#42D0D9',
      filterSupTitle: 'statistic.user',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.active',
      filterCount: '2456',
      filterSupTitle: 'statistic.user',
      filterTagColor: '#9967D9',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.inactive',
      filterCount: '2456',
      filterSupTitle: 'statistic.user',
      filterTagColor: '#20E19D',
      onActive(index: number) {}
    }
  ]
  trafficFineFilter: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.paid',
      filterCount: '2456',
      filterTagColor: '#42D0D9',
      filterSupTitle: 'statistic.user',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unpainted',
      filterCount: '2456',
      filterSupTitle: 'statistic.user',
      filterTagColor: '#9967D9',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.deducte',
      filterCount: '2456',
      filterSupTitle: 'statistic.user',
      filterTagColor: '#20E19D',
      onActive(index: number) {}
    }
  ]
  //#endregion

  //#region Table
  userTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.user',
        type: 1,
        field: 'user'
      },
      {
        lable: 'tables.column.phone_number',
        type: 1,
        field: 'phoneNumber'
      },
      {
        lable: 'tables.column.email',
        type: 1,
        field: 'email'
      },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'status'
      },
      {
        lable: 'tables.column.role',
        type: 1,
        field: 'role'
      },
    ],
    data: [],
  };

  trafficFineTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.tc_code',
        type: 1,
        field: 'tcCode'
      },
      {
        lable: 'tables.column.type',
        type: 1,
        field: 'type'
      },
      {
        lable: 'tables.column.operator',
        type: 1,
        field: 'operator'
      },
      {
        lable: 'tables.column.plate_no',
        type: 1,
        field: 'plateNo'
      },
      {
        lable: 'tables.column.time_date',
        type: 1,
        field: 'timeDate'
      },
      {
        lable: 'tables.column.duration',
        type: 1,
        field: 'duration'
      },
      {
        lable: 'tables.column.status',
        type: 1,
        field: 'status'
      },
      {
        lable: 'tables.column.user_status',
        type: 1,
        field: 'userStatus'
      },
      {
        lable: 'tables.column.amount',
        type: 1,
        field: 'amount'
      },
    ],
    data: [],
  };

  movementTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.asset',
        type: 1,
        field: 'asset',
        width: 250,
        renderer: 'assetsRenderer'
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
        lable: 'tables.column.operator',
        type: 1,
        field: 'operator'
      },
      {
        lable: 'tables.column.fine',
        type: 1,
        field: 'fine',
        sortable: true
      },
      {
        lable: 'tables.column.reason',
        type: 1,
        field: 'reason'
      }
    ],
    data: [],
  };
  //#endregion

  constructor(private settingFacade: SettingsFacade, private facade: OrganizationFacade) {
    this.settingFacade.language.subscribe((lang) => (this.activeLang = lang));
  }

  ngOnInit(): void {

    for (let i = 0; i < 9; i++) {
      this.userTable.data.push({
        user: 'Sam Smith',
        statusColor: '#00AFB9',
        phoneNumber: '1234567890',
        email: 'sample@gmail.com',
        status: 'Active',
        role: 'Fleet Manager',
      })
    }

    for (let i = 0; i < 9; i++) {
      this.trafficFineTable.data.push({
        tcCode: '1234567890',
        type: 'Description',
        operator: 'Sam Smith 234567890',
        plateNo: '123456778',
        timeDate: '02/02/2020 12:00',
        duration: '10 Days',
        status: 'Paid',
        userStatus: 'Sms',
        amount: '12345 AED',
      })
    }

    for (let i = 0; i < 9; i++) {
      this.movementTable.data.push({
        asset: {
          img: 'user-image.png',
          assetName: 'Asset Name',
          assetSubName: 'DPD 0000001',
          ownership: 'Owned'
        },
        startDate: { line1: 'Saturday 02/02', line2: '12:30' },
        endDate: { line1: 'Saturday 02/02', line2: '12:30' },
        operator: 'Sam Smith 1234567890',
        fine: '3',
        reason: 'Reason Is Here'
      })
    }

  }

  onSectionSelect(index): void {
    this.sections[index].isSelected = !this.sections[index].isSelected;
  }

}

interface Section {
  name: string;
  isSelected: boolean;
  locations: Location[];
}

interface Location {
  name: string
}
