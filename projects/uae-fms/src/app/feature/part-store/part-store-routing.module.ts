import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartOverviewComponent } from '@feature/part-store/part-overview/part-overview.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PartListComponent } from './part-list/part-list.component';
import { OrderComponent } from './order-list/order/order.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { SuppliersAddFormComponent } from './order-list/suppliers-add-form/suppliers-add-form.component';
import { AddCategoryComponent } from './part-master/add-category/add-category.component';
import { AddItemComponent } from './part-master/add-item/add-item.component';
import { TableContentComponent } from './part-master/table-content/table-content.component';
import { UpdateFormComponent } from './part-list/update-form/update-form.component';
import { ReceiveOrderComponent } from '@feature/part-store/order-list/receive-order/receive-order.component';
import { RequestListAddFormComponent } from '@feature/part-store/order-list/request-list-add-form/request-list-add-form.component';
const routes: Routes = [
  { path: 'part-list', component: PartListComponent },
  { path: 'part-list/:id', component: PartOverviewComponent , children:[
    { path: 'update/:id', component: UpdateFormComponent },
    { path: ':fleetType/add-order', component: OrderComponent },
  ]},
  { path: 'part-master', component: PartMasterComponent,
    children:[
      {path:'' , component:TableContentComponent},
      {path:'add-category' , component:AddCategoryComponent},
      {path:'add-item' , component:AddItemComponent},
      {path:'edit-category/:id' , component:AddCategoryComponent},
      {path:'edit-item/:id' , component:AddItemComponent},
    ]
  },
  /* Request */
  { path: 'order-list/:fleetType/add-request', component: RequestListAddFormComponent },
  { path: 'order-list/:fleetType/edit-request/:id', component: RequestListAddFormComponent },

  /* Order */
  { path: 'order-list/:fleetType/add-order', component: OrderComponent },
  { path: 'order-list/:fleetType/edit-order/:id', component: OrderComponent },

  /* supplier */
  { path: 'order-list/add-supplier', component: SuppliersAddFormComponent },
  { path: 'order-list/edit-supplier/:id', component: SuppliersAddFormComponent },

  /* Receive */
  { path: 'order-list/asset/receive-order/:id', component: ReceiveOrderComponent },
  { path: 'order-list/sub-asset/receive-order/:id', component: ReceiveOrderComponent },

  { path: 'order-list', redirectTo: 'order-list/asset' },
  { path: 'order-list/asset', component: OrderListComponent },
  { path: 'order-list/sub-asset', component: OrderListComponent },

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
