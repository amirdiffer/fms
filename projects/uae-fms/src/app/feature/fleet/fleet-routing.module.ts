import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FleetComponent } from './fleet.component';
import { OperatorComponent } from '@feature/fleet/operator/operator.component';
import { OrganizationComponent } from '@feature/fleet/organization/organization.component';

const routes: Routes = [
  { path: '', component: FleetComponent },
  { path: 'operator', component: OperatorComponent },
  { path: 'organization', component: OrganizationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}
