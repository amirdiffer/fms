import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterCardSetting } from '@core/filter';
import { ColumnType, TableComponent, TableSetting } from '@core/table';
import {
  AssetTypeFacade,
  SubAssetTypeFacade
} from '@feature/configuration/+state/fleet-configuration';
import {
  PartListFacade,
  PartListService
} from '@feature/part-store/+state/part-list';
import { PartMasterFacade } from '@feature/part-store/+state/part-master/part-master.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.scss']
})
export class PartListComponent implements OnInit, OnDestroy {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  partList = true;
  recordId: number;
  selectedTab = 'assetPartTab';
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  assetType$: Observable<any>;
  subAssetType$: Observable<any>;
  assetPartCategory$: Observable<any>;
  subAssetPartCategory$: Observable<any>;

  assetTypeSelected;
  subAssetTypeSelected;
  assetCategorySelected;
  subAssetCategorySelected;
  assetCategorySelectedId: number;
  subAssetCategorySelectedId: number;

  filterCardAsset: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '0',
      filterTagColor: '#42D0D9',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '0',
      filterTagColor: '#20E19D',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.need_to_order',
      filterCount: '0',
      filterTagColor: '#F2B06E',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unavailable',
      filterCount: '0',
      filterTagColor: '#AAAAAA',
      onActive(index: number) {}
    }
  ];

  filterCardSubAsset: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '0',
      filterTagColor: '#42D0D9',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '0',
      filterTagColor: '#20E19D',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.need_to_order',
      filterCount: '0',
      filterTagColor: '#F2B06E',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unavailable',
      filterCount: '0',
      filterTagColor: '#AAAAAA',
      onActive(index: number) {}
    }
  ];

  tableAssetPartData$: Observable<any>;
  tableSubAssetPartData$: Observable<any>;

  tableAssetPart: TableSetting;
  tableSubAssetPart: TableSetting;
  partListDetaisTable: TableSetting = {
    columns: [
      {
        lable: 'tables.column.item',
        type: ColumnType.lable,
        field: 'itemName'
      },
      {
        lable: 'tables.column.make',
        type: ColumnType.lable,
        field: 'makeName'
      },
      {
        lable: 'tables.column.model',
        type: ColumnType.lable,
        field: 'modelName'
      },
      {
        lable: 'tables.column.description',
        type: ColumnType.lable,
        field: 'description'
      },
      {
        lable: 'tables.column.status',
        type: ColumnType.lable,
        field: 'status'
      },
      {
        lable: 'tables.column.total_quantity',
        type: ColumnType.lable,
        field: 'totalQuantity',
        sortable: true
      },
      {
        lable: 'tables.column.total_cost',
        type: ColumnType.lable,
        field: 'totalCost',
        sortable: true
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: ColumnType.lable,
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      floatButton: [
        {
          button: 'external',
          onClick: (col, data, button?) => {
            this._router.navigate(['part-store/part-list/' + data.id], {
              queryParams: { fleetType: data.fleetType.toLowerCase() }
            });
          },
          permission: ['PARTSTORE_PART_VIEW_DETAILS']
        }
      ]
    }
  };

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private route: ActivatedRoute,
    private _facadePartMaster: PartMasterFacade,
    private _fleetConfigurationAsset: AssetTypeFacade,
    private _fleetConfigurationSubAsset: SubAssetTypeFacade,
    private _facadePartList: PartListFacade,
    private _service: PartListService
  ) {}

  ngOnInit(): void {
    this.tableAssetPart = Object.create(this.partListDetaisTable);
    this.tableSubAssetPart = Object.create(this.partListDetaisTable);
    this._fleetConfigurationAsset.loadAll();
    this._fleetConfigurationSubAsset.loadAll();
    this._facadePartList.statisticsAssetPart$.subscribe((x) => {
      if (x) {
        this.filterCardAsset.map((y) => {
          switch (y.filterTitle) {
            case 'statistic.total':
              y.filterCount = x.total;
              break;
            case 'statistic.available':
              y.filterCount = x.available;
              break;
            case 'statistic.need_to_order':
              y.filterCount = x.needToOrder;
              break;
            case 'statistic.unavailable':
              y.filterCount = x.unavailable;
              break;
          }
        });
      }
    });
    this._facadePartList.statisticsSubAssetPart$.subscribe((x) => {
      if (x) {
        this.filterCardSubAsset.map((y) => {
          switch (y.filterTitle) {
            case 'statistic.total':
              y.filterCount = x.total;
              break;
            case 'statistic.available':
              y.filterCount = x.available;
              break;
            case 'statistic.need_to_order':
              y.filterCount = x.needToOrder;
              break;
            case 'statistic.unavailable':
              y.filterCount = x.unavailable;
              break;
          }
        });
      }
    });
    /* Load Table Data */
    this.tableAssetPartData$ = this._facadePartList.assetAccumulatedPartList$.pipe(
      map((x) => {
        return x.map((item) => {
          const statusCheck = () => {
            let status: string;
            let diff = item.totalQuantity - item.totalConsumed;
            if (diff > 0) {
              status = 'Available';
            }
            if (diff == 0) {
              status = 'Unavailable';
            }
            if (diff < 0) {
              status = 'Need to Order';
            }
            return status;
          };
          return {
            ...item,
            status: statusCheck()
          };
        });
      })
    );

    this.tableSubAssetPartData$ = this._facadePartList.subAssetAccumulatedPartList$.pipe(
      map((x) => {
        return x.map((item) => {
          const statusCheck = () => {
            let status: string;
            let diff = item.totalQuantity - item.totalConsumed;
            if (diff > 0) {
              status = 'Available';
            }
            if (diff == 0) {
              status = 'Unavailable';
            }
            if (diff < 0) {
              status = 'Need to Order';
            }
            return status;
          };
          return {
            ...item,
            status: statusCheck()
          };
        });
      })
    );
    // this._facade.loadAllAssetPartList(2)
    // this._facadePartMaster.loadAllCategoryOfAsset(1)
    // this._facadePartMaster.loadAllCategoryOfSubAsset(1);

    this.assetType$ = this._fleetConfigurationAsset.assetType$.pipe(
      map((x) => {
        if (x) {
          return x.map((assetType, i) => {
            if (i === 0 && !this.assetTypeSelected) {
              this.assetTypeChanges(assetType.id);
              this.assetTypeSelected = assetType;
            }
            return assetType;
          });
        }
      })
    );

    this.subAssetType$ = this._fleetConfigurationSubAsset.subAssetType$.pipe(
      map((x) => {
        if (x) {
          return x.map((subAssetType, i) => {
            if (i === 0 && !this.subAssetTypeSelected) {
              this.subAssetTypeChanges(subAssetType.id);
              this.subAssetTypeSelected = subAssetType;
            }
            return subAssetType;
          });
        }
      })
    );

    this.assetPartCategory$ = this._facadePartMaster.partMasterAssetCategory$.pipe(
      map((x) => {
        if (x) {
          return x.map((assetPart, i) => {
            if (i === 0) {
              this.assetCategoryChanges(assetPart.id);
              this.assetCategorySelected = assetPart;
            }
            return assetPart;
          });
        } else {
          this._facadePartList.resetPartAssetState();
        }
      })
    );
    this.subAssetPartCategory$ = this._facadePartMaster.partMasterSubAssetCategory$.pipe(
      map((x) => {
        if (x) {
          return x.map((subAssetPart, i) => {
            if (i === 0) {
              this.subAssetCategoryChanges(subAssetPart.id);
              this.subAssetCategorySelected = subAssetPart;
            }
            return subAssetPart;
          });
        } else {
          this._facadePartList.resetPartSubAssetState();
        }
      })
    );
  }

  exportTable() {
    let filter = {
      item: '',
      model: '',
      quantity: '',
      description: '',
      warrantyExpire: '',
      status: '',
      cost: '',
      total: ''
    };
    switch (this.selectedTab) {
      case 'assetPartTab':
        this.table.exportTable(this.tableAssetPart, this.selectedTab, filter);
        break;
      case 'subAssetPartTab':
        this.table.exportTable(
          this.tableSubAssetPart,
          this.selectedTab,
          filter
        );
        break;
    }
  }

  assetTypeChanges(event) {
    this._facadePartMaster.loadAllCategoryOfAsset(event);
  }

  assetCategoryChanges(event) {
    this._facadePartList.loadAllAccumulatedAssetPartList(event);
    this._facadePartList.loadStatisticsPartOfAsset(event);
    this.assetCategorySelectedId = event;
  }

  subAssetTypeChanges(event) {
    this._facadePartMaster.loadAllCategoryOfSubAsset(event);
  }
  subAssetCategoryChanges(event) {
    this._facadePartList.loadAllAccumulatedSubAssetPartList(event);
    this._facadePartList.loadStatisticsPartOfSubAsset(event);
    this.subAssetCategorySelectedId = event;
  }

  eventPagination_accumulatedPartOfAsset() {
    this._facadePartList.loadAllAccumulatedAssetPartList(
      this.assetCategorySelectedId
    );
  }

  eventPagination_accumulatedPartOfSubAsset() {
    this._facadePartList.loadAllAccumulatedSubAssetPartList(
      this.subAssetCategorySelectedId
    );
  }

  ngOnDestroy() {
    this._fleetConfigurationAsset.resetEntities();
  }
}
