import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartStoreRoutingModule } from './part-store-routing.module';
import { PartStoreComponent } from './part-store.component';
import { PartListComponent } from './part-list/part-list.component';
import { FilterModule } from '@core/filter';
import { TableModule } from '@core/table';
import { PartMasterComponent } from './part-master/part-master.component';
import { AssetTypeComponent } from './part-master/asset-type/asset-type.component'
import { CategoryComponent } from './part-master/category/category.component'
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularSvgIconModule } from 'angular-svg-icon';
@NgModule({
  declarations: [
    PartStoreComponent, 
    PartListComponent,
    PartMasterComponent, 
    AssetTypeComponent, 
    CategoryComponent
  ],
  imports: [
    CommonModule, 
    PartStoreRoutingModule, 
    FilterModule, 
    TableModule , 
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    AngularSvgIconModule,
  ]
})
export class PartStoreModule { }
