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
import { PermissionGuard } from '@core/Permission/permission.guard';
const routes: Routes = [
  { 
    path: 'part-list', component: PartListComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PARTSTORE_PART_VIEW_LIST",
      ],
    }  
  },
  {
    path: 'part-list/:id',
    component: PartOverviewComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PARTSTORE_PART_VIEW_DETAILS",
      ],
    },
    children: [
      { 
        path: 'update/:id', component: UpdateFormComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "PARTSTORE_PART_UPDATE",
          ],
        },
      },
      { 
        path: ':fleetType/add-order', component: OrderComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "PARTSTORE_ORDER_LIST_ORDER_ADD",
          ],
        }, 
      }
    ]
  },
  {
    path: 'part-master',
    component: PartMasterComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PARTSTORE_PART_MASTER_CATEGORY_VIEW_LIST",
        "PARTSTORE_PART_MASTER_ITEM_VIEW_LIST",
      ],
    }, 
    children: [
      { 
          path: '', component: TableContentComponent,
          canActivate:[PermissionGuard],
          data:{
            permission:[
              "PARTSTORE_PART_MASTER_CATEGORY_VIEW_LIST",
              "PARTSTORE_PART_MASTER_ITEM_VIEW_LIST",
            ],
          }, 
      },
      { 
          path: 'add-category', component: AddCategoryComponent,
          canActivate:[PermissionGuard],
          data:{
            permission:[
              "PARTSTORE_PART_MASTER_CATEGORY_ADD",
            ],
          }, 
      },
      { 
          path: 'add-item', component: AddItemComponent,
          canActivate:[PermissionGuard],
          data:{
            permission:[
              "PARTSTORE_PART_MASTER_ITEM_ADD",
            ],
          }, 
      },
      { 
          path: 'edit-category/:id', component: AddCategoryComponent,
          canActivate:[PermissionGuard],
          data:{
            permission:[
              "PARTSTORE_PART_MASTER_CATEGORY_UPDATE",
            ],
          }, 
      },
      { 
          path: 'edit-item/:id', component: AddItemComponent,
          canActivate:[PermissionGuard],
          data:{
            permission:[
              "PARTSTORE_PART_MASTER_ITEM_UPDATE",
            ],
          }, 
      }
    ]
  },
  /* Request */
  {
    path: 'order-list/:fleetType/add-request',
    component: RequestListAddFormComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PARTSTORE_ORDER_LIST_REQUEST_ADD",
      ],
    },
  },
  {
    path: 'order-list/:fleetType/edit-request/:id',
    component: RequestListAddFormComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PARTSTORE_ORDER_LIST_REQUEST_UPDATE_OWN",
        "PARTSTORE_ORDER_LIST_REQUEST_UPDATE_OTHERS",
      ],
    },
  },

  /* Order */
  { 
    path: 'order-list/:fleetType/add-order', component: OrderComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PARTSTORE_ORDER_LIST_ORDER_ADD",
      ],
    }, 
  },
  { 
    path: 'order-list/:fleetType/edit-order/:id', component: OrderComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PARTSTORE_ORDER_LIST_ORDER_UPDATE",
      ],
    }, 
  },

  /* supplier */
  { 
      path: 'order-list/add-supplier', component: SuppliersAddFormComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "PARTSTORE_SUPPLIER_ADD",
        ],
      },
  },
  {
    path: 'order-list/edit-supplier/:id',
    component: SuppliersAddFormComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PARTSTORE_SUPPLIER_UPDATE",
      ],
    },
  },

  /* Receive */
  {
    path: 'order-list/asset/receive-order/:id',
    component: ReceiveOrderComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PARTSTORE_ORDER_RECEIVED",
      ],
    },
  },
  {
    path: 'order-list/sub-asset/receive-order/:id',
    component: ReceiveOrderComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PARTSTORE_ORDER_RECEIVED",
      ],
    },
  },

  { 
      path: 'order-list', redirectTo: 'order-list/asset'
  },
  { 
      path: 'order-list/asset', component: OrderListComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "PARTSTORE_ORDER_LIST_REQUEST_VIEW_LIST_OWN",
          "PARTSTORE_ORDER_LIST_REQUEST_VIEW_LIST_OTHERS",
          "PARTSTORE_ORDER_LIST_ORDER_VIEW_LIST",
          "PARTSTORE_SUPPLIER_VIEW_LIST",
          "PARTSTORE_ORDER_LIST_ORDER_ADD",
          "PARTSTORE_ORDER_LIST_REQUEST_ADD",
          "PARTSTORE_SUPPLIER_ADD"
        ],
      }, 
  },
  { 
      path: 'order-list/sub-asset', component: OrderListComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "PARTSTORE_ORDER_LIST_REQUEST_VIEW_LIST_OWN",
          "PARTSTORE_ORDER_LIST_REQUEST_VIEW_LIST_OTHERS",
          "PARTSTORE_ORDER_LIST_ORDER_VIEW_LIST",
          "PARTSTORE_SUPPLIER_VIEW_LIST",
          "PARTSTORE_ORDER_LIST_ORDER_ADD",
          "PARTSTORE_ORDER_LIST_REQUEST_ADD",
          "PARTSTORE_SUPPLIER_ADD"
        ],
      },
  },

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
