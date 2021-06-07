import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskMasterComponent } from './task-master/task-master.component';
import { TaskMasterFormComponent } from './task-master-form/task-master-form.component';
import { AuctionListComponent } from './inspections/auction-list/auction-list.component';
import { TechnicalInspectionComponent } from './inspections/technical-inspection/technical-inspection.component';
import { TechnicalOverviewComponent } from '@feature/workshop/inspections/technical-inspection/technical-overview/technical-overview.component';
import { LocationModule } from './location/location.module';
import { PermissionGuard } from '@core/Permission/permission.guard';

const routes: Routes = [
  {
    path: 'task-master',
    component: TaskMasterComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "TASK_MASTER_ADD",
        "TASK_MASTER_VIEW_LIST",
      ],
    }
  },
  {
    path: 'inspections/auction-list',
    component: AuctionListComponent
  },
  {
    path: 'task-master/add-task-master',
    component: TaskMasterFormComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "TASK_MASTER_ADD",
      ],
    }
  },
  {
    path: 'task-master/edit-task-master/:id',
    component: TaskMasterFormComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "TASK_MASTER_UPDATE",
      ],
    }
  },
  {
    path: 'inspections/technical-inspection',
    component: TechnicalInspectionComponent
  },
  {
    path: 'inspections/technical-inspection-report/:id',
    component: TechnicalOverviewComponent
  },
  {
    path: 'body-shop',
    loadChildren: () =>
      import('./body-shop/body-shop.module').then((m) => m.BodyShopModule)
  },
  {
    path: 'service-shop',
    loadChildren: () =>
      import('./service-shop/service-shop.module').then(
        (m) => m.ServiceShopModule
      )
  },
  {
    path: 'location',
    loadChildren: () =>
      import('./location/location.module').then((m) => m.LocationModule)
  },
  /* {
    path: 'inspections',
    redirectTo: 'inspections/technical-inspection'
  }, */
  { path: '', redirectTo: 'body-shop' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule {}
