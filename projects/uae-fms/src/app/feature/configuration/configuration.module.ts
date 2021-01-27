import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';
import { AssetCategoryComponent } from './asset-configuration/asset-category/asset-category.component';
import { AssetTypeComponent } from './asset-configuration/asset-type/asset-type.component';
import { FilterModule } from '@core/filter';
import { MatCardModule } from '@angular/material/card';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableModule } from '@core/table';
import { MatRadioModule } from '@angular/material/radio';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { AssetPolicyComponent } from './asset-policy/asset-policy.component';
import { TabViewModule } from '@core/tab-view';
import { PeriodicServiceComponent } from '@feature/configuration/periodic-service/periodic-service.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    AssetConfigurationComponent,
    AssetCategoryComponent,
    AssetTypeComponent,
    PeriodicServiceComponent,
    AssetPolicyComponent,
    BusinessCategoryComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    TableModule,
    TabViewModule,
    FilterModule,
    MatCardModule,
    AngularSvgIconModule,
    MatRadioModule
  ]
})
export class ConfigurationModule { }
