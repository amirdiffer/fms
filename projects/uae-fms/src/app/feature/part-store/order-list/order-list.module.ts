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
import { AssetTypeStateModule } from '@feature/configuration/+state/fleet-configuration/asset-type/asset-type-state.module';
import { SubAssetTypeStateModule } from '@feature/configuration/+state/fleet-configuration/sub-asset-type/sub-asset-type-state.module';
import { BodyShopTechnicianStateModule } from '@feature/workshop/+state/body-shop/technician/body-shop-technician-state.module';
import { SubAssetStateModule } from '@feature/fleet/+state/sub-asset/sub-asset-state.module';
import { OrderListStateModule } from '../+state/order-list/order/order-state.module';
import { MyOrderAssetStateModule } from '../+state/order-list/my-order/asset/my-order-asset-state.module';
import { MyOrderSubAssetStateModule } from '../+state/order-list/my-order/sub-asset/my-order-sub-asset-state.module';
import { RequestListStateModule } from '../+state/order-list/request/request-list-state.module';
import { SupplierStateModule } from '../+state/order-list/suppliers/suppliers-state.module';
import { PartMasterStateModule } from '../+state/part-master/part-master-state.module';

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
    AssetSearchThroughStateModule,
    AssetTypeStateModule,
    SubAssetTypeStateModule,
    CarouselModule,
    BodyShopTechnicianStateModule,
    SubAssetStateModule,
    MyOrderAssetStateModule,
    MyOrderSubAssetStateModule,
    OrderListStateModule,
    RequestListStateModule,
    SupplierStateModule,
    PartMasterStateModule
  ]
})
export class OrderListModule {}
