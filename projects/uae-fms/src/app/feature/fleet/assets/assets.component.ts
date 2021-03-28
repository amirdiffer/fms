import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { AssetsService } from './assets.service';
import { ColumnType, TableComponent } from '@core/table';
import { AssetMasterFacade } from '../+state/assets/asset-master';
import { Subscription } from 'rxjs';
import { RegistrationFacade } from '@feature/fleet/+state/assets/registration';
import { CustomizationFacade } from '@feature/fleet/+state/assets/customization';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { yearsPerPage } from '@angular/material/datepicker';

@Component({
  selector: 'anms-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsComponent implements OnInit, OnDestroy {
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
  dataAssetMaster$ = this.assetMasterFacade.assetMaster$.pipe(
    map(x => {
      return x.map(y => {
        return { ...y, 
          id: y.id,
          asset: {
            img: 'thumb1.png',
            assetName: y.assetTypeName,
            assetSubName: y.dpd,
            ownership: 'Owned'
          },
          type: y.assetTypeName,
          businessCategory: 'VIP',
          allocated: 'Finance',
          operator: y.operator.firstName + ' ' + y.operator.lastName,
          status: y.status,
          submitOn: '2 day ago',
          brand: 'bmw.png',
          killometer: 25000,
          statusColor: '#009EFF'
        };
      });
    })
  );
  dataRegistration$ = this.registrationFacade.registration$.pipe(
    map(x => {
      return x.map(y => {
        return { ...y, 
          id: y.id,
          asset: {
            img: 'thumb1.png',
            assetName: y.assetTypeName,
            assetSubName: y.dpd,
            progress: Math.floor(Math.random() * 6) + 1
          },
          serialNumber: '123s125583456',
          brand: 'bmw.png',
          type: 'Car',
          allocated: 'Finance',
          businessCategory: 'VIP',
          createDate: '00/00/00',
          registrantionDate: '00/00/00',
          creator: 'Sam Smith'
        };
      });
    })
  );
  constructor(
    private _assetsService: AssetsService,
    private assetMasterFacade: AssetMasterFacade,
    private registrationFacade: RegistrationFacade,
    private customizationFacade: CustomizationFacade,
    private _router: Router
  ) {}

  ngOnInit(): void {

    this.assetMasterTableSetting = {
      columns: [
        {
          lable: 'tables.column.asset',
          field: 'asset',
          width: '18em',
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
          width: 100,
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
          field: '',
          width: 100,
          type: 3,
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
            button: 'edit'
          },
          {
            button: 'download'
          },
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
        filterCount: '2456',
        filterTagColor: '#028D5D'
      },
      {
        filterTitle: 'statistic.active',
        filterCount: '2456',
        filterTagColor: '#009EFF'
      },
      {
        filterTitle: 'statistic.inactive',
        filterCount: '2456',
        filterTagColor: '#FCB614'
      },
      {
        filterTitle: 'statistic.xfleet',
        filterCount: '2456',
        filterTagColor: '#F75A4A'
      }
    ];
    
    this.assetMasterFacade.loadAll();
    this.registrationFacade.loadAll();
    this.customizationFacade.loadAll();
    this.assetMasterFacade.loadStatistics();

    this.assetMasterSubscription = this.assetMasterFacade.assetMaster$.subscribe(
      (response) => {
        console.log(response);
      }
    );

    this.registrationSubscription = this.registrationFacade.registration$.subscribe(
      (response) => {
        console.log(response);
      }
    );

    this.customizationSubscription = this.customizationFacade.customization$.subscribe(
      (response) => {
        console.log(response);
      }
    );

    this.statisticsSubscription = this.assetMasterFacade.statistics$.subscribe(
      (response) => {
        console.log(response);
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

  exportTable() {
    console.log(this.selectedTab);
    switch (this.selectedTab) {
      case 'Asset Master':
        this.table.exportTable(this.assetMasterTableSetting, this.selectedTab);
        break;
      case 'Pending Registration':
        this.table.exportTable(
          this.pendingRegistrationTableSetting,
          this.selectedTab
        );
        break;
      case 'Pending Customization':
        this.table.exportTable(
          this.pendingCustomizationTableSetting,
          this.selectedTab
        );
        break;
    }
  }

  ngOnDestroy(): void {
    this.assetMasterSubscription?.unsubscribe();
    this.registrationSubscription?.unsubscribe();
    this.customizationSubscription?.unsubscribe();
    this.statisticsSubscription?.unsubscribe();
  }
}
