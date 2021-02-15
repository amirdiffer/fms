import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartListComponent } from './part-list/part-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { PartListFormComponent } from './part-list/part-list-form.component';
import { AddPartMasterComponent } from './part-master/add-part-master/add-part-master.component';
import { OrderFormComponent } from './order-list/order/order.component';

const routes: Routes = [
  { path: 'part-list/add', component: PartListFormComponent },
  { path: 'part-list', component: PartListComponent },
  { path: 'part-master', component: PartMasterComponent },
  { path: 'part-master/add', component: AddPartMasterComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'order-list/add-order-list', component: OrderFormComponent },
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
