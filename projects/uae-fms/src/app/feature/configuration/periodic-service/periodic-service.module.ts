import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPeriodicServiceComponent } from './add-periodic-service/add-periodic-service.component';
import { PeriodicServiceComponent } from './periodic-service.component';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { PeriodicServiceRoutingModule } from './periodic-service-routing.module';



@NgModule({
  declarations: [
    AddPeriodicServiceComponent,
    PeriodicServiceComponent,
  ],
  imports: [
    CommonModule,
    PeriodicServiceRoutingModule,
    SharedModule,
    TableModule,
  ]
})
export class PeriodicServiceModule { }
