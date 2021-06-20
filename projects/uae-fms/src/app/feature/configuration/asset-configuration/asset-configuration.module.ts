import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTypeComponent } from './add-type/add-type.component';
import { AssetTypeComponent } from './asset-type/asset-type.component';
import { AssetConfigurationComponent } from './asset-configuration.component';
import { AssetCategoryComponent } from './asset-category/asset-category.component';
import { AddMakeComponent } from './add-make/add-make.component';
import { AddModelComponent } from './add-model/add-model.component';
import { AddTrimComponent } from './add-trim/add-trim.component';
import { SharedModule } from '@shared/shared.module';
import { AssetConfigurationRoutingModule } from './asset-configuration-routing.module';
import { TableModule } from '@core/table';
import { ColorPickerModule } from 'ngx-color-picker';
import { AssetTypeStateModule } from '../+state/fleet-configuration/asset-type/asset-type-state.module';
import { SubAssetTypeStateModule } from '@feature/configuration/+state/fleet-configuration/sub-asset-type/sub-asset-type-state.module';
import { AccessoryTypeStateModule } from '../+state/fleet-configuration/accessory-type/accessory-type-state.module';

@NgModule({
  declarations: [
    AddTypeComponent,
    AssetTypeComponent,
    AssetConfigurationComponent,
    AssetCategoryComponent,
    AddMakeComponent,
    AddModelComponent,
    AddTrimComponent
  ],
  imports: [
    CommonModule,
    AssetConfigurationRoutingModule,
    SharedModule,
    TableModule,
    ColorPickerModule,
    AssetTypeStateModule,
    AccessoryTypeStateModule,
    SubAssetTypeStateModule
  ]
})
export class AssetConfigurationModule {}
