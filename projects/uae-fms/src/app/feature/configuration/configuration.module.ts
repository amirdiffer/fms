import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatCardModule } from '@angular/material/card';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TableModule } from '@core/table';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';
import { SharedModule } from '../../shared/shared.module';

import { OwnershipComponent } from './ownership/ownership.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { AssetPolicyComponent } from './asset-policy/asset-policy.component';
import { FleetStatusComponent } from './fleet-status/fleet-status.component';
import { OwnershipFormComponent } from './ownership-form/ownership-form.component';
import { AddTypeComponent } from './asset-configuration/add-type/add-type.component';
import { AssetTypeComponent } from './asset-configuration/asset-type/asset-type.component';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { AddCategoryComponent } from './business-category/add-category/add-category.component';
import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';
import { AddAssetPolicyComponent } from './asset-policy/add-asset-policy/add-asset-policy.component';
import { ConfigurationStateModule } from './+state';
import { AssetCategoryComponent } from './asset-configuration/asset-category/asset-category.component';
import { PeriodicServiceComponent } from '@feature/configuration/periodic-service/periodic-service.component';
import { AddFleetStatusComponent } from './fleet-status/add-fleet-status/add-fleet-status.component';
import { AddPeriodicServiceComponent } from './periodic-service/add-periodic-service/add-periodic-service.component';
import { AlertDialogModule } from '@core/alert-dialog/alert-dialog.module';

@NgModule({
  declarations: [
    AddTypeComponent,
    AssetTypeComponent,
    FleetStatusComponent,
    AssetCategoryComponent,
    AssetConfigurationComponent,
    AddPeriodicServiceComponent,
    BusinessCategoryComponent,
    PeriodicServiceComponent,
    AssetPolicyComponent,
    AddFleetStatusComponent,
    OwnershipComponent,
    AddCategoryComponent,
    OwnershipFormComponent,
    AddAssetPolicyComponent
  ],
  imports: [
    TabViewModule,
    TabViewModule,
    SharedModule,
    CommonModule,
    TableModule,
    TableModule,
    FormsModule,
    FilterModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    NgxFileDropModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    MatProgressBarModule,
    SharedModule,
    ConfigurationStateModule,
    ConfigurationRoutingModule,
    AlertDialogModule
  ]
})
export class ConfigurationModule {}
