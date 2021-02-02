import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { OwnershipComponent } from './ownership/ownership.component';
import { OwnershipFormComponent } from './ownership-form/ownership-form.component';
import { TableModule } from '@core/table';
import { FleetStatusComponent } from './fleet-status/fleet-status.component';
import { TabViewModule } from '@core/tab-view';
import { FleetStatusAssetTableComponent } from './fleet-status/fleet-status-table/fleet-status-asset-table.component';
import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';
import { AssetCategoryComponent } from './asset-configuration/asset-category/asset-category.component';
import { AssetTypeComponent } from './asset-configuration/asset-type/asset-type.component';
import { FilterModule } from '@core/filter';
import { MatCardModule } from '@angular/material/card';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatRadioModule } from '@angular/material/radio';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { AssetPolicyComponent } from './asset-policy/asset-policy.component';
import { PeriodicServiceComponent } from '@feature/configuration/periodic-service/periodic-service.component';
import { AddTypeComponent } from './asset-configuration/add-type/add-type.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddAssetPolicyComponent } from './asset-policy/add-asset-policy/add-asset-policy.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    FleetStatusComponent,
    FleetStatusAssetTableComponent,
    AssetConfigurationComponent,
    AssetCategoryComponent,
    AssetTypeComponent,
    PeriodicServiceComponent,
    AssetPolicyComponent,
    BusinessCategoryComponent,
    OwnershipComponent,
    AddTypeComponent,
    OwnershipFormComponent,
    AddAssetPolicyComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    TableModule,
    TabViewModule,
    TableModule,
    TabViewModule,
    FilterModule,
    MatCardModule,
    AngularSvgIconModule,
    MatRadioModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    MatProgressBarModule,
    SharedModule
  ]
})
export class ConfigurationModule {}
