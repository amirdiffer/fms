import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MovementConfirmComponent } from './movement/movement-confirm/movement-confirm.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { SharedModule } from 'app/shared/shared.module';

import { FilterModule } from '@core/filter/filter.module';
import { TableModule } from '@core/table/table.module';
import { TabViewModule } from '@core/tab-view';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddAssetComponent } from './assets/add-asset/add-asset.component';
import { AddAccessoryComponent } from './accessory/add-accessory/add-accessory.component';
import { AddOperatorComponent } from '@feature/fleet/operator/add-operator/add-operator.component';

import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { AddRequestComponent } from './movement/add-request/add-request.component';
import { FleetStateModule } from './+state';
import { PendingRegistrationOverviewComponent } from './assets/pending-registration-overview/pending-registration-overview.component';
import { AssetDetailComponent } from './assets/asset-detail/asset-detail.component';
import { PendingCustomizationOverviewComponent } from './assets/pending-customization-overview/pending-customization-overview.component';
import { AssetRegistrationConfirmComponent } from './assets/asset-registration-confirm/asset-registration-confirm.component';

@NgModule({
  declarations: [
    AssetsComponent,
    OperatorComponent,
    SubAssetComponent,
    MovementComponent,
    AccessoryComponent,
    AddAccessoryComponent,
    AddSubAssetComponent,
    AddOrganizationComponent,
    MovementConfirmComponent,
    OrganizationComponent,
    AddAssetComponent,
    AddOperatorComponent,
    AddRequestComponent,
    PendingRegistrationOverviewComponent,
    AssetDetailComponent,
    PendingCustomizationOverviewComponent,
    AssetRegistrationConfirmComponent
  ],
  imports: [
    AngularSvgIconModule,
    FleetRoutingModule,
    TabViewModule,
    CommonModule,
    FilterModule,
    TableModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    DashboardModule,
    MatStepperModule,
    CdkStepperModule,
    SharedModule,
    FleetStateModule
  ]
})
export class FleetModule {}
