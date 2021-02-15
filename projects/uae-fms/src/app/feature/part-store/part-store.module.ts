import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartStoreRoutingModule } from './part-store-routing.module';
import { PartStoreComponent } from './part-store.component';
import { PartListComponent } from './part-list/part-list.component';
import { PartOverviewComponent } from './part-overview/part-overview.component';
import { OrderListComponent } from './order-list/order-list.component';
import { TabViewModule } from '@core/tab-view';
import { TableModule } from '@core/table';
import { PartMasterComponent } from './part-master/part-master.component';
import { AssetTypeComponent } from './part-master/asset-type/asset-type.component';
import { CategoryComponent } from './part-master/category/category.component';
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
import { CategoryComponent } from './category/category.component';
import { AssetTypeComponent } from './asset-type/asset-type.component';
import { PartListFormComponent } from './part-list/part-list-form.component';
import { AddPartMasterComponent } from './part-master/add-part-master/add-part-master.component';
import { PartStoreStateModule } from './+state/part-store.state.module';
import { DashboardModule } from '@feature/dashboard/dashboard.module';

@NgModule({
  declarations: [
    PartListComponent,
    PartListFormComponent,
    CategoryComponent,
    AssetTypeComponent,
    OrderListComponent,
    PartMasterComponent,
    AddPartMasterComponent
    OrderListComponent,
    PartOverviewComponent
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
    PartStoreRoutingModule,
    SharedModule,
    DashboardModule,
    PartStoreStateModule
  ]
})
export class PartStoreModule {}
