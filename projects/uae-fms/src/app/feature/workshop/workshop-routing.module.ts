import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskMasterComponent } from './task-master/task-master.component';

import { WorkshopComponent } from './workshop.component';
import { BodyShopComponent } from './body-shop/body-shop.component';
import { AuctionListComponent } from './inspections/auction-list/auction-list.component';
import { TechnicalInspectionComponent } from './inspections/technical-inspection/technical-inspection.component';

const routes: Routes = [
  { path: '', redirectTo: 'body-shop' },
  { path: 'body-shop', component: BodyShopComponent },
  {
    path: 'inspections',
    redirectTo: 'inspections/technical-inspection'
  },
  {
    path: 'inspections/technical-inspection',
    component: TechnicalInspectionComponent
  },
  {
    path: 'inspections/auction-list',
    component: AuctionListComponent
  },
  {
    path: 'task-master',
    component: TaskMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule {}
