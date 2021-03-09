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
import { IservComponent } from './movement/iserv/iserv.component';
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
import { MapModule } from '@core/map-view';

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
    IservComponent,
    OverViewAssetComponent,
    VehicleOverviewComponent,
    BusinessCategoryComponent,
    JobCardComponent,
    RequestComponent
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
    MapModule
  ]
})
export class FleetModule {}
