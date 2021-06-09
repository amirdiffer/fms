import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@core/Permission/permission.guard';
import { AddRequestComponent } from './add-request/add-request.component';
import { AddTemporaryRequestComponent } from './add-temporary-request/add-temporary-request.component';
import { IserveComponent } from './iserv/iserv.component';
import { MovementComponent } from './movement.component';
import { TemporaryComponent } from './temporary/temporary.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'permanent'
  },
  {
    path: 'permanent',
    component: MovementComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: [
        'MOVEMENT_REQUEST_VIEW_LIST_OWN',
        'MOVEMENT_REQUEST_VIEW_LIST_OTHERS',
        'MOVEMENT_VIEW_LIST_OWN',
        'MOVEMENT_VIEW_LIST_OTHERS',
        'MOVEMENT_REQUEST_ADD'
      ]
    }
  },
  {
    path: 'iserve',
    component: IserveComponent
  },
  {
    path: 'temporary',
    component: TemporaryComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: [
        'MOVEMENT_REQUEST_VIEW_LIST_OWN',
        'MOVEMENT_REQUEST_VIEW_LIST_OTHERS',
        'MOVEMENT_VIEW_LIST_OWN',
        'MOVEMENT_VIEW_LIST_OTHERS',
        'MOVEMENT_REQUEST_ADD'
      ]
    }
  },
  {
    path: 'permanent/add-permanent-request',
    component: AddRequestComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['MOVEMENT_REQUEST_ADD']
    }
  },
  {
    path: 'temporary/add-temporary-request',
    component: AddTemporaryRequestComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['MOVEMENT_REQUEST_ADD']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementRoutingModule {}
