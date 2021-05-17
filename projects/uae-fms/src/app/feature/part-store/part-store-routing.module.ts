import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartOverviewComponent } from '@feature/part-store/part-overview/part-overview.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PartListComponent } from './part-list/part-list.component';
import { OrderFormComponent } from './order-list/order/order.component';
import { PartMasterComponent } from './part-master/part-master.component';
import { SuppliersAddFormComponent } from './order-list/suppliers-add-form/suppliers-add-form.component';
import { AddCategoryComponent } from './part-master/add-category/add-category.component';
import { AddItemComponent } from './part-master/add-item/add-item.component';
import { TableContentComponent } from './part-master/table-content/table-content.component';
import { UpdateFormComponent } from './part-list/update-form/update-form.component';
import { OrderListAssetComponent } from '@feature/part-store/order-list/order-list-asset/order-list-asset.component';
import { OrderListSubAssetComponent } from '@feature/part-store/order-list/order-list-sub-asset/order-list-sub-asset.component';
import { ReceiveOrderComponent } from '@feature/part-store/order-list/receive-order/receive-order.component';
import { RequestListAddFormComponent } from '@feature/part-store/order-list/request-list-add-form/request-list-add-form.component';
const routes: Routes = [
  { path: 'part-list', component: PartListComponent },
  { path: 'part-list/:id', component: PartOverviewComponent , children:[
    { path: 'update/:id', component: UpdateFormComponent },
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

  { path: 'order-list/add-order-list', component: OrderFormComponent },
  { path: 'order-list/edit-order-list/:id', component: OrderFormComponent },
  { path: 'order-list/add-supplier', component: SuppliersAddFormComponent },
  { path: 'order-list', redirectTo: 'order-list/asset' },
  { path: 'order-list/asset', component: OrderListComponent },
  { path: 'order-list/asset/add-request', component: RequestListAddFormComponent },
  { path: 'order-list/sub-asset', component: OrderListComponent },
  { path: 'order-list/sub-asset/add-request', component: RequestListAddFormComponent },
  { path: 'order-list/receive-order/:id', component: ReceiveOrderComponent },

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
