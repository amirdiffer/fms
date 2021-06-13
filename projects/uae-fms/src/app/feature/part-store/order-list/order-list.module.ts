import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order-list.component';
import { SuppliersAddFormComponent } from './suppliers-add-form/suppliers-add-form.component';
import { ReceiveOrderComponent } from './receive-order/receive-order.component';
import { RequestListAddFormComponent } from './request-list-add-form/request-list-add-form.component';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';
import { TableModule } from '@core/table';
import { SharedModule } from '@shared/shared.module';
import { OrderListRoutingModule } from './order-list-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { AssetSearchThroughStateModule } from '@feature/fleet/+state/assets/search-through/search-through-state.module';



@NgModule({
  declarations: [
    OrderComponent,
    OrderListComponent,
    SuppliersAddFormComponent,
    ReceiveOrderComponent,
    RequestListAddFormComponent
  ],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    FilterModule,
    TabViewModule,
    TableModule,
    SharedModule,
    CarouselModule,
    AssetSearchThroughStateModule
  ]
})
export class OrderListModule { }
