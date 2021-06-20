import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartMasterRoutingModule } from './part-master-routing.module';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';
import { TableModule } from '@core/table';
import { SharedModule } from '@shared/shared.module';
import { PartMasterComponent } from './part-master.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddItemComponent } from './add-item/add-item.component';
import { TableContentComponent } from './table-content/table-content.component';
import { AssetTypeStateModule } from '@feature/configuration/+state/fleet-configuration/asset-type/asset-type-state.module';
import { SubAssetTypeStateModule } from '@feature/configuration/+state/fleet-configuration/sub-asset-type/sub-asset-type-state.module';
import { PartMasterStateModule } from '../+state/part-master/part-master-state.module';
import { SupplierStateModule } from '../+state/order-list/suppliers/suppliers-state.module';

@NgModule({
  declarations: [
    PartMasterComponent,
    AddCategoryComponent,
    AddItemComponent,
    TableContentComponent
  ],
  imports: [
    CommonModule,
    PartMasterRoutingModule,
    FilterModule,
    TabViewModule,
    TableModule,
    SharedModule,
    AssetTypeStateModule,
    SubAssetTypeStateModule,
    PartMasterStateModule,
    SupplierStateModule
  ]
})
export class PartMasterModule {}
