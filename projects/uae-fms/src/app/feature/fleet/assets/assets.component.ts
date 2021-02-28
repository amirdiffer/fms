import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { AssetsService } from './assets.service';
import { TableComponent } from '@core/table';
@Component({
  selector: 'anms-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsComponent implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  assetMasterTableSetting;
  pendingRegistrationTableSetting;
  pendingCustomizationTableSetting;
  filterSetting;
  selectedTab = 'Asset Master';
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  constructor(private _assetsService: AssetsService) {}

  ngOnInit(): void {
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
}
