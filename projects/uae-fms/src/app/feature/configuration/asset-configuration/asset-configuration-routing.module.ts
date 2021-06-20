import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@core/Permission/permission.guard';
import { AddMakeComponent } from './add-make/add-make.component';
import { AddModelComponent } from './add-model/add-model.component';
import { AddTrimComponent } from './add-trim/add-trim.component';
import { AddTypeComponent } from './add-type/add-type.component';
import { AssetConfigurationComponent } from './asset-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: AssetConfigurationComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: ['FLEET_CONFIGURATION_VIEW_LIST']
    },
    children: [
      {
        path: 'add-asset-configuration',
        component: AddTypeComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_ADD']
        }
      },
      {
        path: 'add-sub-asset-configuration',
        component: AddTypeComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_ADD']
        }
      },
      {
        path: 'add-accessory-configuration',
        component: AddTypeComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_ADD']
        }
      },
      {
        path: 'edit-asset-configuration/:id',
        component: AddTypeComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_UPDATE']
        }
      },
      {
        path: 'edit-sub-asset-configuration/:id',
        component: AddTypeComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_UPDATE']
        }
      },
      {
        path: 'edit-accessory-configuration/:id',
        component: AddTypeComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_UPDATE']
        }
      },
      {
        path: ':fleetType/add-make/:assetTypeId',
        component: AddMakeComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_ADD']
        }
      },
      {
        path: ':fleetType/edit-make/:assetTypeId/:id',
        component: AddMakeComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_UPDATE']
        }
      },
      {
        path: ':fleetType/add-model/:assetTypeId/:makeId',
        component: AddModelComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_ADD']
        }
      },
      {
        path: ':fleetType/edit-model/:assetTypeId/:makeId/:id',
        component: AddModelComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_UPDATE']
        }
      },
      {
        path: ':fleetType/add-trim/:assetTypeId/:makeId/:modelId',
        component: AddTrimComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_ADD']
        }
      },
      {
        path: ':fleetType/edit-trim/:assetTypeId/:makeId/:modelId/:id',
        component: AddTrimComponent,
        canActivate: [PermissionGuard],
        data: {
          permission: ['FLEET_CONFIGURATION_UPDATE']
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetConfigurationRoutingModule {}
