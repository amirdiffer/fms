import { Component, OnInit } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import { FuelCardsFacade } from '../fuel-management/+state/fuel-cards';
import { AssetUsageFacade } from './+state/asset-usage';
import { Router } from '@angular/router';
import { ColumnType } from '@core/table';
import { Subscription } from 'rxjs';
import { IFuelManagementStatistics } from '@models/statistics';

@Component({
  selector: 'anms-fuel-management',
  templateUrl: './fuel-management.component.html',
  styleUrls: ['./fuel-management.component.scss']
})
export class FuelManagementComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  fuelCards$: Subscription;
  statistics$: Subscription;
  statisticsCount: IFuelManagementStatistics = {
    total: 2456,
    available: 356,
    assigned: 124
  };
  filterSetting: FilterCardSetting[];

  assetUsageTable$ = this._facadeAssetUsage.assetUsage$;
  fuelCardsTable$ = this._facadeFuelCard.fuelCards$;

  assetUsageTableSetting = {
    columns: [
      {
        lable: 'tables.column.asset',
        field: 'asset',
        width: '17em',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'assetsRenderer'
      },
      {
        lable: 'tables.column.plate_number',
        field: 'plateNumber',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.tag_no',
        field: 'tagNo',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.date',
        field: 'date',
        type: ColumnType.lable,
        thumbField: '',
        renderer: '',
        sortable: true
      },
      {
        lable: 'tables.column.amount',
        field: 'amount',
        type: ColumnType.lable,
        thumbField: '',
        renderer: '',
        sortable: true
      },
      {
        lable: 'tables.column.mileage',
        field: 'mileage',
        type: ColumnType.lable,
        thumbField: '',
        renderer: '',
        sortable: true
      },
      {
        lable: 'tables.column.total_usage',
        field: 'totalUsage',
        type: ColumnType.lable,
        thumbField: '',
        renderer: '',
        sortable: true
      },
      {
        lable: 'tables.column.cost',
        field: 'cost',
        type: ColumnType.lable,
        thumbField: '',
        renderer: '',
        sortable: true
      },
      {
        lable: 'tables.column.card_type',
        field: 'cardType',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      }
    ],
    data: []
  };
  fuelCardsTableSetting = {
    columns: [
      {
        lable: 'tables.column.tag_no',
        field: 'tagNo',
        type: ColumnType.lable,
        thumbField: '',
        renderer: 'fuelCardRenderer'
      },
      {
        lable: 'tables.column.usage_limit',
        field: 'usageLimit',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.asset',
        field: 'asset',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.card_type',
        field: 'cardType',
        type: ColumnType.lable,
        thumbField: '',
        renderer: ''
      },
      {
        lable: 'tables.column.expire_date',
        field: 'expire',
        type: ColumnType.lable,
        thumbField: '',
        renderer: '',
        sortable: true
      }
    ],
    data: []
  };

  constructor(
    private _facadeFuelCard: FuelCardsFacade,
    private _facadeAssetUsage: AssetUsageFacade,
    private _router: Router
  ) { }

  selectedTab;
  ngOnInit(): void {
    this._facadeFuelCard.loadAll();
    this.statisticsFilters(this.statisticsCount);
    this.fuelCards$ = this._facadeFuelCard.fuelCards$.subscribe((data: any) => {
      if (data) {
        this.fuelCardsTableSetting.data = data?.map((item) => {
          return {
            tagNo: {
              tagNo: item.tagNumber,
              data: item.used
            },
            used: item.usageLimit,
            usageLimit: item.usageLimit,
            asset: item.assignedTo,
            cardType: item.cardType,
            expire: item.expireDate
          };
        });
      }
    });
    this.statistics$ = this._facadeFuelCard.statistics$.subscribe((data) => {
      if (data) {
        this.statisticsFilters(data);
      }
    });
    this._facadeAssetUsage.loadAll();
  }
  addClicked(e: Event) {
    switch (this.selectedTab) {
      case 'Fuel Cards':
        this._router.navigate(['fuel-management/add-fuel-card']);
        break;
      case 'assetUsageTab':
        this._router.navigate(['fuel-management/add-asset-usage'], {
          queryParams: { id: 'assetUsageTab' }
        });
        break;
      default:
        this._router.navigate(['fuel-management/add-fuel-card']);
        break;
    }
  }
  statisticsFilters(statisticsCount: IFuelManagementStatistics) {
    this.filterSetting = [
      {
        filterTitle: 'statistic.total',
        filterTagColor: '#B892FF',
        filterCount: statisticsCount?.total?.toString()||0,
        onActive(index: number): void { }
      },
      {
        filterTitle: 'statistic.available',
        filterTagColor: '#EF7A85',
        filterCount: statisticsCount?.available?.toString()||0,
        onActive(index: number): void { }
      },
      {
        filterTitle: 'statistic.assigned',
        filterTagColor: '#709775',
        filterCount: statisticsCount?.assigned?.toString()||0,
        onActive(index: number): void { }
      }
    ];
  }
}
