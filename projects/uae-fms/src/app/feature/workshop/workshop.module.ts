import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopComponent } from './workshop.component';
import { TaskMasterComponent } from './task-master/task-master.component';
import { TableModule } from '@core/table/table.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [WorkshopComponent, TaskMasterComponent],
  imports: [CommonModule, WorkshopRoutingModule, TableModule,FontAwesomeModule]
})
export class WorkshopModule {}
