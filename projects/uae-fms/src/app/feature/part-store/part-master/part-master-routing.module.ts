import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionGuard } from "@core/Permission/permission.guard";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { AddItemComponent } from "./add-item/add-item.component";
import { PartMasterComponent } from "./part-master.component";
import { TableContentComponent } from "./table-content/table-content.component";
const routes: Routes = [
    {
        path: '',
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
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PartMasterRoutingModule {}