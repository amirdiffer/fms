import { Component, OnInit } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { SettingsFacade } from '@core/settings/settings.facade';
import { FilterCardSetting } from '@core/filter';
import { map } from 'rxjs/operators';
import { OrganizationFacade, OrganizationService } from '@feature/fleet/+state/organization';
import { ActivatedRoute, Routes } from '@angular/router';
import { IOrganization } from '@models/organization';
import { Subject } from 'rxjs';

@Component({
  selector: 'anms-department-overview',
  templateUrl: './department-overview.component.html',
  styleUrls: ['./department-overview.component.scss']
})
export class DepartmentOverviewComponent implements OnInit {

  itemId = this._route.snapshot.params['id'];

  //#region Variable
  activeLang = '';

  detailsOrg: IOrganization;

  selectedTab!: string;

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

  obsUserCount = new Subject();
  obsTrafficFineCount = new Subject();
  obsMovementHistoryCount = new Subject();
  count = {
    $UserTable: this.obsUserCount.asObservable(),
    $TrafficFineTable: this.obsTrafficFineCount.asObservable(),
    $MovementHistoryTable: this.obsMovementHistoryCount.asObservable(),
  };

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
        field: 'timeDate',
        renderer: 'dateRenderer'
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
        renderer: 'dateRenderer'
      },
      {
        lable: 'tables.column.end_date',
        type: 1,
        field: 'endDate',
        renderer: 'dateRenderer'
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

  constructor(
    private settingFacade: SettingsFacade,
    private facade: OrganizationFacade,
    private _route: ActivatedRoute,
    private organizationService: OrganizationService
  ) {
    this.settingFacade.language.subscribe((lang) => (this.activeLang = lang));
  }

  ngOnInit(): void {

    this.organizationService.searchDepartment(this.itemId).subscribe(x => {
      this.detailsOrg = x.message;
      this.detailsOrg.departments = this.detailsOrg.departments.map(y => {
        return {
          ...y,
          isSelected: false
        }
      })
      this.getTablesData(this.detailsOrg.id);
    });

  }

  onSectionSelect(index): void {
    this.detailsOrg.departments[index]['isSelected'] = !this.detailsOrg.departments[index]['isSelected'];
  }

  getTablesData(orgId) {
    this.organizationService.usersOfOrganization(orgId).subscribe(x => {
      let data = x.message;
      this.userTable.data = data.map(d => {
        return {
          user: `${d.firstName} ${d.lastName}`,
          statusColor: '#00AFB9',
          phoneNumber: d.phoneNumbers[0],
          email: d.emails[0],
          status: d.isActive ? 'Active' : 'Inactive',
          role: d['roles'][0].roleName,
        }
      });
      this.obsUserCount.next(data.length);
    });
    this.organizationService.trafficFineOfOrganization(orgId).subscribe(x => {
      let data = x.message;
      this.trafficFineTable.data = data.map(d => {
        return {
          tcCode: d.tcCode,
          type: d.type,
          operator: `${d.operator.firstName} ${d.operator.lastName}  ${d.operator.id}`,
          plateNo: d.plateNumber,
          timeDate: d['time'],
          duration: d.duration,
          status: d.status,
          userStatus: d.userStatus,
          amount: `${d.amount} AED`,
        }
      });
      this.obsTrafficFineCount.next(data.length);
    });
    this.organizationService.movementHistoryOfOrganization(orgId).subscribe(x => {
      let data = x.message;
      this.movementTable.data = data.map(d => {
        return {
          asset: {
            img: d.asset.img,
            assetName: d.asset.assetName,
            assetSubName: d.asset.assetSubName,
            ownership: d.asset.ownership
          },
          startDate: d.startDate,
          endDate: d.endDate,
          operator: `${d['requester']['firstName']} ${d['operator']['lastName']} ${d['operator']['id']}`,
          fine: d.fine,
          reason: d.reason
        }
      });
      this.obsMovementHistoryCount.next(data.length);
    });
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
