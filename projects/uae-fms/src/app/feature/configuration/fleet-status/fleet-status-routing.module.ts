import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddFleetStatusComponent } from "./add-fleet-status/add-fleet-status.component";
import { FleetStatusComponent } from "./fleet-status.component";
const routes: Routes = [
    {
        path: '',
        component: FleetStatusComponent,
        data: { name: 'Fleet Status' },
        
    },
    {
        path: 'add-fleet-status',
        component: AddFleetStatusComponent,
        data: { name: 'Add Fleet Status' },
        
    },
    {
        path: 'edit-fleet-status/:id',
        component: AddFleetStatusComponent,
        data: { name: 'Edit Fleet Status' },
        
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetStatusRoutingModule {}