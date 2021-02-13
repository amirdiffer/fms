import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AssetConfigurationService } from './asset-configuration.service';
@Component({
  selector: 'anms-asset-configuration',
  templateUrl: './asset-configuration.component.html',
  styleUrls: ['./asset-configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetConfigurationComponent implements OnInit, OnDestroy {
  searchIcon = 'assets/icons/search.svg';
  downloadBtn= 'assets/icons/download-solid.svg';
  assetConfigurationableSetting;
  addOpen;
  addOpen$: Subscription;
  constructor(private _assetConfigurationService: AssetConfigurationService) {}

  ngOnInit(): void {
    this.assetConfigurationableSetting = this._assetConfigurationService.assetConfigurationableSetting();
    this.addOpen$ = this._assetConfigurationService
      .getAddForm()
      .subscribe((open) => {
        this.addOpen = open;
      });
  }
  openAdd() {
    this._assetConfigurationService.loadAddForm(true);
  }
  ngOnDestroy() {
    this.addOpen$.unsubscribe();
  }
}
