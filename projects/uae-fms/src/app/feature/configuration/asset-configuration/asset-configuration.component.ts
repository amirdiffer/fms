import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AssetConfigurationService } from './asset-configuration.service';
import { AssetConfigurationFacade } from '../+state/asset-configuration';
import { FilterCardSetting } from '@core/filter';
@Component({
  selector: 'anms-asset-configuration',
  templateUrl: './asset-configuration.component.html',
  styleUrls: ['./asset-configuration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetConfigurationComponent implements OnInit, OnDestroy {
  searchIcon = 'assets/icons/search-solid.svg';
  downloadBtn = 'assets/icons/download-solid.svg';

  filterCard: FilterCardSetting[] = [
    {
      filterTitle: 'statistic.total',
      filterCount: '356',
      filterTagColor: '#6EBFB5',
      filterSupTitle: 'statistic.part',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.available',
      filterCount: '124',
      filterTagColor: '#6870B4',
      filterSupTitle: 'statistic.part',
      onActive(index: number) {}
    },
    {
      filterTitle: 'statistic.unavailable',
      filterCount: '12',
      filterTagColor: '#BA7967',
      filterSupTitle: 'statistic.part',
      onActive(index: number) {}
    }
  ];

  assetConfigurationableSetting;
  addOpen;
  addOpen$: Subscription;

  assetConfiguration$ = this.facade.assetConfiguration$;
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

    this.assetConfiguration$.subscribe((x) => {
      console.log(x);
    });
  }
  openAdd() {
    this._assetConfigurationService.loadAddForm(true);
  }
  ngOnDestroy() {
    this.addOpen$.unsubscribe();
  }
}
