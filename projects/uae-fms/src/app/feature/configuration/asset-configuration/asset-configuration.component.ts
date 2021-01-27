import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AssetConfigurationService } from './asset-configuration.service'
@Component({
  selector: 'anms-asset-configuration',
  templateUrl: './asset-configuration.component.html',
  styleUrls: ['./asset-configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetConfigurationComponent implements OnInit {
  searchIcon= 'assets/icons/search.svg';
  assetConfigurationableSetting;
  constructor(private _assetConfigurationService: AssetConfigurationService) { }

  ngOnInit(): void {
    this.assetConfigurationableSetting = this._assetConfigurationService.assetConfigurationableSetting()
  }

}
