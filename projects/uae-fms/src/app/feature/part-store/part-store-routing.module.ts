import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartOverviewComponent } from '@feature/part-store/part-overview/part-overview.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PartListFormComponent } from './part-list/part-list-form.component';
import { PartListComponent } from './part-list/part-list.component';
import { AddPartMasterComponent } from './part-master/add-part-master/add-part-master.component';
import { OrderFormComponent } from './order-list/order/order.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { PartDetailListComponent } from './part-list/part-detail-list/part-detail-list.component';
import { SuppliersAddFormComponent } from './order-list/suppliers-add-form/suppliers-add-form.component';

const routes: Routes = [
  { path: 'part-list/add', component: PartListFormComponent },
  { path: 'part-list/edit-part', component: PartListFormComponent },
  { path: 'part-list/category', component: PartDetailListComponent },
  { path: 'part-list/overview', component: PartOverviewComponent },
  { path: 'part-list', component: PartListComponent },
  { path: 'part-master/add', component: AddPartMasterComponent },
  { path: 'part-master', component: PartMasterComponent },
  { path: 'order-list/add-order-list', component: OrderFormComponent },
  { path: 'order-list/add-supplier', component: SuppliersAddFormComponent },
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
