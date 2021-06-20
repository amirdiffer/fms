import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubAssetComponent } from './sub-asset.component';
import { AddSubAssetComponent } from './add-sub-asset/add-sub-asset.component';
import { SubAssetOverviewComponent } from './sub-asset-overview/sub-asset-overview.component';
import { SubAssetDetailComponent } from './sub-asset-overview/sub-asset-detail/sub-asset-detail.component';
import { FilterModule } from '@core/filter';
import { TableModule } from '@core/table';
import { SharedModule } from '@shared/shared.module';
import { ReminderModule } from './sub-asset-overview/reminder/reminder.module';
import { HistoryModule } from './sub-asset-overview/history/history.module';
import { SubAssetRoutingModule } from './sub-asset-routing.module';
import { TabViewModule } from '@core/tab-view';
import { MapModule } from '@core/map-view';
import { ChartsModule } from '@core/charts';
import { AssetPolicyStateModule } from '@feature/configuration/+state/asset-policy/asset/asset-policy-state.module';
import { SubAssetPolicyStateModule } from '@feature/configuration/+state/asset-policy/sub-asset/sub-asset-policy-state.module';
import { SubAssetTypeStateModule } from '@feature/configuration/+state/fleet-configuration/sub-asset-type/sub-asset-type-state.module';
import { SubAssetStateModule } from '../+state/sub-asset/sub-asset-state.module';

@NgModule({
  declarations: [
    SubAssetComponent,
    AddSubAssetComponent,
    SubAssetOverviewComponent,
    SubAssetDetailComponent
  ],
  imports: [
    CommonModule,
    SubAssetRoutingModule,
    FilterModule,
    TableModule,
    TabViewModule,
    SharedModule,
    ReminderModule,
    HistoryModule,
    MapModule,
    ChartsModule,
    AssetPolicyStateModule,
    SubAssetPolicyStateModule,
    SubAssetTypeStateModule,
    ChartsModule,
    SubAssetStateModule
  ]
})
export class SubAssetModule {}
