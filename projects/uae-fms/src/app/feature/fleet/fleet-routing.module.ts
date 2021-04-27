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
import { OverViewOperatorComponent } from './operator/over-view-operator/over-view-operator.component';
import { TemporaryComponent } from '@feature/fleet/movement/temporary/temporary.component';
import { AddTemporaryRequestComponent } from '@feature/fleet/movement/add-temporary-request/add-temporary-request.component';
import { AccessoryOverviewComponent } from './accessory/accessory-overview/accessory-overview.component';
import { DepartmentOverviewComponent } from '@feature/fleet/organization/department-overview/department-overview.component';
import { SubAssetOverviewComponent } from './sub-asset/sub-asset-overview/sub-asset-overview.component';

const routes: Routes = [
  { path: 'sub-asset/add-new-sub-asset', component: AddSubAssetComponent },
  { path: 'sub-asset/edit-sub-asset/:id', component: AddSubAssetComponent },
  { path: 'department', component: OrganizationComponent },
  {
    path: 'accessory/accessory-overview',
    component: AccessoryOverviewComponent
  },
  { path: 'accessory/add-new-accessory', component: AddAccessoryComponent },
  { path: 'accessory/edit-accessory/:id', component: AddAccessoryComponent },
  { path: 'accessory', component: AccessoryComponent },
  { path: 'sub-asset', component: SubAssetComponent },
  { path: 'sub-asset/:id', component: SubAssetOverviewComponent },
  { path: 'movement', redirectTo: 'movement/permanent' },
  { path: 'movement/permanent', component: MovementComponent },
  // { path: 'movement/iserve', component: IserveComponent },
  { path: 'movement/temporary', component: TemporaryComponent },
  { path: 'movement/permanent/add-permanent-request', component: AddRequestComponent },
  {
    path: 'movement/temporary/add-temporary-request',
    component: AddTemporaryRequestComponent
  },
  { path: 'operator', component: OperatorComponent },
  { path: 'operator/add-operator', component: AddOperatorComponent },
  { path: 'operator/edit-operator/:id', component: AddOperatorComponent },
  { path: 'operator/:id', component: OverViewOperatorComponent },
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
  {
    path: 'department/edit-department/:id',
    component: AddOrganizationComponent
  },
  {
    path: 'department/department-overview/:id',
    component: DepartmentOverviewComponent
  },
  { path: '', redirectTo: 'assets' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}
