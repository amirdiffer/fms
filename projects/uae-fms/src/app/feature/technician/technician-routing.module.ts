import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { AddRequestComponent } from './my-tasks/add-request/add-request.component';
import { TaskOverviewComponent } from './my-tasks/task-overview/task-overview.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'my-tasks', component: MyTasksComponent },
  { path: 'task-overview/:id', component: TaskOverviewComponent },
  { path: 'my-requests', component: MyRequestsComponent },
  { path: 'add-request', component: AddRequestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule {}
