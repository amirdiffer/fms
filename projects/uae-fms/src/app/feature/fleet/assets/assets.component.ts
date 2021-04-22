import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AssetsService } from './assets.service';
import { ColumnType, TableComponent } from '@core/table';
import { AssetMasterFacade } from '../+state/assets/asset-master';
import { Subscription } from 'rxjs';
import { RegistrationFacade } from '@feature/fleet/+state/assets/registration';
import { CustomizationFacade } from '@feature/fleet/+state/assets/customization';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { yearsPerPage } from '@angular/material/datepicker';
import { TechnicalInspectionSelectors } from '@feature/workshop/+state/technical-inspections/technical-inspections.selectors';
import moment from 'moment';
import { FilterCardSetting } from '@core/filter';

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
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  sampleImg = 'assets/thumb.png';
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
  customizationCount$ = this.customizationFacade.conut$.pipe(
    map((x) => {
      return x;
    })
  );
  dataAssetMaster$ = this.assetMasterFacade.assetMaster$.pipe(
    map((x) => {
      return x.map((y: any) => {
        function date() {
          let createdDate = moment.utc(y.createdAt).local().toDate();
          let nowDate = new Date();
          let newDate = nowDate.getTime() - createdDate.getTime();
          return {
            day: Math.floor(newDate / (1000 * 3600 * 24))
          };
        }
        return {
          ...y,
          id: y.id,
          asset: {
            img: this.sampleImg,
            assetName: y.assetTypeName,
            assetSubName: y.dpd,
            ownership: 'Owned'
          },
          type: y.assetTypeName,
          businessCategory: y.businessCategoryName,
          allocated: y.department.name,
          operator: y.operator.firstName + ' ' + y.operator.lastName,
          status: y.status,
          submitOn:
            date().day > 0
              ? date().day == 1
                ? `${date().day} Yesterday`
                : `${date().day} Days Ago`
              : 'Today',
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
            img: 'assets/thumb.png',
            assetName: y.assetTypeName,
            assetSubName: y.dpd,
            progress: Math.floor(Math.random() * 6) + 1
          },
          serialNumber: y.dpd,
          brand: y.makeName + ' ' + y.modelName,
          type: y.assetTypeName,
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

  dataCustomizaion$ = this.customizationFacade.customization$.pipe(
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
          type: 'Car',
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
    this.assetMasterFacade.conut$.subscribe((x) => {
      console.log(x);
    });
    this.assetMasterTableSetting = {
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
          renderer: ''
        },
        {
          lable: 'tables.column.business_category',
          field: 'businessCategory',
          width: 130,
          type: ColumnType.lable,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.department',
          field: 'allocated',
          width: '10em',
          type: ColumnType.lable,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.operator',
          field: 'operator',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: ''
        },
        {
          lable: 'tables.column.status',
          field: 'status',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: ''
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
          renderer: ''
        },
        {
          lable: 'tables.column.current_meter',
          field: 'killometer',
          width: 100,
          type: ColumnType.lable,
          thumbField: '',
          renderer: '',
          sortable: true
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
              this._router.navigate(['/fleet/assets/edit-asset/' + data.id]);
            }
          },
          // {
          //   button: 'download'
          // },
          {
            button: 'external',
            onClick: (col, data) => {
              this._router.navigate(['/fleet/assets/' + data.id]);
            }
          }
        ]
      }
    };

    this.pendingRegistrationTableSetting = this._assetsService.pedingRegistrationTableSetting();
    this.pendingCustomizationTableSetting = this._assetsService.pedingCustomizationTableSetting();

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

    this.assetMasterFacade.loadAll();
    this.registrationFacade.loadAll();
    this.customizationFacade.loadAll();
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
        console.log('here 0');
        this.table.filterByStatistics('total');
        break;
      case 1:
        console.log('here 1');
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
    switch (this.selectedTab) {
      case 'assetMasterTab':
        this.table.exportTable(this.assetMasterTableSetting, this.selectedTab);
        break;
      case 'pendingRegistrationTab':
        this.table.exportTable(
          this.pendingRegistrationTableSetting,
          this.selectedTab
        );
        break;
      case 'pendingCustomizationTab':
        this.table.exportTable(
          this.pendingCustomizationTableSetting,
          this.selectedTab
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
}
