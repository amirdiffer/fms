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
import { PartReceiveFormComponent } from './part-receive-form/part-receive-form.component';
const routes: Routes = [
  { path: 'part-list', component: PartListComponent },
  { path: 'part-list/overview/:id', component: PartOverviewComponent },
  { path: 'part-list/update-part/:id', component: PartReceiveFormComponent },
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
