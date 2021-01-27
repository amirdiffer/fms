import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FleetComponent } from './fleet.component';
import { SubAssetComponent } from '@feature/fleet/sub-asset/sub-asset.component';
import { OperatorComponent } from '@feature/fleet/operator/operator.component';

const routes: Routes = [
  { path: '', component: FleetComponent },
  { path: 'operator', component: OperatorComponent },
  { path: 'sub-asset', component: SubAssetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}
