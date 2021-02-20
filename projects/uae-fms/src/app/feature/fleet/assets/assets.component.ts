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
  selectedTab = 'root';
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  constructor(private _assetsService: AssetsService) {}

  ngOnInit(): void {
    this.assetMasterTableSetting = this._assetsService.assetMastertableSetting();
    this.pendingRegistrationTableSetting = this._assetsService.pedingRegistrationTableSetting();
    this.pendingCustomizationTableSetting = this._assetsService.pedingCustomizationTableSetting();

    this.filterSetting = [
      {
        filterTitle: 'Total',
        filterCount: '2456',
        filterTagColor: '#028D5D'
      },
      {
        filterTitle: 'Active',
        filterCount: '2456',
        filterTagColor: '#009EFF'
      },
      {
        filterTitle: 'Inactive',
        filterCount: '2456',
        filterTagColor: '#FCB614'
      },
      {
        filterTitle: 'XFleet',
        filterCount: '2456',
        filterTagColor: '#F75A4A'
      }
    ];
  }

  exportTable() {
    this.table.exportTable();
  }
}
