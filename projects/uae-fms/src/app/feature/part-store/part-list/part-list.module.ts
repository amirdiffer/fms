import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartListComponent } from './part-list.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';
import { TableModule } from '@core/table';
import { SharedModule } from '@shared/shared.module';
import { PartListRoutingModule } from './part-list-routing.module';
import { AssetTypeStateModule } from '@feature/configuration/+state/fleet-configuration/asset-type/asset-type-state.module';
import { SubAssetTypeStateModule } from '@feature/configuration/+state/fleet-configuration/sub-asset-type/sub-asset-type-state.module';



@NgModule({
  declarations: [
    PartListComponent,
    UpdateFormComponent,
  ],
  imports: [
    CommonModule,
    PartListRoutingModule,
    FilterModule,
    TabViewModule,
    TableModule,
    SharedModule,
    AssetTypeStateModule,
    SubAssetTypeStateModule
  ]
})
export class PartListModule { }
