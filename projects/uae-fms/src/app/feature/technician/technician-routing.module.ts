import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTasksComponent } from "./my-tasks/my-tasks.component";
import { MyRequestsComponent } from "./my-requests/my-requests.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'my-tasks', component: MyTasksComponent },
  { path: 'my-requests', component: MyRequestsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule { }
