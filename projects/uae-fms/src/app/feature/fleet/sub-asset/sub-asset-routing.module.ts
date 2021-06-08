import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionGuard } from "@core/Permission/permission.guard";
import { AddSubAssetComponent } from "./add-sub-asset/add-sub-asset.component";
import { SubAssetOverviewComponent } from "./sub-asset-overview/sub-asset-overview.component";
import { SubAssetComponent } from "./sub-asset.component";

const routes: Routes =[
    { 
        path: '', 
        component: SubAssetComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "SUB_ASSET_ADD",
            "SUB_ASSET_VIEW_LIST_OWN",
            "SUB_ASSET_VIEW_LIST_OTHERS",
          ],
        }
    },
    { 
        path: 'add-new-sub-asset', 
        component: AddSubAssetComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "SUB_ASSET_ADD",
          ],
        } 
    },
    { 
        path: ':id', 
        component: SubAssetOverviewComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "SUB_ASSET_VIEW_DETAILS_OWN",
            "SUB_ASSET_VIEW_DETAILS_OTHERS",
          ],
        }
    },
      
    { 
        path: 'edit-sub-asset/:id', 
        component: AddSubAssetComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "SUB_ASSET_UPDATE_OWN",
            "SUB_ASSET_UPDATE_OTHERS",
          ],
        } 
    },
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubAssetRoutingModule { }