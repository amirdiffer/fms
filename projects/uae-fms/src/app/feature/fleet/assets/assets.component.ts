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
@Component({
  selector: 'anms-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsComponent implements OnInit, OnDestroy {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  statisticsSubscription!: Subscription;

  assetMasterTableSetting;
  pendingRegistrationTableSetting;
  pendingCustomizationTableSetting;
  filterSetting;
  selectedTab = 'root';
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  constructor(
    private _assetsService: AssetsService,
    private facade: AssetMasterFacade
  ) {}

  ngOnInit(): void {
    this.facade.loadStatistics();

    this.statisticsSubscription = this.facade.statistics$.subscribe(
      (response) => {
        console.log(response);
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
    this.table.exportTable();
  }

  ngOnDestroy(): void {
    this.statisticsSubscription?.unsubscribe();
  }
}
