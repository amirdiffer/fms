import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TechnicianRoutingModule } from './technician-routing.module';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { ReminderComponent } from './reminder/reminder.component';
import { FilterModule } from '@core/filter';
import { TableModule } from '@core/table';
import { TabViewModule } from '@core/tab-view';
import { AddRequestComponent } from './dashboard/add-request/add-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskOverviewComponent } from './my-tasks/task-overview/task-overview.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    MyTasksComponent,
    MyRequestsComponent,
    ReminderComponent,
    AddRequestComponent,
    TaskOverviewComponent
  ],
  imports: [
    CommonModule,
    TechnicianRoutingModule,
    FilterModule,
    TableModule,
    TabViewModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TechnicianModule {}
