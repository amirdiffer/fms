import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TechnicianRoutingModule } from "./technician-routing.module";
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { ReminderComponent } from './reminder/reminder.component';
import { FilterModule } from "@core/filter";
import { TableModule } from "@core/table";
import { TabViewModule } from "@core/tab-view";


@NgModule({
  declarations: [DashboardComponent, MyTasksComponent, MyRequestsComponent, ReminderComponent],
  imports: [
    CommonModule,
    TechnicianRoutingModule,
    FilterModule,
    TableModule,
    TabViewModule
  ]
})
export class TechnicianModule { }
