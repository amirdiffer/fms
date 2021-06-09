import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionGuard } from "@core/Permission/permission.guard";
import { AccessoryOverviewComponent } from "./accessory-overview/accessory-overview.component";
import { AccessoryComponent } from "./accessory.component";
import { AddAccessoryComponent } from "./add-accessory/add-accessory.component";


const routes: Routes = [
    { 
        path: '', 
        component: AccessoryComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "ACCESSORY_VIEW_LIST_OWN",
            "ACCESSORY_VIEW_LIST_OTHERS",
            "ACCESSORY_ADD",
          ],
        } 
    },
    {
        path: 'accessory-overview',
        component: AccessoryOverviewComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "ACCESSORY_VIEW_DETAILS_OWN",
            "ACCESSORY_VIEW_DETAILS_OTHERS",
          ],
        } 
    },
    { 
        path: 'add-new-accessory', 
        component: AddAccessoryComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "ACCESSORY_ADD",
          ],
        } 
    },
    { 
        path: 'edit-accessory/:id', 
        component: AddAccessoryComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "ACCESSORY_UPDATE_OWN",
            "ACCESSORY_UPDATE_OTHERS",
          ],
        } 
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessoryRoutingModule { }