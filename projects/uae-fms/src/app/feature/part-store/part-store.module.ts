import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartStoreRoutingModule } from './part-store-routing.module';
import { PartStoreComponent } from './part-store.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { FilterModule } from '@core/filter';
import { AssetTypeComponent } from './part-master/asset-type/asset-type.component';
import { CategoryComponent } from './part-master/category/category.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [PartStoreComponent, PartMasterComponent, AssetTypeComponent, CategoryComponent],
  imports: [CommonModule, PartStoreRoutingModule,FilterModule,MatCardModule,MatSelectModule,MatFormFieldModule]
})
export class PartStoreModule {}
