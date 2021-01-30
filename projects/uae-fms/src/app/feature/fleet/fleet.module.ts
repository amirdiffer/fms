import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet.component';
import { AccessoryComponent } from './accessory/accessory.component';
import { OperatorComponent } from './operator/operator.component';
import { AssetsComponent } from './assets/assets.component';
import { FilterModule } from '@core/filter/filter.module';
import { TableModule } from '@core/table/table.module';
import { TabViewModule } from '@core/tab-view';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SubAssetComponent } from './sub-asset/sub-asset.component';
import { MovementComponent } from './movement/movement.component';

@NgModule({
  declarations: [
    FleetComponent,
    OperatorComponent,
    SubAssetComponent,
    AssetsComponent,
    AccessoryComponent,
    MovementComponent
  ],
  imports: [
    CommonModule,
    FleetRoutingModule,
    FilterModule,
    TableModule,
    AngularSvgIconModule,
    TabViewModule
  ]
})
export class FleetModule { }
