import { NgModule } from '@angular/core';
import { DashboardModule } from '@feature/dashboard/dashboard.module';
import { WorkshopStateModule } from './+state';
import { WorkshopRoutingModule } from './workshop-routing.module';

@NgModule({
  declarations: [],
  imports: [WorkshopRoutingModule, WorkshopStateModule, DashboardModule]
})
export class WorkshopModule {}
