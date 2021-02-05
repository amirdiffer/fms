import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { TabViewModule } from '@core/tab-view';
import { FilterModule } from '@core/filter';
import { TableModule } from '@core/table';

import { PartListComponent } from './part-list/part-list.component';
import { PartStoreRoutingModule } from './part-store-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { CategoryComponent } from './part-master/category/category.component';
import { AssetTypeComponent } from './part-master/asset-type/asset-type.component';

@NgModule({
  declarations: [
    PartListComponent,
    CategoryComponent,
    AssetTypeComponent,
    OrderListComponent,
    PartMasterComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    TabViewModule,
    TableModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    AngularSvgIconModule,
    PartStoreRoutingModule
  ]
})
export class PartStoreModule {}
