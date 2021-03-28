import { AddOperatorComponent } from './operator/add-operator/add-operator.component';
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
import { OverViewAssetComponent } from './assets/overview-asset/overview-asset.component';
import { AddAssetComponent } from './assets/add-asset/add-asset.component';
import { AddAccessoryComponent } from './accessory/add-accessory/add-accessory.component';
import { AddRequestComponent } from './movement/add-request/add-request.component';
import { PendingRegistrationOverviewComponent } from './assets/pending-registration-overview/pending-registration-overview.component';
import { PendingCustomizationOverviewComponent } from './assets/pending-customization-overview/pending-customization-overview.component';
import { IserveComponent } from '@feature/fleet/movement/iserv/iserv.component';

const routes: Routes = [
  { path: 'sub-asset/add-new-sub-asset', component: AddSubAssetComponent },
  { path: 'department', component: OrganizationComponent },
  { path: 'accessory', component: AccessoryComponent },
  { path: 'accessory/add-new-accessory', component: AddAccessoryComponent },
  { path: 'sub-asset', component: SubAssetComponent },
  { path: 'movement', component: MovementComponent },
  { path: 'movement/iserve', component: IserveComponent },
  { path: 'movement/add-request', component: AddRequestComponent },
  { path: 'operator', component: OperatorComponent },
  { path: 'operator/add', component: AddOperatorComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'assets/add-new-asset', component: AddAssetComponent },
  { path: 'assets/edit-asset/:id', component: AddAssetComponent },
  { path: 'assets/:id', component: OverViewAssetComponent },
  {
    path: 'assets/:id/registration',
    component: PendingRegistrationOverviewComponent
  },
  {
    path: 'assets/:id/customization',
    component: PendingCustomizationOverviewComponent
  },
  {
    path: 'department/add-department',
    component: AddOrganizationComponent
  },
  { path: '', redirectTo: 'assets' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}
