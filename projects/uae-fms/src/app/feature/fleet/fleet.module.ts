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
import { OrganizationComponent } from './organization/organization.component';
import { MovementComponent } from './movement/movement.component';
import { CheckAccessDirective } from '@core/directive/check-access.directive';
import { AddSubAssetComponent } from '@feature/fleet/sub-asset/add-sub-asset/add-sub-asset.component';
import { AddOrganizationComponent } from './organization/add-organization/add-organization.component';

@NgModule({
  declarations: [
    FleetComponent,
    OperatorComponent,
    OrganizationComponent,
    SubAssetComponent,
    AssetsComponent,
    AccessoryComponent,
    MovementComponent,
    CheckAccessDirective,
    AddSubAssetComponent,
    AddOrganizationComponent
  ],
  imports: [
    CommonModule,
    FleetRoutingModule,
    FilterModule,
    TableModule,
    AngularSvgIconModule,
    TabViewModule,
    TabViewModule
  ]
})
export class FleetModule {}
