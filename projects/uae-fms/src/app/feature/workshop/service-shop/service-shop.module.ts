import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceShopComponent } from './service-shop.component';
import { AddJobCardServiceShopComponent } from './add-job-card/add-job-card.component';
import { AddLocationServiceShopComponent } from './add-location/add-location.component';
import { AddRequestServiceShopComponent } from './add-request/add-request.component';
import { AddTechnicianServiceShopComponent } from './add-technician/add-technician.component';
import { ServiceShopRoutingModule } from './service-shop-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { DashboardModule } from '../../dashboard/dashboard.module';
import { FilterModule } from '@core/filter';
import { UserProfileModule } from '@feature/user/user.module';
import { TabViewModule } from '@core/tab-view';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { MapModule } from '@core/map-view';
import { RequestTabOverviewServiceShopComponent } from './request-tab-overview/request-tab-overview.component';
import { TechnicianOverviewServiceShopComponent } from './technician-overview/technician-overview.component';
import { JobCardOverviewComponent } from "./job-card-overview/job-card-overview.component";
import { AssetsModule } from '@feature/fleet/assets/assets.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AssetSearchThroughStateModule } from '@feature/fleet/+state/assets/search-through/search-through-state.module';

@NgModule({
  declarations: [
    RequestTabOverviewServiceShopComponent, 
    TechnicianOverviewServiceShopComponent, 
    JobCardOverviewComponent,
    ServiceShopComponent,
    AddJobCardServiceShopComponent,
    AddLocationServiceShopComponent,
    AddRequestServiceShopComponent,
    AddTechnicianServiceShopComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    ServiceShopRoutingModule,
    DashboardModule,
    SharedModule,
    TableModule,
    MapModule,
    TabViewModule,
    UserProfileModule,
    AssetsModule,
    AssetSearchThroughStateModule
  ]
})
export class ServiceShopModule { }
