import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@core/Permission/permission.guard';
import { AddAssetPolicyComponent } from './add-asset-policy/add-asset-policy.component';
import { AssetPolicyComponent } from './asset-policy.component';

const routes: Routes = [
  {
    path: '',
    component: AssetPolicyComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: [
        'ASSET_POLICY_ASSET_VIEW_LIST',
        'ASSET_POLICY_SUB_ASSET_VIEW_LIST',
        'ASSET_POLICY_ASSET_ADD',
        'ASSET_POLICY_SUB_ASSET_ADD'
      ]
    }
  },
  {
    path: 'edit-asset-policy/:id',
    component: AddAssetPolicyComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['ASSET_POLICY_ASSET_UPDATE', 'ASSET_POLICY_SUB_ASSET_UPDATE']
    }
  },
  {
    path: 'add-asset-policy',
    component: AddAssetPolicyComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['ASSET_POLICY_ASSET_ADD', 'ASSET_POLICY_SUB_ASSET_ADD']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetPolicyRoutingModule {}
