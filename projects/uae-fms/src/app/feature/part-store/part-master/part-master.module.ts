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
import { PartMasterStateModule } from '../+state/part-master/part-master-state.module';
import { SupplierStateModule } from '../+state/order-list/suppliers/suppliers-state.module';



@NgModule({
  declarations: [
    PartMasterComponent,
    AddCategoryComponent,
    AddItemComponent,
    TableContentComponent,
  ],
  imports: [
    CommonModule,
    PartMasterRoutingModule,
    FilterModule,
    TabViewModule,
    TableModule,
    SharedModule,
    PartMasterStateModule,
    SupplierStateModule
  ]
})
export class PartMasterModule { }
