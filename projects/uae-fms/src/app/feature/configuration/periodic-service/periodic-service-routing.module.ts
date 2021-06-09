import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PermissionGuard } from "@core/Permission/permission.guard";
import { AddPeriodicServiceComponent } from "./add-periodic-service/add-periodic-service.component";
import { PeriodicServiceComponent } from "./periodic-service.component";
const routes: Routes = [
    { 
        path: '', component: PeriodicServiceComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "PERIODIC_SERVICE_VIEW_LIST",
            "PERIODIC_SERVICE_ADD"
          ],
        }
      },
    {
        path: 'add-periodic-service',
        component: AddPeriodicServiceComponent,
        canActivate:[PermissionGuard],
        data:{
          name: 'Add Periodic Service',
          permission:[
            "PERIODIC_SERVICE_ADD",
          ],
        }
      },
      {
        path: 'edit-periodic-service/:id',
        component: AddPeriodicServiceComponent,
        canActivate:[PermissionGuard],
        data:{
          permission:[
            "PERIODIC_SERVICE_UPDATE",
          ],
        }
      },
      
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeriodicServiceRoutingModule {}