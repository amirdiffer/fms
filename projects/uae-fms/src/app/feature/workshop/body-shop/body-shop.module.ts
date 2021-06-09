import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyShopComponent } from './body-shop.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { AddTechnicianComponent } from './add-technician/add-technician.component';
import { AddJobCardComponent } from './add-job-card/add-job-card.component';
import { BodyShopRoutingModule } from './body-shop-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { FilterModule } from '@core/filter';
import { RequestTabOverviewComponent } from '../body-shop/request-tab-overview/request-tab-overview.component';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { MapModule } from '@core/map-view';
import { TechnicianOverviewComponent } from './technician-overview/technician-overview.component';
import { UserProfileModule } from '@feature/user/user.module';
import { TabViewModule } from '@core/tab-view';
import { JobCardOverviewComponent } from './job-card-overview/job-card-overview.component';
import { AssetsModule } from '@feature/fleet/assets/assets.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RequestTabOverviewComponent, 
    TechnicianOverviewComponent, 
    JobCardOverviewComponent,
    BodyShopComponent,
    AddRequestComponent,
    AddTechnicianComponent,
    AddJobCardComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    BodyShopRoutingModule,
    DashboardModule,
    SharedModule,
    TableModule,
    MapModule,
    TabViewModule,
    UserProfileModule,
    AssetsModule,
  ]
})
export class BodyShopModule {}
