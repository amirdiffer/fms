import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartListComponent } from './part-list/part-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PartStoreComponent } from './part-store.component';
import { OrderListComponent } from '@feature/part-store/order-list/order-list.component';
import { PartListComponent } from '@feature/part-store/part-list/part-list.component';
import { PartOverviewComponent } from '@feature/part-store/part-overview/part-overview.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { PartListFormComponent } from './part-list/part-list-form.component';
import { AddPartMasterComponent } from './part-master/add-part-master/add-part-master.component';

const routes: Routes = [
  { path: 'part-list/add', component: PartListFormComponent },
  { path: 'part-list', component: PartListComponent },
  { path: 'part-list/:id', component: PartOverviewComponent },
  { path: 'part-master', component: PartMasterComponent },
  { path: 'part-master/add', component: AddPartMasterComponent },
  { path: 'order-list', component: OrderListComponent },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'part-list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartStoreRoutingModule {}
