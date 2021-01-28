import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartStoreRoutingModule } from './part-store-routing.module';
import { PartStoreComponent } from './part-store.component';
import { PartListComponent } from './part-list/part-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { TabViewModule } from '@core/tab-view';
import { TableModule } from '@core/table';
import { FilterModule } from '@core/filter';

@NgModule({
  declarations: [PartStoreComponent, OrderListComponent, PartListComponent],
  imports: [
    CommonModule,
    PartStoreRoutingModule,
    TabViewModule,
    TableModule,
    FilterModule
  ]
})
export class PartStoreModule {}
