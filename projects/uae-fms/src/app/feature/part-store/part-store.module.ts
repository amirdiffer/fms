import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';
import { TableModule } from '@core/table';
import { DashboardModule } from '@feature/dashboard/dashboard.module';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PartStoreStateModule } from './+state/part-store.state.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderComponent } from './order-list/order/order.component';
import { PartListComponent } from './part-list/part-list.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { PartOverviewComponent } from './part-overview/part-overview.component';
import { PartStoreRoutingModule } from './part-store-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SuppliersAddFormComponent } from './order-list/suppliers-add-form/suppliers-add-form.component';
import { AddCategoryComponent } from './part-master/add-category/add-category.component';
import { AddItemComponent } from './part-master/add-item/add-item.component';
import { TableContentComponent } from './part-master/table-content/table-content.component';
import {CarouselModule} from 'primeng/carousel';
import { UpdateFormComponent } from './part-list/update-form/update-form.component';
import { ReceiveOrderComponent } from './order-list/receive-order/receive-order.component';
import { RequestListAddFormComponent } from './order-list/request-list-add-form/request-list-add-form.component';
import { FleetStateModule } from '@feature/fleet/+state';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FilterModule,
    TabViewModule,
    TableModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    AngularSvgIconModule,
    PartStoreRoutingModule,
    SharedModule,
    DashboardModule,
    PartStoreStateModule,
    CarouselModule,
    FleetStateModule
  ],
  declarations: [
    PartListComponent,
    OrderListComponent,
    PartMasterComponent,
    OrderComponent,
    OrderListComponent,
    PartOverviewComponent,
    SuppliersAddFormComponent,
    AddCategoryComponent,
    AddItemComponent,
    TableContentComponent,
    UpdateFormComponent,
    ReceiveOrderComponent,
    RequestListAddFormComponent
  ]
})
export class PartStoreModule {}
