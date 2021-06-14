import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@core/Permission/permission.guard';
import { OrderListComponent } from './order-list.component';
import { OrderComponent } from './order/order.component';
import { ReceiveOrderComponent } from './receive-order/receive-order.component';
import { RequestListAddFormComponent } from './request-list-add-form/request-list-add-form.component';
import { SuppliersAddFormComponent } from './suppliers-add-form/suppliers-add-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'asset'
  },
  {
    path: 'asset',
    component: OrderListComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: [
        'PARTSTORE_ORDER_LIST_REQUEST_VIEW_LIST_OWN',
        'PARTSTORE_ORDER_LIST_REQUEST_VIEW_LIST_OTHERS',
        'PARTSTORE_ORDER_LIST_ORDER_VIEW_LIST',
        'PARTSTORE_SUPPLIER_VIEW_LIST',
        'PARTSTORE_ORDER_LIST_ORDER_ADD',
        'PARTSTORE_ORDER_LIST_REQUEST_ADD',
        'PARTSTORE_SUPPLIER_ADD'
      ]
    }
  },
  {
    path: 'sub-asset',
    component: OrderListComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: [
        'PARTSTORE_ORDER_LIST_REQUEST_VIEW_LIST_OWN',
        'PARTSTORE_ORDER_LIST_REQUEST_VIEW_LIST_OTHERS',
        'PARTSTORE_ORDER_LIST_ORDER_VIEW_LIST',
        'PARTSTORE_SUPPLIER_VIEW_LIST',
        'PARTSTORE_ORDER_LIST_ORDER_ADD',
        'PARTSTORE_ORDER_LIST_REQUEST_ADD',
        'PARTSTORE_SUPPLIER_ADD'
      ]
    }
  },
  {
    path: ':fleetType/add-request',
    component: RequestListAddFormComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['PARTSTORE_ORDER_LIST_REQUEST_ADD']
    }
  },
  {
    path: ':fleetType/edit-request/:id',
    component: RequestListAddFormComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: [
        'PARTSTORE_ORDER_LIST_REQUEST_UPDATE_OWN',
        'PARTSTORE_ORDER_LIST_REQUEST_UPDATE_OTHERS'
      ]
    }
  },
  {
    path: ':fleetType/add-order',
    component: OrderComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['PARTSTORE_ORDER_LIST_ORDER_ADD']
    }
  },
  {
    path: ':fleetType/edit-order/:id',
    component: OrderComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['PARTSTORE_ORDER_LIST_ORDER_UPDATE']
    }
  },
  {
    path: 'add-supplier',
    component: SuppliersAddFormComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['PARTSTORE_SUPPLIER_ADD']
    }
  },
  {
    path: 'edit-supplier/:id',
    component: SuppliersAddFormComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['PARTSTORE_SUPPLIER_UPDATE']
    }
  },
  {
    path: 'asset/receive-order/:id',
    component: ReceiveOrderComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['PARTSTORE_ORDER_RECEIVED']
    }
  },
  {
    path: 'sub-asset/receive-order/:id',
    component: ReceiveOrderComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['PARTSTORE_ORDER_RECEIVED']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderListRoutingModule {}
