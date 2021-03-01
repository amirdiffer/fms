import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { AssetTypeFacade } from '../../+state/asset-configuration';
import { Subscription } from 'rxjs';

@Component({
  selector: 'configuration-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTypeComponent implements OnInit, OnDestroy {
  getAssetTypeSubscription!: Subscription;

  constructor(private facade: AssetTypeFacade) {}

  ngOnInit(): void {
    this.facade.loadAll();

    this.getAssetTypeSubscription = this.facade.assetType$.subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  ngOnDestroy(): void {
    this.getAssetTypeSubscription?.unsubscribe();
  }
}
