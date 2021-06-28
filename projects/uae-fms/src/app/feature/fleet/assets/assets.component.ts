import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AssetsService } from './assets.service';
import { ColumnType, TableComponent } from '@core/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import moment from 'moment';
import { FilterCardSetting } from '@core/filter';
import { AssetMasterFacade } from '../+state/assets/asset-master';
import { RegistrationFacade } from '../+state/assets/registration';
import { CustomizationFacade } from '../+state/assets/customization';
import { FilterType } from '@core/table/table.component';

@Component({
  selector: 'anms-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit, OnDestroy, FilterCardSetting {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  statisticsSubscription!: Subscription;
  assetMasterSubscription!: Subscription;
  registrationSubscription!: Subscription;
  customizationSubscription!: Subscription;

  assetMasterTableSetting;
  pendingRegistrationTableSetting;
  pendingCustomizationTableSetting;
  filterSetting;

  selectedTab = 'assetMasterTab';
  showCustomFilter = false;
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  sampleImg = 'assets/thumb.png';
  filtersColumns = {
    assetMasterTab: [],
    pendingRegistrationTab: [],
    pendingCustomizationTab: []
  };
  //#region  table
  assetMasterCount$ = this.assetMasterFacade.conut$.pipe(
    map((x) => {
      return x;
    })
  );
  registrationCount$ = this.registrationFacade.conut$.pipe(
    map((x) => {
      return x;
    })
  );

  date(y) {
    let createdDate = moment
      .utc(y * 1000)
      .local()
      .toDate();
    let nowDate = new Date();
    let newDate = nowDate.getTime() - createdDate.getTime();
    return {
      day: Math.floor(newDate / (1000 * 3600 * 24))
    };
  }

  customizationCount$ = this.customizationFacade.conut$.pipe(
    map((x) => {
      return x;
    })
  );

  dataAssetMaster$ = this.assetMasterFacade.assetMaster$.pipe(
    map((x) => {
      return x.map((y: any) => {
        return {
          ...y,
          id: y.id,
          asset: {
            img: y.avatarId,
            assetName: y.assetTypeName,
            assetSubName: y.dpd,
            ownership: 'Owned'
          },
          type: y.assetConfigurationName,
          businessCategory: y.businessCategoryName,
          allocated: y.department.name,
          operator: y.operator.firstName + ' ' + y.operator.lastName,
          status: y.status,
          submitOn: this.getDateString(this.date(y.createdAt)),
          // brand: 'bmw.png',
          brand: y.makeName,
          killometer: y.actualOdometer,
          statusColor: '#009EFF'
        };
      });
    })
  );

  dataRegistration$ = this.registrationFacade.registration$.pipe(
    map((x) => {
      return x.map((y: any) => {
        return {
          ...y,
          id: y.id,
          asset: {
            img: y.avatarId,
            assetName: y.assetTypeName,
            assetSubName: y.dpd,
            progress: Math.floor(Math.random() * 6) + 1
          },
          serialNumber: y.dpd,
          brand: y.makeName + ' ' + y.modelName,
          type: y.assetConfigurationName,
          make: y.makeName,
          allocated: 'Finance',
          businessCategory: y.businessCategoryName,
          createDate: y.createdAt,
          registrantionDate: '00/00/00',
          creator: 'Sam Smith'
        };
      });
    })
  );

  dataCustomization$ = this.customizationFacade.customization$.pipe(
    map((x) => {
      return x.map((y: any) => {
        return {
          ...y,
          id: y.id,
          asset: {
            img: y.avatarId,
            assetName: y.assetTypeName,
            assetSubName: y.dpd,
            progress: Math.floor(Math.random() * 6) + 1
          },
          serialNumber: '123s125583456',
          brand: 'bmw.png',
          type: y.assetConfigurationName,
          businessCategory: y.businessCategoryName,
          createDate: y.createdAt,
          registrantionDate: '00/00/00',
          creator: y.operator.firstName + ' ' + y.operator.lastName
        };
      });
    })
  );
  //#endregion

  constructor(
    private _assetsService: AssetsService,
    private assetMasterFacade: AssetMasterFacade,
    private registrationFacade: RegistrationFacade,
    private customizationFacade: CustomizationFacade,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.registrationFacade.loadAll();
    this.assetMasterFacade.loadAll();
    this.customizationFacade.loadAll();

    this.assetMasterTableSetting = {
      name: 'assetMaster',
      columns: [
        {
          lable: 'tables.column.asset',
          field: 'asset',
          width: '12em',
          type: ColumnType.lable,
          thumbField: '',
          renderer: 'assetsRenderer'
        },
        {
          lable: 'tables.column.type',
          field: 'type',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: '',
          filterApiKey: 'type',
          filterType: FilterType.list
        },
        {
          lable: 'tables.column.business_category',
          field: 'businessCategory',
          width: 130,
          type: ColumnType.lable,
          thumbField: '',
          renderer: '',
          filterApiKey: 'businessCategory',
          filterType: FilterType.list
        },
        {
          lable: 'tables.column.department',
          field: 'allocated',
          width: '10em',
          type: ColumnType.lable,
          thumbField: '',
          renderer: '',
          filterApiKey: 'department',
          filterType: FilterType.list
        },
        {
          lable: 'tables.column.operator',
          field: 'operator',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: '',
          filterApiKey: 'operator',
          filterType: FilterType.list
        },
        {
          lable: 'tables.column.status',
          field: 'status',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: '',
          filterApiKey: 'status',
          filterType: FilterType.boolean
        },
        {
          lable: 'tables.column.submitted_on',
          field: 'submitOn',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: '',
          sortable: true
        },
        {
          lable: 'tables.column.make',
          field: 'brand',
          width: 100,
          type: 1,
          thumbField: 'brand',
          renderer: '',
          filterApiKey: 'make',
          filterType: FilterType.list
        },
        {
          lable: 'tables.column.current_meter',
          field: 'killometer',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: '',
          sortable: true,
          filterApiKey: 'current_meter',
          filterType: FilterType.string
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
            button: 'edit',
            color: '#3F3F3F',
            onClick: (col, data, button?) => {
              this.assetMasterFacade.reset();
              this.assetMasterFacade.getAssetByID(data.id);
              this._router.navigate(['/fleet/assets/edit-asset/' + data.id]);
            },
            permission: ['ASSET_UPDATE_OTHERS', 'ASSET_UPDATE_OWN']
          },
          // {
          //   button: 'download'
          // },
          {
            button: 'external',
            onClick: (col, data) => {
              this._router.navigate(['/fleet/assets/' + data.id]);
            },
            permission: ['ASSET_VIEW_DETAILS_OWN', 'ASSET_VIEW_SUMMARY_OWN']
          }
        ]
      }
    };

    this.pendingRegistrationTableSetting = this._assetsService.pedingRegistrationTableSetting();
    this.pendingCustomizationTableSetting = this._assetsService.pedingCustomizationTableSetting();

    this.setFiltersColumns_assetMaster();
    this.setFiltersColumns_registration();
    this.setFiltersColumns_customization();

    this.filterSetting = [
      {
        filterTitle: 'statistic.total',
        filterCount: '',
        filterTagColor: '#028D5D'
      },
      {
        filterTitle: 'statistic.active',
        filterCount: '',
        filterTagColor: '#009EFF'
      },
      {
        filterTitle: 'statistic.inactive',
        filterCount: '',
        filterTagColor: '#FCB614'
      },
      {
        filterTitle: 'statistic.xfleet',
        filterCount: '',
        filterTagColor: '#F75A4A'
      }
    ];

    this.assetMasterFacade.loadStatistics();

    this.statisticsSubscription = this.assetMasterFacade.statistics$.subscribe(
      (response) => {
        if (response) {
          this.filterSetting.map((filter) => {
            switch (filter.filterTitle) {
              case 'statistic.total':
                filter.filterCount = response.message.total;
                break;
              case 'statistic.active':
                filter.filterCount = response.message.active;
                break;
              case 'statistic.inactive':
                filter.filterCount = response.message.inactive;
                break;
              case 'statistic.xfleet':
                filter.filterCount = response.message.xfleet;
                break;
              default:
                break;
            }
          });
        }
      }
    );
  }

  onActive(index: number): void {
    switch (index) {
      case 0:
        this.table.filterByStatistics('total');
        break;
      case 1:
        this.table.filterByStatistics('active');
        break;
      default:
        break;
    }
  }

  add() {
    this.assetMasterFacade.reset();
    this._router.navigate(['fleet/assets/add-new-asset']);
  }

  exportTable() {
    let filter;
    switch (this.selectedTab) {
      case 'assetMasterTab':
        filter = {
          asset: 'assetTypeName|dpd|Owned',
          type: 'assetTypeName',
          businessCategory: 'businessCategoryName',
          allocated: 'department.name',
          operator: 'operator',
          status: 'status',
          submitOn: 'createdAt?func:submitOnFunc',
          submitOnFunc: (y) => {
            return this.date(y).day > 0
              ? this.date(y).day == 1
                ? `${this.date(y).day} Yesterday`
                : `${this.date(y).day} Days Ago`
              : 'Today';
          },
          brand: 'makeName',
          killometer: 'actualOdometer'
        };
        this.table.exportTable(
          this.assetMasterTableSetting,
          this.selectedTab,
          filter
        );
        break;
      case 'pendingRegistrationTab':
        filter = {
          asset: 'dpd',
          serialNumber: 'dpd',
          allocated: 'Finance',
          make: 'makeName',
          type: 'assetConfigurationName',
          businessCategory: 'businessCategoryName'
        };
        this.table.exportTable(
          this.pendingRegistrationTableSetting,
          this.selectedTab,
          filter
        );
        break;
      case 'pendingCustomizationTab':
        filter = {
          asset: 'dpd',
          businessCategory: 'businessCategoryName',
          createDate: 'createdAt',
          registrantionDate: '00/00/00',
          creator: 'operator.firstName|operator.lastName'
        };
        this.table.exportTable(
          this.pendingCustomizationTableSetting,
          this.selectedTab,
          filter
        );
        break;
    }
  }

  eventPagination_assetmaster() {
    this.assetMasterFacade.loadAll();
  }
  eventPagination_registration() {
    this.registrationFacade.loadAll();
  }
  eventPagination_customization() {
    this.customizationFacade.loadAll();
  }

  ngOnDestroy(): void {
    this.assetMasterSubscription?.unsubscribe();
    this.registrationSubscription?.unsubscribe();
    this.customizationSubscription?.unsubscribe();
    this.statisticsSubscription?.unsubscribe();
  }

  getDateString(date) {
    if (date.day > 365) {
      return `${Math.floor(date.day / 365)} Years Ago`;
    } else if (date.day > 30) {
      return `About ${Math.floor(date.day / 30)} Months Ago`;
    } else
      return date.day > 0
        ? date.day == 1
          ? `Yesterday`
          : `${date.day} Days Ago`
        : 'Today';
  }

  customFilterEvent(data: object[], tab) {
    switch (tab) {
      case 'assetMasterTab': {
        this.assetMasterFacade.loadAll();
        break;
      }
      case 'pendingRegistrationTab': {
        this.registrationFacade.loadAll();
        break;
      }
      case 'pendingCustomizationTab': {
        this.customizationFacade.loadAll();
        break;
      }
    }
  }

  setFiltersColumns_assetMaster() {
    let removeField = ['asset', 'status', 'submitOn', 'killometer'];
    let filtersColumns = Object.values({
      ...this.assetMasterTableSetting.columns
    });
    filtersColumns.splice(7, 1);
    filtersColumns.splice(2, 0, {
      lable: 'tables.column.make',
      field: 'brand',
      filterApiKey: 'make',
      filterType: FilterType.list
    });
    filtersColumns.splice(4, 0, {
      lable: 'tables.column.organization',
      field: 'organization',
      filterApiKey: 'organization',
      filterType: FilterType.list
    });
    let addition = [];
    filtersColumns = filtersColumns.concat(addition);
    this.filtersColumns.assetMasterTab = filtersColumns.filter(
      (x) => !removeField.includes(x['field'])
    );
  }

  setFiltersColumns_registration() {
    let removeField = ['asset', 'serialNumber', 'allocated'];
    let filtersColumns = Object.values({
      ...this.pendingRegistrationTableSetting.columns
    });
    filtersColumns.splice(3, 1);
    filtersColumns.splice(4, 0, {
      lable: 'tables.column.make',
      field: 'brand',
      filterApiKey: 'make',
      filterType: FilterType.list
    });
    let addition = [];
    filtersColumns = filtersColumns.concat(addition);
    this.filtersColumns.pendingRegistrationTab = filtersColumns.filter(
      (x) => !removeField.includes(x['field'])
    );
  }

  setFiltersColumns_customization() {
    let removeField = ['asset', 'registrantionDate'];
    let filtersColumns = Object.values({
      ...this.pendingCustomizationTableSetting.columns
    });
    let addition = [];
    filtersColumns = filtersColumns.concat(addition);
    this.filtersColumns.pendingCustomizationTab = filtersColumns.filter(
      (x) => !removeField.includes(x['field'])
    );
  }
}
