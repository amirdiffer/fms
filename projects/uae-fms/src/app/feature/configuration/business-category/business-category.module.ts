import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { BusinessCategoryComponent } from './business-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { FilterModule } from '@core/filter';
import { BusinessCategoryRoutingModule } from './business-category-routing.module';
import { BusinessCategoryStateModule } from '../+state/business-category/business-category-state.module';
import { AccessoryTypeStateModule } from '../+state/fleet-configuration/accessory-type/accessory-type-state.module';
import { AssetTypeStateModule } from '@feature/configuration/+state/fleet-configuration/asset-type/asset-type-state.module';
import { SubAssetTypeStateModule } from '@feature/configuration/+state/fleet-configuration/sub-asset-type/sub-asset-type-state.module';

@NgModule({
  declarations: [BusinessCategoryComponent, AddCategoryComponent],
  imports: [
    CommonModule,
    BusinessCategoryRoutingModule,
    SharedModule,
    TableModule,
    FilterModule,
    BusinessCategoryStateModule,
    AccessoryTypeStateModule,
    AssetTypeStateModule,
    SubAssetTypeStateModule
  ]
})
export class BusinessCategoryModule {}
