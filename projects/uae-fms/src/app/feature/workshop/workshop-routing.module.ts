import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskMasterComponent } from './task-master/task-master.component';

import { WorkshopComponent } from './workshop.component';

const routes: Routes = [
  { path: '', component: WorkshopComponent },
  { path: 'task-master', component: TaskMasterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule {}
