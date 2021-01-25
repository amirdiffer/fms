import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FleetComponent } from './fleet.component';
import { SubAssetComponent } from '@feature/fleet/sub-asset/sub-asset.component';

const routes: Routes = [
  { path: '', component: FleetComponent },
  { path: 'sub-asset', component: SubAssetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}
