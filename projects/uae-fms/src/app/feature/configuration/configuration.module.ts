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
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    ConfigurationComponent, 
    AssetConfigurationComponent, 
    AssetCategoryComponent, 
    AssetTypeComponent],
  imports: [
    CommonModule, 
    ConfigurationRoutingModule,
    FilterModule,
    MatCardModule,
    AngularSvgIconModule,
    TableModule,
    MatRadioModule
  ]
})
export class ConfigurationModule {}
