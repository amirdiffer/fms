import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AssetsService } from './assets.service';
@Component({
  selector: 'anms-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsComponent implements OnInit {
  assetMasterTableSetting;
  pendingRegistrationTableSetting;
  pendingCustomizationTableSetting;
  filterSetting;
  searchIcon = 'assets/icons/search.svg';
  constructor(private _assetsService : AssetsService) { }

  ngOnInit(): void {
    this.assetMasterTableSetting = this._assetsService.assetMastertableSetting();
    this.pendingRegistrationTableSetting = this._assetsService.pedingRegistrationTableSetting();
    this.pendingCustomizationTableSetting = this._assetsService.pedingCustomizationTableSetting();

    this.filterSetting = [
      {
        filterTitle: 'Total',
        filterCount: '2456',
        filterTagColor: '#028D5D',
      },
      {
        filterTitle: 'Active',
        filterCount: '2456',
        filterTagColor: '#009EFF',
      },
      {
        filterTitle: 'Inactive',
        filterCount: '2456',
        filterTagColor: '#FCB614',
      },
      {
        filterTitle: 'XFleet',
        filterCount: '2456',
        filterTagColor: '#F75A4A',
      }
    ]
  };


}
