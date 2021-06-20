import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { TabViewModule } from '@core/tab-view';
import { AssetPolicyRoutingModule } from './asset-policy-routing.module';
import { AssetPolicyComponent } from './asset-policy.component';
import { AddAssetPolicyComponent } from './add-asset-policy/add-asset-policy.component';
import { AssetPolicyStateModule } from '../+state/asset-policy/asset/asset-policy-state.module';
import { SubAssetPolicyStateModule } from '../+state/asset-policy/sub-asset/sub-asset-policy-state.module';

@NgModule({
  declarations: [AssetPolicyComponent, AddAssetPolicyComponent],
  imports: [
    CommonModule,
    AssetPolicyRoutingModule,
    SharedModule,
    TableModule,
    TabViewModule,
    AssetPolicyStateModule,
    SubAssetPolicyStateModule
  ]
})
export class AssetPolicyModule {}
