import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartStoreComponent } from './part-store.component';
import { OrderListComponent } from '@feature/part-store/order-list/order-list.component';
import { PartListComponent } from '@feature/part-store/part-list/part-list.component';
import { PartMasterComponent } from './part-master/part-master.component';

const routes: Routes = [
  { path: '', component: PartStoreComponent },
  { path: 'part-list', component: PartListComponent },
  { path: 'part-master', component: PartMasterComponent },
  { path: 'part-list', component: PartListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartStoreRoutingModule {}
