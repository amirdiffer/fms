import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartStoreComponent } from './part-store.component';
import { OrderListComponent } from '@feature/part-store/order-list/order-list.component';
import { PartListComponent } from '@feature/part-store/part-list/part-list.component';

const routes: Routes = [
  { path: '', component: PartStoreComponent },
  { path: 'order-list', component: OrderListComponent },
  { path: 'part-list', component: PartListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartStoreRoutingModule {}
