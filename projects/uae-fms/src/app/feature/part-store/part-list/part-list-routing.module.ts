import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionGuard } from "@core/Permission/permission.guard";
import { OrderComponent } from "../order-list/order/order.component";
import { PartOverviewComponent } from "../part-overview/part-overview.component";
import { PartListComponent } from "./part-list.component";
import { UpdateFormComponent } from "./update-form/update-form.component";
const routes: Routes =[
    {
        path: '', component: PartListComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "PARTSTORE_PART_VIEW_LIST",
          ],
        }
    },
    {
        path: ':id',
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
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartListRoutingModule {}