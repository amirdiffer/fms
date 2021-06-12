import { NgModule } from '@angular/core';
import { DashboardModule } from '@feature/dashboard/dashboard.module';
import { WorkshopRoutingModule } from './workshop-routing.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    WorkshopRoutingModule,
    DashboardModule,
    
  ]
})
export class WorkshopModule {}
