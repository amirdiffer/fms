import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter/filter.component';
import { assetsPath } from '@environments/environment';
import { TrafficFineTableFacade } from '../traffic-fine/+state/traffic-fine';
import { AssetTrafficFineFacade } from './+state/asset-traffic-fine';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anms-traffic-fine',
  templateUrl: './traffic-fine.component.html',
  styleUrls: ['./traffic-fine.component.scss']
})
export class TrafficFineComponent implements OnInit, OnDestroy {
  getStatisticsSubscription!: Subscription;

  assets = assetsPath;
  activeTab = 'Traffic Fine';
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';

  //#region Filter
  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '2456',
      filterTagColor: '#6F89A7',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.paid',
      filterCount: '356',
      filterTagColor: '#4F4198',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.unpainted',
      filterCount: '124',
      filterTagColor: '#EB941D',
      onActive(index: number) { }
    },
    {
      filterTitle: 'statistic.deducte',
      filterCount: '12',
      filterTagColor: '#F75A4A',
      onActive(index: number) { }
    }
  ];
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
        width: 100
      },
      {
        lable: 'tables.column.operator',
        type: 1,
        field: 'Operator',
        renderer: 'doubleLineRenderer',
        width: 100
      },
      {
        lable: 'tables.column.plate_no',
        type: 1,
        field: 'Plate_No',
        width: 100
      },
      {
        lable: 'tables.column.employe_id',
        type: 1,
        field: 'employeID',
        width: 100
      },
      {
        lable: 'tables.column.business_category',
        type: 1,
        field: 'businessCategory',
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
      },
      { lable: 'tables.column.status', type: 1, field: 'Status', width: 100 },
      { lable: 'tables.column.user_status', type: 1, field: 'User', width: 100 },
      { lable: 'tables.column.amount', type: 1, field: 'Amount', width: 100, sortable: true }
    ],
    data: []
  };
  assetTraffic_Table: TableSetting = {
    columns: [
      {
        lable: 'tables.column.asset',
        type: 1,
        field: 'asset',
        renderer: 'assetsRenderer',
        thumbField: '',
        width: 200
      },
      {
        lable: 'tables.column.plate_number',
        type: 1,
        field: 'Plate_Number',
        width: 100
      },
      { lable: 'Type', type: 1, field: 'Type', width: 100 },
      {
        lable: 'tables.column.operator',
        type: 1,
        field: 'Operator',
        renderer: 'doubleLineRenderer',
        width: 100
      },
      { lable: 'tables.column.status', type: 1, field: 'Status', width: 100 },
      {
        lable: 'tables.column.business_category',
        type: 1,
        field: 'Business_Category',
        width: 100
      },
      {
        lable: 'tables.column.total_fines',
        type: 1,
        field: 'Total_Fines',
        width: 100,
        sortable: true
      },
      { lable: 'tables.column.amount', type: 1, field: 'Amount', width: 100, sortable: true }
    ],
    data: []
  };

  trafficFine$ = this._trafficFineFacade.trafficFine$;
  assetTraffic$ = this._assetTrafficFineFacade.trafficFine$;
  //#endregion

  constructor(
    private _trafficFineFacade: TrafficFineTableFacade,
    private _assetTrafficFineFacade: AssetTrafficFineFacade
  ) { }

  ngOnInit(): void {
    this._trafficFineFacade.loadAll();
    this._trafficFineFacade.trafficFine$.subscribe((x) => {
      this.trafficFine_Table.data = [];
      x.map((responseObject) => {
        const trafficFineTableData = {
          statusColor: '#6D59D9',
          TC_Code: responseObject.tcCode,
          Type: responseObject.type,
          Department: responseObject.department.name,
          Operator: {
            line1: `${responseObject.operator.firstName} ${responseObject.operator.lastName}`,
            line2: responseObject.operator.id
          },
          Plate_No: responseObject.plateNumber,
          Mission_Status: responseObject.missionStatus,
          Time_Date: {
            line1: responseObject.date.substr(0, 10),
            line2: responseObject.date.substr(11, 5)
          },
          Duration: responseObject.duration,
          Status: responseObject.status,
          User: responseObject.userStatus,
          Amount: responseObject.amount
        };
        this.trafficFine_Table.data.push(trafficFineTableData);
      });
    });
    this._assetTrafficFineFacade.loadAll();
    this._assetTrafficFineFacade.trafficFine$.subscribe((x) => {
      this.assetTraffic_Table.data = [];
      x.map((responseObject) => {
        const assetTrafficTableData = {
          asset: {
            img: 'thumb1.png',
            assetName: responseObject.asset.id,
            assetSubName: responseObject.asset.dpd,
            ownership: responseObject.ownershipId
          },
          thumbField: 'thumb1.png',
          Plate_Number: responseObject.plateNumber,
          Type: responseObject.type,
          Operator: {
            line1: `${responseObject.operator.firstName} ${responseObject.operator.lastName}`,
            line2: responseObject.operator.id
          },
          Status: responseObject.status,
          Business_Category: responseObject.businessCategoryId,
          Total_Fines: `${responseObject.totalFines} AED`,
          Amount: `${responseObject.amount} AED`
        };
        this.assetTraffic_Table.data.push(assetTrafficTableData);
      });
    });

    this._trafficFineFacade.loadStatistics();
    this.getStatisticsSubscription = this._trafficFineFacade.statistics$.subscribe(
      (response) => {
        if (response) {
          const message = response.message;
          this.filterCard.map((filter) => {
            switch (filter.filterTitle) {
              case 'statistic.total':
                filter.filterCount = message.total;
                break;
              case 'statistic.paid':
                filter.filterCount = message.paid;
                break;
              case 'statistic.unpainted':
                filter.filterCount = message.unpaid;
                break;
              case 'statistic.deducte':
                filter.filterCount = message.deducted;
                break;
              default:
                break;
            }
          });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.getStatisticsSubscription?.unsubscribe();
  }
}
