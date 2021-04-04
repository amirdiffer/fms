import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskMasterComponent } from './task-master/task-master.component';
import { TaskMasterFormComponent } from './task-master-form/task-master-form.component';
import { AuctionListComponent } from './inspections/auction-list/auction-list.component';
import { TechnicalInspectionComponent } from './inspections/technical-inspection/technical-inspection.component';

const routes: Routes = [
  {
    path: 'task-master',
    component: TaskMasterComponent
  },
  {
    path: 'inspections/auction-list',
    component: AuctionListComponent
  },
  {
    path: 'task-master/add-task-master',
    component: TaskMasterFormComponent
  },
  {
    path: 'inspections/technical-inspection',
    component: TechnicalInspectionComponent
  },
  /* {
    path: 'body-shop',
    loadChildren: () =>
      import('./body-shop/body-shop.module').then((m) => m.BodyShopModule)
  }, */
  /* {
    path: 'service-shop',
    loadChildren: () =>
      import('./service-shop/service-shop.module').then(
        (m) => m.ServiceShopModule
      )
  }, */
  {
    path: 'inspections',
    redirectTo: 'inspections/technical-inspection'
  },
  { path: '', redirectTo: 'body-shop' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule {}
