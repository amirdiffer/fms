import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter/filter.component';
import { assetsPath } from '@environments/environment';
import { TrafficFineTableFacade } from '../traffic-fine/+state/traffic-fine';
import { AssetTrafficFineFacade } from './+state/asset-traffic-fine';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.paid',
      filterCount: '356',
      filterTagColor: '#4F4198',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unpainted',
      filterCount: '124',
      filterTagColor: '#EB941D',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.deducte',
      filterCount: '12',
      filterTagColor: '#F75A4A',
      onActive(index: number) {}
    }
  ];
  //#endregion

  //#region Table
  trafficFine_Table: TableSetting = {
    columns: [
      { lable: 'tables.column.traffic_file_number', type: 1, field: 'trafficFileNumber' },
      { lable: 'tables.column.number_of_tickets', type: 1, field: 'numOfTickets' },
      { lable: 'tables.column.total_fine', type: 1, field: 'totalFine' },
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
      },
      {
        lable: 'tables.column.plate_code',
        type: 1,
        field: 'Plate_Code',
      },
      {
        lable: 'tables.column.plate_source',
        type: 1,
        field: 'Plate_Source',
      },
      {
        lable: 'tables.column.department',
        type: 1,
        field: 'Department',
      },
      {
        lable: 'tables.column.operator',
        type: 1,
        field: 'Operator',
        renderer: 'doubleLineRenderer',
        width: 180
      },
      {
        lable: 'tables.column.total_fines',
        type: 1,
        field: 'Total_Fines',
        sortable: true,
        hasPadding5: true
      }
    ],
    data: []
  };

  trafficFine$ = this._trafficFineFacade.trafficFine$.pipe(
    map(response => response.map((trafficFine: any) => ({
      id: trafficFine.id,
      trafficFileNumber: trafficFine.trafficFileNumber,
      numOfTickets: trafficFine.numOfTickets,
      totalFine: trafficFine.totalFine,
    })))
  );
  assetTraffic$ = this._assetTrafficFineFacade.trafficFine$.pipe(
    map(response => response.map((assetTrafficFine: any) => {
      console.log(assetTrafficFine.department.name);
      return {
        id: assetTrafficFine.id,
        asset: {
          img: 'thumb1.png',
          assetName: assetTrafficFine.asset.dpd,
          ownership: assetTrafficFine.asset.ownershipType
        },
        Plate_Number: assetTrafficFine.plateNumber,
        Plate_Code: assetTrafficFine.plateCode,
        Plate_Source: assetTrafficFine.plateSource,
        Department: assetTrafficFine.department.name,
        Operator: {
          line1: `${assetTrafficFine.operator.firstName} ${assetTrafficFine.operator.lastName}`,
          line2: assetTrafficFine.operator.id
        },
        Total_Fines: assetTrafficFine.totalFine,
      }
    }    ))
  );
  //#endregion

  constructor(
    private _trafficFineFacade: TrafficFineTableFacade,
    private _assetTrafficFineFacade: AssetTrafficFineFacade
  ) {}

  ngOnInit(): void {
    this._trafficFineFacade.loadAll();
    this._assetTrafficFineFacade.loadAll();

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
