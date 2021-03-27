import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';

import { GMapModule } from 'primeng/gmap';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProgressBarModule } from 'primeng/progressbar';

import { FleetRoutingModule } from './fleet-routing.module';

import { DashboardModule } from '../dashboard/dashboard.module';
import { OperatorComponent } from './operator/operator.component';
import { MovementComponent } from './movement/movement.component';
import { SubAssetComponent } from './sub-asset/sub-asset.component';
import { AccessoryComponent } from './accessory/accessory.component';
import { OrganizationComponent } from './organization/organization.component';
import { AddRequestComponent } from './movement/add-request/add-request.component';
import { AddSubAssetComponent } from './sub-asset/add-sub-asset/add-sub-asset.component';
import { AddAccessoryComponent } from './accessory/add-accessory/add-accessory.component';
import { MovementConfirmComponent } from './movement/movement-confirm/movement-confirm.component';
import { AddOrganizationComponent } from './organization/add-organization/add-organization.component';
import {
  AssetsComponent,
  AddAssetComponent,
  OverViewAssetComponent,
  VehicleOverviewComponent,
  BusinessCategoryComponent,
  JobCardComponent,
  RequestComponent
} from './assets';

import { SharedModule } from '@shared/shared.module';
import { FilterModule } from '@core/filter/filter.module';
import { TableModule } from '@core/table/table.module';
import { TabViewModule } from '@core/tab-view';
import { AddOperatorComponent } from '@feature/fleet/operator/add-operator/add-operator.component';
import { ChartsModule } from '@core/charts';

import { FleetStateModule } from './+state';
import { PendingRegistrationOverviewComponent } from './assets/pending-registration-overview/pending-registration-overview.component';
import { AssetCarDetailComponent } from './assets/asset-detail/asset-car-detail.component';
import { PendingCustomizationOverviewComponent } from './assets/pending-customization-overview/pending-customization-overview.component';
import { AssetRegistrationConfirmComponent } from './assets/asset-registration-confirm/asset-registration-confirm.component';
import { MapModule } from '@core/map-view';
import { OverViewOperatorComponent } from './operator/over-view-operator/over-view-operator.component';
import { IserveComponent } from './movement/iserv/iserv.component';
import { AlertDialogModule } from '@core/alert-dialog/alert-dialog.module';

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
    AssetCarDetailComponent,
    PendingCustomizationOverviewComponent,
    AssetRegistrationConfirmComponent,
    IserveComponent,
    OverViewAssetComponent,
    VehicleOverviewComponent,
    BusinessCategoryComponent,
    JobCardComponent,
    RequestComponent,
    OverViewOperatorComponent
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
    FleetStateModule,
    GMapModule,
    CardModule,
    ButtonModule,
    ProgressBarModule,
    NgApexchartsModule,
    ChartsModule,
    MapModule,
    AlertDialogModule
  ]
})
export class FleetModule {}
