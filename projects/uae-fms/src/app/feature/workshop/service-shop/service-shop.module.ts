import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceShopComponent } from './service-shop.component';
import { AddJobCardServiceShopComponent } from './add-job-card/add-job-card.component';
import { AddLocationServiceShopComponent } from './add-location/add-location.component';
import { AddRequestServiceShopComponent } from './add-request/add-request.component';
import { AddTechnicianServiceShopComponent } from './add-technician/add-technician.component';
import { ServiceShopRoutingModule } from './service-shop-routing.module';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { FilterModule } from '@core/filter';
import { UserProfileModule } from '@feature/user/user.module';
import { TabViewModule } from '@core/tab-view';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { MapModule } from '@core/map-view';
import { RequestTabOverviewServiceShopComponent } from './request-tab-overview/request-tab-overview.component';
import { TechnicianOverviewServiceShopComponent } from './technician-overview/technician-overview.component';
import { JobCardOverviewComponent } from './job-card-overview/job-card-overview.component';
import { AssetsModule } from '@feature/fleet/assets/assets.module';
import { ServiceShopJobCardStateModule } from '../+state/service-shop/job-card/service-shop-job-card-state.module';
import { ServiceShopLocationStateModule } from '../+state/service-shop/location/service-shop-location-state.module';
import { ServiceShopRequestStateModule } from '../+state/service-shop/request/service-shop-request-state.module';
import { ServiceShopTechnicianStateModule } from '../+state/service-shop/technician/service-shop-technician-state.module';
import { TaskMasterStateModule } from '../../workshop/+state/task-master/task-master-state.module';

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
    ServiceShopJobCardStateModule,
    ServiceShopLocationStateModule,
    ServiceShopRequestStateModule,
    ServiceShopTechnicianStateModule,
    TaskMasterStateModule,
  ]
})
export class ServiceShopModule {}
