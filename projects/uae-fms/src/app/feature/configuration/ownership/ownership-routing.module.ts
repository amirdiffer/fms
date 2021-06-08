import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionGuard } from "@core/Permission/permission.guard";
import { OwnershipFormComponent } from "./ownership-form/ownership-form.component";
import { OwnershipComponent } from "./ownership.component";

const routes: Routes = [
    { 
        path: '', component: OwnershipComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "OWNERSHIP_VIEW_LIST",
            "OWNERSHIP_ADD"
          ],
        }
    },
    { 
        path: 'add-ownership', component: OwnershipFormComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "OWNERSHIP_ADD",
          ],
        }  
    },
    { 
        path: 'edit-ownership/:id', component: OwnershipFormComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "OWNERSHIP_UPDATE",
          ],
        }
    },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OwnershipRoutingModule {}