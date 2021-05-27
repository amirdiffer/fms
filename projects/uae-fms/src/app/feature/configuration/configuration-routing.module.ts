import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OwnershipComponent } from './ownership/ownership.component';
import { FleetStatusComponent } from './fleet-status/fleet-status.component';
import { AssetPolicyComponent } from './asset-policy/asset-policy.component';
import { OwnershipFormComponent } from './ownership/ownership-form/ownership-form.component';
import { PeriodicServiceComponent } from './periodic-service/periodic-service.component';
import { AddFleetStatusComponent } from '@feature/configuration/fleet-status/add-fleet-status/add-fleet-status.component';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { AddCategoryComponent } from './business-category/add-category/add-category.component';
import { AssetConfigurationComponent } from './asset-configuration/asset-configuration.component';
import { AddAssetPolicyComponent } from './asset-policy/add-asset-policy/add-asset-policy.component';
import { AddPeriodicServiceComponent } from './periodic-service/add-periodic-service/add-periodic-service.component';
import { AddTypeComponent } from '@feature/configuration/asset-configuration/add-type/add-type.component';
import { AddMakeComponent } from './asset-configuration/add-make/add-make.component';
import { AddModelComponent } from '@feature/configuration/asset-configuration/add-model/add-model.component';
import { AddTrimComponent } from '@feature/configuration/asset-configuration/add-trim/add-trim.component';
import { PermissionGuard } from '@core/Permission/permission.guard';

const routes: Routes = [
  { 
      path: 'asset-configuration', component: AssetConfigurationComponent ,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "FLEET_CONFIGURATION_VIEW_LIST",
        ],
      }
  },
  { 
      path: 'add-asset-configuration', component: AddTypeComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "FLEET_CONFIGURATION_ADD",
        ],
      }
  },
  { 
      path: 'edit-asset-configuration/:id', component: AddTypeComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "FLEET_CONFIGURATION_UPDATE",
        ],
      }
  },
  {
    path: 'sub-asset-edit-asset-configuration/:id',
    component: AddTypeComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "FLEET_CONFIGURATION_UPDATE",
      ],
    }
  },
  {
    path: 'asset-configuration/add-make/:assetType',
    component: AddMakeComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "FLEET_CONFIGURATION_ADD",
      ],
    }
  },
  {
    path: 'asset-configuration/edit-make/:assetTypeId/:id',
    component: AddMakeComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "FLEET_CONFIGURATION_UPDATE",
      ],
    }
  },
  {
    path: 'asset-configuration/sub-asset-edit-make/:assetTypeId/:id',
    component: AddMakeComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "FLEET_CONFIGURATION_UPDATE",
      ],
    }
  },
  {
    path: 'asset-configuration/accessory-edit-make/:id',
    component: AddMakeComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "FLEET_CONFIGURATION_UPDATE",
      ],
    }
  },
  {
    path: 'asset-configuration/add-model/:assetType/:make',
    component: AddModelComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "FLEET_CONFIGURATION_ADD",
      ],
    }
  },
  {
    path: 'asset-configuration/edit-model/:assetTypeId/:makeId/:id',
    component: AddModelComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "FLEET_CONFIGURATION_UPDATE",
      ],
    }
  },
  {
    path: 'asset-configuration/sub-asset-edit-model/:assetTypeId/:makeId/:id',
    component: AddModelComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "FLEET_CONFIGURATION_UPDATE",
      ],
    }
  },
  {
    path: 'asset-configuration/add-trim/:assetType/:make/:model',
    component: AddTrimComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "FLEET_CONFIGURATION_ADD",
      ],
    }
  },
  {
    path: 'asset-configuration/edit-trim/:assetTypeId/:makeId/:id',
    component: AddTrimComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "FLEET_CONFIGURATION_UPDATE",
      ],
    }
  },
  { 
    path: 'usage-category', component: BusinessCategoryComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "BUSINESS_CATEGORY_VIEW_LIST",
        "BUSINESS_CATEGORY_ADD",
      ],
    }
  },
  { 
    path: 'periodic-service', component: PeriodicServiceComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PERIODIC_SERVICE_VIEW_LIST",
        "PERIODIC_SERVICE_ADD"
      ],
    }
  },
  { 
    path: 'asset-policy/add-asset-policy', component: AddAssetPolicyComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_POLICY_ASSET_ADD",
        "ASSET_POLICY_SUB_ASSET_ADD",
      ],
    } 
  },
  {
    path: 'asset-policy/edit-asset-policy/:id',
    component: AddAssetPolicyComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_POLICY_ASSET_UPDATE",
        "ASSET_POLICY_SUB_ASSET_UPDATE",
      ],
    }
  },
  { 
    path: 'asset-policy/add', component: AddAssetPolicyComponent ,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_POLICY_ASSET_ADD",
        "ASSET_POLICY_SUB_ASSET_ADD",
      ],
    } 
  },
  { 
    path: 'ownership/add-ownership', component: OwnershipFormComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "OWNERSHIP_ADD",
      ],
    }  
  },
  { 
    path: 'ownership/edit-ownership/:id', component: OwnershipFormComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "OWNERSHIP_UPDATE",
      ],
    }
  },
  { 
    path: 'asset-policy', component: AssetPolicyComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_POLICY_ASSET_VIEW_LIST",
        "ASSET_POLICY_SUB_ASSET_VIEW_LIST",
        "ASSET_POLICY_ASSET_ADD",
        "ASSET_POLICY_SUB_ASSET_ADD"
      ],
    }
  },
  // { path: 'fleet-status', component: FleetStatusComponent },
  {
    path: 'ownership', component: OwnershipComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "OWNERSHIP_VIEW_LIST",
        "OWNERSHIP_ADD"
      ],
    }
  },
  {
    path: 'periodic-service/add-periodic-service',
    component: AddPeriodicServiceComponent,
    canActivate:[PermissionGuard],
    data:{
      name: 'Add Periodic Service',
      permission:[
        "PERIODIC_SERVICE_ADD",
      ],
    }
  },
  {
    path: 'periodic-service/edit-periodic-service/:id',
    component: AddPeriodicServiceComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PERIODIC_SERVICE_UPDATE",
      ],
    }
  },
  {
    path: 'usage-category/add-usage-category',
    component: AddCategoryComponent,
    canActivate:[PermissionGuard],
    data:{
      name: 'Category Name',
      permission:[
        "BUSINESS_CATEGORY_ADD",
      ],
    }
  },
  {
    path: 'usage-category/edit-usage-category/:id',
    component: AddCategoryComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "BUSINESS_CATEGORY_UPDATE",
      ],
    }
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('../configuration/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      )
  },
  { 
    path: 'periodic-service', component: PeriodicServiceComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "PERIODIC_SERVICE_VIEW_LIST",
        "PERIODIC_SERVICE_ADD"
      ],
    }
  },
  { 
    path: 'asset-policy', component: AssetPolicyComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_POLICY_ASSET_VIEW_LIST",
        "ASSET_POLICY_SUB_ASSET_VIEW_LIST",
        "ASSET_POLICY_ASSET_ADD",
        "ASSET_POLICY_SUB_ASSET_ADD"
      ],
    } 
  },
  { 
    path: 'usage-category', component: BusinessCategoryComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "BUSINESS_CATEGORY_VIEW_LIST",
        "BUSINESS_CATEGORY_ADD",
      ],
    } 
  },
  { 
      path: 'asset-configuration', component: AssetConfigurationComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "FLEET_CONFIGURATION_VIEW_LIST",
        ],
      }
  },
  /* { path: 'fleet-status', component: FleetStatusComponent },
  {
    path: 'fleet-status/add-fleet-status',
    component: AddFleetStatusComponent,
    data: { name: 'Add Fleet Status' }
  }, */
  {
    path: 'fleet-status/edit-fleet-status/:id',
    component: AddFleetStatusComponent,
    data: { name: 'Edit Fleet Status' },
    
  },
  { 
    path: 'ownership', component: OwnershipComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "OWNERSHIP_VIEW_LIST",
        "OWNERSHIP_ADD"
      ],
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-management'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
