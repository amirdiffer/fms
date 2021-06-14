import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@core/Permission/permission.guard';
import { AddOperatorComponent } from './add-operator/add-operator.component';
import { OperatorComponent } from './operator.component';
import { OverViewOperatorComponent } from './over-view-operator/over-view-operator.component';

const routes: Routes = [
  {
    path: '',
    component: OperatorComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['USER_OPERATOR_ADD', 'USER_OPERATOR_VIEW_LIST']
    }
  },
  {
    path: 'add-operator',
    component: AddOperatorComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['USER_OPERATOR_ADD']
    }
  },
  {
    path: 'edit-operator/:id',
    component: AddOperatorComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['USER_OPERATOR_UPDATE']
    }
  },
  {
    path: ':id',
    component: OverViewOperatorComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: [
        'USER_OPERATOR_VIEW_DETAILS_GENERAL',
        'USER_OPERATOR_VIEW_DETAILS_TRAFFIC_FINE',
        'USER_OPERATOR_VIEW_DETAILS_MOVEMENT_HISTORY'
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorRoutingModule {}
