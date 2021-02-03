import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOrganizationComponent } from './organization/add-organization/add-organization.component';
import { AddSubAssetComponent } from './sub-asset/add-sub-asset/add-sub-asset.component';
import { OrganizationComponent } from './organization/organization.component';
import { AccessoryComponent } from './accessory/accessory.component';
import { SubAssetComponent } from './sub-asset/sub-asset.component';
import { OperatorComponent } from './operator/operator.component';
import { MovementComponent } from './movement/movement.component';
import { AssetsComponent } from './assets/assets.component';

const routes: Routes = [
  { path: 'sub-asset/add-new-sub-asset', component: AddSubAssetComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'accessory', component: AccessoryComponent },
  { path: 'sub-asset', component: SubAssetComponent },
  { path: 'operator', component: OperatorComponent },
  { path: 'movement', component: MovementComponent },
  { path: 'operator', component: OperatorComponent },
  { path: 'assets', component: AssetsComponent },
  {
    path: 'organization/add-organization',
    component: AddOrganizationComponent
  },
  { path: '', redirectTo: 'assets' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}
