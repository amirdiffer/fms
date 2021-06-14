import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /* '''''Order List Routing''''' */
  {
    path: 'order-list',
    loadChildren: () =>
      import('./order-list/order-list.module').then((m) => m.OrderListModule)
  },

  /* '''''Part List Routing''''' */
  {
    path: 'part-list',
    loadChildren: () =>
      import('./part-list/part-list.module').then((m) => m.PartListModule)
  },

  /* '''''Part List Routing''''' */
  {
    path: 'part-master',
    loadChildren: () =>
      import('./part-master/part-master.module').then((m) => m.PartMasterModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartStoreRoutingModule {}
