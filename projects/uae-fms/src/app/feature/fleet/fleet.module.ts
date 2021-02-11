import { DashboardModule } from './../dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { FleetRoutingModule } from './fleet-routing.module';

import { AssetsComponent } from './assets/assets.component';
import { OperatorComponent } from './operator/operator.component';
import { MovementComponent } from './movement/movement.component';
import { SubAssetComponent } from './sub-asset/sub-asset.component';
import { AccessoryComponent } from './accessory/accessory.component';
import { OrganizationComponent } from './organization/organization.component';
import { AddSubAssetComponent } from './sub-asset/add-sub-asset/add-sub-asset.component';
import { AddOrganizationComponent } from './organization/add-organization/add-organization.component';
import { SharedModule } from 'app/shared/shared.module';
import { MovementConfirmComponent } from './movement/movement-confirm/movement-confirm.component';

import { FilterModule } from '@core/filter/filter.module';
import { TableModule } from '@core/table/table.module';
import { TabViewModule } from '@core/tab-view';
import { AddAssetComponent } from './assets/add-asset/add-asset.component';

import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    AssetsComponent,
    OperatorComponent,
    SubAssetComponent,
    MovementComponent,
    AccessoryComponent,
    AddSubAssetComponent,
    AddOrganizationComponent,
    MovementConfirmComponent,
    OrganizationComponent,
    AddAssetComponent
  ],
  imports: [
    AngularSvgIconModule,
    FleetRoutingModule,
    TabViewModule,
    CommonModule,
    FilterModule,
    TableModule,
    DashboardModule,
    MatStepperModule,
    CdkStepperModule,
    SharedModule
  ]
})
export class FleetModule {}
