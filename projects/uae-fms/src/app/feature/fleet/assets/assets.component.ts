import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { AssetsService } from './assets.service';
import { TableComponent } from '@core/table';
import { AssetMasterFacade } from '../+state/assets/asset-master';
import { Subscription } from 'rxjs';
import { RegistrationFacade } from '@feature/fleet/+state/assets/registration';
import { CustomizationFacade } from '@feature/fleet/+state/assets/customization';
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
  constructor(
    private _assetsService: AssetsService,
    private assetMasterFacade: AssetMasterFacade,
    private registrationFacade: RegistrationFacade,
    private customizationFacade: CustomizationFacade
  ) {}

  ngOnInit(): void {
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

    this.assetMasterTableSetting = this._assetsService.assetMastertableSetting();
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
