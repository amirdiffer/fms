import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';

import { FleetComponent } from './fleet.component';
import { AccessoryComponent } from '@feature/fleet/accessory/accessory.component';
import { SubAssetComponent } from '@feature/fleet/sub-asset/sub-asset.component';
import { OperatorComponent } from '@feature/fleet/operator/operator.component';
import { OrganizationComponent } from '@feature/fleet/organization/organization.component';
import { MovementComponent } from './movement/movement.component';
import { AddOrganizationComponent } from '@feature/fleet/organization/add-organization/add-organization.component';

const routes: Routes = [
  { path: '', component: FleetComponent },
  { path: 'operator', component: OperatorComponent },
  { path: 'organization', component: OrganizationComponent },
  {
    path: 'organization/add-organization',
    component: AddOrganizationComponent
  },
  { path: 'assets', component: AssetsComponent },
  { path: 'operator', component: OperatorComponent },
  { path: 'sub-asset', component: SubAssetComponent },
  { path: 'accessory', component: AccessoryComponent },
  { path: 'movement', component: MovementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}
