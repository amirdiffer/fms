import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AssetConfigurationService } from './asset-configuration.service';
import { AssetConfigurationFacade } from '../+state/asset-configuration';
@Component({
  selector: 'anms-asset-configuration',
  templateUrl: './asset-configuration.component.html',
  styleUrls: ['./asset-configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetConfigurationComponent implements OnInit, OnDestroy {
  searchIcon = 'assets/icons/search.svg';
  assetConfigurationableSetting;
  addOpen;
  addOpen$: Subscription;
  constructor(
    private facade: AssetConfigurationFacade,
    private _assetConfigurationService: AssetConfigurationService
  ) {}

  ngOnInit(): void {
    this.facade.loadAll();
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
