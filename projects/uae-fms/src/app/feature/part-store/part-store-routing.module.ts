import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartStoreComponent } from './part-store.component';
import { OrderListComponent } from '@feature/part-store/order-list/order-list.component';
import { PartListComponent } from '@feature/part-store/part-list/part-list.component';
import { PartOverviewComponent } from '@feature/part-store/part-overview/part-overview.component';
import { PartMasterComponent } from './part-master/part-master.component';

const routes: Routes = [
  { path: '', component: PartStoreComponent },
  { path: 'part-list', component: PartListComponent },
  { path: 'part-list/:id', component: PartOverviewComponent },
  { path: 'part-master', component: PartMasterComponent },
  { path: 'order-list', component: OrderListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartStoreRoutingModule {}
