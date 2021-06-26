import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterModule } from '@core/filter';
import { TableModule } from '@core/table';
import { SharedModule } from '@shared/shared.module';
import { TaskMasterStateModule } from '../+state/task-master/task-master-state.module';
import { TaskMasterFormComponent } from './task-master-form/task-master-form.component';
import { TaskMasterRoutingModule } from './task-master-routing.module';
import { TaskMasterComponent } from './task-master.component';

@NgModule({
  declarations: [TaskMasterComponent, TaskMasterFormComponent],
  imports: [
    CommonModule,
    TaskMasterRoutingModule,
    TableModule,
    FilterModule,
    SharedModule,
    TaskMasterStateModule
  ]
})
export class TaskMasterModule {}
