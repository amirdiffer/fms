import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColumnType, TableSetting } from '@core/table';
import { FilterCardSetting } from '@core/filter/filter.component';
import { assetsPath } from '@environments/environment';
import { TrafficFineTableFacade } from '../traffic-fine/+state/traffic-fine';
import { AssetTrafficFineFacade } from './+state/asset-traffic-fine';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { controllers } from 'chart.js';

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
  showCustomFilter = false;
  filtersColumns = {
    trafficFineTab: [],
    assetTrafficFineTab: []
  };

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
    name: 'trafficFine',
    columns: [
      {
        lable: 'tables.column.traffic_file_number',
        type: 1,
        field: 'trafficFileNumber'
      },
      {
        lable: 'tables.column.number_of_tickets',
        type: 1,
        field: 'numOfTickets'
      },
      { lable: 'tables.column.total_fine', type: 1, field: 'totalFine' },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'external',
          onClick: (arg1, arg2, arg3) => {
            console.log(arg2);
            this.router
              .navigate([
                'traffic-fine/traffic-fine-overview/' + arg2.trafficFileNumber
              ])
              .then();
          },
          permission: ['ASSET_VIEW_DETAILS_OWN', 'ASSET_VIEW_SUMMARY_OWN']
        }
      ]
    }
  };
  assetTraffic_Table: TableSetting = {
    name: 'trafficFine_asset',
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
        field: 'Plate_Number'
      },
      {
        lable: 'tables.column.plate_code',
        type: 1,
        field: 'Plate_Code'
      },
      {
        lable: 'tables.column.plate_source',
        type: 1,
        field: 'Plate_Source'
      },
      {
        lable: 'tables.column.department',
        type: 1,
        field: 'Department'
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
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'external',
          onClick: (arg1, arg2, arg3) => {
            console.log(arg2);
            this.router
              .navigate(['traffic-fine/asset-overview/' + arg2.id])
              .then();
          },
          permission: ['ASSET_VIEW_DETAILS_OWN', 'ASSET_VIEW_SUMMARY_OWN']
        }
      ]
    }
  };

  trafficFine$ = this._trafficFineFacade.trafficFine$.pipe(
    map((response) =>
      response.map((trafficFine: any) => ({
        ...trafficFine,
        id: trafficFine.id,
        trafficFileNumber: trafficFine.trafficFileNumber,
        numOfTickets: trafficFine.numOfTickets,
        totalFine: trafficFine.totalFine
      }))
    )
  );
  assetTraffic$ = this._assetTrafficFineFacade.trafficFine$.pipe(
    map((response) =>
      response.map((assetTrafficFine: any) => ({
        ...assetTrafficFine,
        id: assetTrafficFine.asset.id,
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
        Total_Fines: assetTrafficFine.totalFine
      }))
    )
  );
  //#endregion

  constructor(
    private _trafficFineFacade: TrafficFineTableFacade,
    private _assetTrafficFineFacade: AssetTrafficFineFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setFiltersColumns_trafficFineTab();
    this.setFiltersColumns_assetTrafficFineTab();
    this._trafficFineFacade.loadAll();
    this._assetTrafficFineFacade.loadAll();
    this._trafficFineFacade.loadStatistics();
    this._trafficFineFacade.trafficFine$.subscribe((x) => {
      console.log(x);
    });
    this._assetTrafficFineFacade.trafficFine$.subscribe((x) => {
      console.log(x);
    });
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

  setFiltersColumns_trafficFineTab() {
    let removeField = [];
    let filtersColumns = Object.values({ ...this.trafficFine_Table.columns });
    let addition = [];
    filtersColumns = filtersColumns.concat(addition);
    this.filtersColumns.trafficFineTab = filtersColumns.filter(
      (x) => !removeField.includes(x['field'])
    );
  }

  setFiltersColumns_assetTrafficFineTab() {
    let removeField = [];
    let filtersColumns = Object.values({ ...this.assetTraffic_Table.columns });
    let addition = [];
    filtersColumns = filtersColumns.concat(addition);
    this.filtersColumns.assetTrafficFineTab = filtersColumns.filter(
      (x) => !removeField.includes(x['field'])
    );
  }

  customFilterEvent(data: object[], tab) {
    switch (tab) {
      case 'trafficFineTab': {
        this._trafficFineFacade.loadAll();
        break;
      }
      case 'assetTrafficFineTab': {
        this._assetTrafficFineFacade.loadAll();
        break;
      }
    }
  }
}
