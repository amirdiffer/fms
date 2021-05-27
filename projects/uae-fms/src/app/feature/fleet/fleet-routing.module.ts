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
import { PermissionGuard } from '@core/Permission/permission.guard';

const routes: Routes = [
  
  /* '''''Asset Routing''''' */
  { 
    path: 'assets', 
    component: AssetsComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_VIEW_LIST_MASTER_OWN",
        "ASSET_VIEW_LIST_PENDING_OWN",
        "ASSET_VIEW_LIST_CUSTOMIZATION_OWN",
        "ASSET_VIEW_LIST_MASTER_OTHERS",
        "ASSET_VIEW_LIST_PENDING_OTHERS",
        "ASSET_VIEW_LIST_CUSTOMIZATION_OTHERS",
        "ASSET_ADD",
      ],
    }
  },
  { 
    path: 'assets/add-new-asset', 
    component: AddAssetComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_ADD",
      ],
    }
  },
  { 
    path: 'assets/edit-asset/:id', 
    component: AddAssetComponent ,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_UPDATE_OWN",
        "ASSET_UPDATE_OTHERS",
      ],
    }
  },
  { 
    path: 'assets/:id', 
    component: OverViewAssetComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_VIEW_DETAILS_OWN",
        "ASSET_VIEW_SUMMARY_OWN",
        "ASSET_VIEW_DETAILS_OTHERS",
        "ASSET_VIEW_SUMMARY_OTHERS",
      ],
    }

  },
  {
    path: 'assets/:id/registration',
    component: PendingRegistrationOverviewComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_REGISTER_OWN",
        "ASSET_REGISTER_OTHERS",
      ],
    }
  },
  {
    path: 'assets/:id/customization',
    component: PendingCustomizationOverviewComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_CUSTOMIZE_OWN",
        "ASSET_CUSTOMIZE_OTHERS",
      ],
    }
  },




  /* '''''Sub Asset Routing''''' */
  { 
    path: 'sub-asset', 
    component: SubAssetComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "SUB_ASSET_ADD",
        "SUB_ASSET_VIEW_LIST_OWN",
        "SUB_ASSET_VIEW_LIST_OTHERS",
      ],
    }
  },
  { 
    path: 'sub-asset/add-new-sub-asset', 
    component: AddSubAssetComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "SUB_ASSET_ADD",
      ],
    } 
  },
  { 
    path: 'sub-asset/:id', 
    component: SubAssetOverviewComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "SUB_ASSET_VIEW_DETAILS_OWN",
        "SUB_ASSET_VIEW_DETAILS_OTHERS",
      ],
    }
  },
  
  { 
    path: 'sub-asset/edit-sub-asset/:id', 
    component: AddSubAssetComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "SUB_ASSET_UPDATE_OWN",
        "SUB_ASSET_UPDATE_OTHERS",
      ],
    } 
  },




  /* '''''Accessory Routing''''' */
  { 
    path: 'accessory', 
    component: AccessoryComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ACCESSORY_VIEW_LIST_OWN",
        "ACCESSORY_VIEW_LIST_OTHERS",
        "ACCESSORY_ADD",
      ],
    } 
  },
  {
    path: 'accessory/accessory-overview',
    component: AccessoryOverviewComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ACCESSORY_VIEW_DETAILS_OWN",
        "ACCESSORY_VIEW_DETAILS_OTHERS",
      ],
    } 
  },
  { 
    path: 'accessory/add-new-accessory', 
    component: AddAccessoryComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ACCESSORY_ADD",
      ],
    } 
  },
  { 
    path: 'accessory/edit-accessory/:id', 
    component: AddAccessoryComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ACCESSORY_UPDATE_OWN",
        "ACCESSORY_UPDATE_OTHERS",
      ],
    } 
  },




  /* '''''Operator Routing''''' */
  { 
    path: 'operator', 
    component: OperatorComponent ,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "USER_OPERATOR_ADD",
        "USER_OPERATOR_VIEW_LIST",
      ],
    }
  },
  { 
    path: 'operator/add-operator', 
    component: AddOperatorComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "USER_OPERATOR_ADD",
      ],
    }
  },
  { 
    path: 'operator/edit-operator/:id', 
    component: AddOperatorComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "USER_OPERATOR_UPDATE",
      ],
    }
  },
  { 
    path: 'operator/:id',
    component: OverViewOperatorComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "USER_OPERATOR_VIEW_DETAILS_GENERAL",
        "USER_OPERATOR_VIEW_DETAILS_TRAFFIC_FINE",
        "USER_OPERATOR_VIEW_DETAILS_MOVEMENT_HISTORY",
      ],
    } 
  },



  /* '''''Department Routing''''' */
  { 
    path: 'department', 
    component: OrganizationComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ORGANIZATION_VIEW_LIST",
        "ORGANIZATION_ADD",
      ],
    }
  },

  {
    path: 'department/add-department',
    component: AddOrganizationComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ORGANIZATION_ADD",
      ],
    }
  },
  {
    path: 'department/edit-department/:id',
    component: AddOrganizationComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ORGANIZATION_UPDATE",
      ],
    }
  },
  {
    path: 'department/department-overview/:id',
    component: DepartmentOverviewComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ORGANIZATION_VIEW_DETAILS",
        "ORGANIZATION_VIEW_USERS",
        "ORGANIZATION_VIEW_TRAFFIC_FINES",
        "ORGANIZATION_VIEW_MOVEMENT_HISTORY",
      ],
    }
  },


   /* '''''Movement Routing''''' */
   { 
     path: 'movement', 
     redirectTo: 'movement/permanent'
    },
   { 
      path: 'movement/permanent', 
      component: MovementComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "MOVEMENT_REQUEST_VIEW_LIST_OWN",
          "MOVEMENT_REQUEST_VIEW_LIST_OTHERS",
          "MOVEMENT_VIEW_LIST_OWN",
          "MOVEMENT_VIEW_LIST_OTHERS",
          "MOVEMENT_REQUEST_ADD",
        ],
      }
    },
    { 
      path: 'movement/iserve', 
      component: IserveComponent,
    },
   { 
     path: 'movement/temporary', 
     component: TemporaryComponent,
     canActivate:[PermissionGuard],
      data:{
        permission:[
          "MOVEMENT_REQUEST_VIEW_LIST_OWN",
          "MOVEMENT_REQUEST_VIEW_LIST_OTHERS",
          "MOVEMENT_VIEW_LIST_OWN",
          "MOVEMENT_VIEW_LIST_OTHERS",
          "MOVEMENT_REQUEST_ADD",
        ],
      }
    },
    { 
      path: 'movement/permanent/add-permanent-request', 
      component: AddRequestComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "MOVEMENT_REQUEST_ADD",
        ],
      }
    },
    {
      path: 'movement/temporary/add-temporary-request',
      component: AddTemporaryRequestComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "MOVEMENT_REQUEST_ADD",
        ],
      }
    },
  
  { path: '', redirectTo: 'assets' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule {}
