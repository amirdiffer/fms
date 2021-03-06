import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent, TableSetting } from '@core/table';
import { AssetPolicyFacade } from '../+state/asset-policy/asset';
import { SubAssetPolicyFacade } from '../+state/asset-policy/sub-asset';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'anms-asset-policy',
  templateUrl: './asset-policy.component.html',
  styleUrls: ['./asset-policy.component.scss']
})
export class AssetPolicyComponent implements OnInit, OnDestroy {
  #startRegionVariables;
  @ViewChild(TableComponent, { static: false }) table: TableComponent;
  selectedTab: any;
  getAssetPolicySubscription!: Subscription;
  downloadBtn = 'assets/icons/download-solid.svg';
  showCustomFilter = false;
  filtersColumns = {
    assetPolicyAssetTab: [],
    assetPolicySubAssetTab: []
  };
  #endRegionVariables;

  #startRegionTables;
  assetPolicy_Table: TableSetting = {
    name: 'assetPolicy_asset',
    columns: [
      {
        lable: 'tables.column.policy_name',
        type: 1,
        field: 'Policy_Name',
        filterApiKey: 'name'
      },
      {
        lable: 'tables.column.distance',
        type: 1,
        field: 'Distance',
        sortable: true
      },
      {
        lable: 'tables.column.year',
        type: 1,
        field: 'Year',
        sortable: true
      },
      {
        lable: 'tables.column.depreciation_value',
        type: 1,
        field: 'Depreciation_Value',
        sortable: true,
        filterApiKey: 'depreciationValue'
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: 1,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      onClick: (col, data, button?) => {},
      floatButton: [
        {
          onClick: (col, data) => {
            this._router.navigate([
              '/configuration/asset-policy/edit-asset-policy/' + data.id
            ]);
          },
          permission: ['ASSET_POLICY_ASSET_UPDATE'],
          button: 'edit'
        }
      ]
    }
  };
  subAssetPolicy_Table: TableSetting = {
    name: 'assetPolicy_subAsset',
    columns: [
      {
        lable: 'tables.column.policy_name',
        type: 1,
        field: 'Policy_Name',
        filterApiKey: 'name'
      },
      {
        lable: 'tables.column.distance',
        type: 1,
        field: 'Distance',
        sortable: true
      },
      { lable: 'tables.column.year', type: 1, field: 'Year', sortable: true },
      {
        lable: 'tables.column.depreciation_value',
        type: 1,
        field: 'Depreciation_Value',
        sortable: true,
        filterApiKey: 'depreciationValue'
      },
      {
        lable: '',
        field: 'floatButton',
        width: 0,
        type: 1,
        thumbField: '',
        renderer: 'floatButton'
      }
    ],
    data: [],
    rowSettings: {
      onClick: (col, data, button?) => {},
      floatButton: [
        {
          onClick: (col, data) => {
            this._router.navigate([
              '/configuration/asset-policy/edit-asset-policy/' + data.id
            ]);
          },
          permission: ['ASSET_POLICY_SUB_ASSET_UPDATE'],
          button: 'edit'
        }
      ]
    }
  };
  assetPolicy$ = this.assetPolicyFacade.assetPolicy$.pipe(
    map((x) =>
      x.map((item) => {
        return {
          id: item.id,
          Policy_Name: item.name,
          Distance: item.maxUsageKPHour,
          Year: item.maxUsageYear,
          Depreciation_Value: item.depreciationValue
        };
      })
    )
  );
  subAssetPolicy$ = this.subAssetPolicyFacade.subAssetPolicy$.pipe(
    map((x) =>
      x.map((item) => {
        return {
          id: item.id,
          Policy_Name: item.name,
          Distance: item.maxUsageKPHour,
          Year: item.maxUsageYear,
          Depreciation_Value: item.depreciationValue
        };
      })
    )
  );
  assetPolicyCount$ = this.assetPolicyFacade.conut$.pipe(
    map((x) => {
      return x;
    })
  );
  subAssetPolicyCount$ = this.subAssetPolicyFacade.conut$.pipe(
    map((x) => {
      return x;
    })
  );
  #endRegionTables;

  constructor(
    private _router: Router,
    private assetPolicyFacade: AssetPolicyFacade,
    private subAssetPolicyFacade: SubAssetPolicyFacade
  ) {}

  ngOnInit(): void {
    this.setFiltersColumns_assetPolicyAssetTab();
    this.setFiltersColumns_assetPolicySubAssetTab();
    this.assetPolicyFacade.loadAll();
    this.subAssetPolicyFacade.loadAll();
  }

  ngOnDestroy(): void {
    this.getAssetPolicySubscription?.unsubscribe();
  }

  addClicked(e: Event) {
    switch (this.selectedTab) {
      case 'assetPolicyAssetTab':
        this._router.navigate(['configuration/asset-policy/add']);
        break;
      case 'assetPolicySubAssetTab':
        this._router.navigate(['configuration/asset-policy/add'], {
          queryParams: { id: 'assetPolicySubAssetTab' }
        });
        break;
      default:
        this._router.navigate(['configuration/asset-policy']);
        break;
    }
  }

  exportTable() {
    let filter;
    switch (this.selectedTab) {
      case 'assetPolicyAssetTab':
        filter = {
          Policy_Name: 'Policy_Name',
          Distance: 'Distance',
          Year: 'Year',
          Depreciation_Value: 'Depreciation_Value'
        };
        this.table.exportTable(this.assetPolicy_Table, 'Asset', filter);
        break;
      case 'assetPolicySubAssetTab':
        filter = {
          Policy_Name: 'Policy_Name',
          Distance: 'Distance',
          Year: 'Year',
          Depreciation_Value: 'Depreciation_Value'
        };
        this.table.exportTable(this.subAssetPolicy_Table, 'Sub Asset', filter);
        break;
    }
  }

  eventPagination_asset() {
    this.assetPolicyFacade.loadAll();
  }

  eventPagination_subasset() {
    this.subAssetPolicyFacade.loadAll();
  }

  setFiltersColumns_assetPolicyAssetTab() {
    let removeField = ['Distance', 'Year'];
    let filtersColumns = Object.values({ ...this.assetPolicy_Table.columns });
    let addition = [];
    filtersColumns = filtersColumns.concat(addition);
    this.filtersColumns.assetPolicyAssetTab = filtersColumns.filter(
      (x) => !removeField.includes(x['field'])
    );
  }

  setFiltersColumns_assetPolicySubAssetTab() {
    let removeField = ['Distance', 'Year'];
    let filtersColumns = Object.values({
      ...this.subAssetPolicy_Table.columns
    });
    let addition = [];
    filtersColumns = filtersColumns.concat(addition);
    this.filtersColumns.assetPolicySubAssetTab = filtersColumns.filter(
      (x) => !removeField.includes(x['field'])
    );
  }

  customFilterEvent(data: object[], tab) {
    switch (tab) {
      case 'assetPolicyAssetTab': {
        this.assetPolicyFacade.loadAll();
        break;
      }
      case 'assetPolicySubAssetTab': {
        this.subAssetPolicyFacade.loadAll();
        break;
      }
    }
  }
}
