import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionGuard } from "@core/Permission/permission.guard";
import { AddOrganizationComponent } from "./add-organization/add-organization.component";
import { DepartmentOverviewComponent } from "./department-overview/department-overview.component";
import { OrganizationComponent } from "./organization.component";



const routes: Routes =[
    { 
        path: '', 
        component: OrganizationComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "ORGANIZATION_VIEW_LIST",
            "ORGANIZATION_ADD",
          ],
        }
    },
    {
        path: 'add-department',
        component: AddOrganizationComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "ORGANIZATION_ADD",
          ],
        }
    },
    {
        path: 'edit-department/:id',
        component: AddOrganizationComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "ORGANIZATION_UPDATE",
          ],
        }
    },
    {
        path: 'department-overview/:id',
        component: DepartmentOverviewComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "ORGANIZATION_VIEW_DETAILS",
            "ORGANIZATION_VIEW_USERS",
            "ORGANIZATION_VIEW_TRAFFIC_FINES",
            "ORGANIZATION_VIEW_MOVEMENT_HISTORY",
          ],
        }
    },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganizationRoutingModule { }