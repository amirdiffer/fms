import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';

import { FleetComponent } from './fleet.component';
import { OperatorComponent } from '@feature/fleet/operator/operator.component';

const routes: Routes = [
  { path: '', component: FleetComponent },
  {path:'assets', component:AssetsComponent},
  { path: 'operator', component: OperatorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}
