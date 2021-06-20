import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@core/Permission/permission.guard';
import { TaskMasterFormComponent } from './task-master-form/task-master-form.component';
import { TaskMasterComponent } from './task-master.component';
const routes: Routes = [
  {
    path: '',
    component: TaskMasterComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['TASK_MASTER_ADD', 'TASK_MASTER_VIEW_LIST']
    }
  },
  {
    path: 'add-task-master',
    component: TaskMasterFormComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['TASK_MASTER_ADD']
    }
  },
  {
    path: 'edit-task-master/:id',
    component: TaskMasterFormComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['TASK_MASTER_UPDATE']
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskMasterRoutingModule {}
