import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '@core/Permission/permission.guard';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { AssetsComponent } from './assets.component';
import { OverViewAssetComponent } from './overview-asset/overview-asset.component';
import { PendingCustomizationOverviewComponent } from './pending-customization-overview/pending-customization-overview.component';
import { PendingRegistrationOverviewComponent } from './pending-registration-overview/pending-registration-overview.component';

const routes: Routes =[
  { 
    path: 'add-new-asset', 
    component: AddAssetComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_ADD",
      ],
    }
  },
  { 
    path: 'edit-asset/:id', 
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
    path: ':id', 
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
    path: ':id/registration',
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
    path: ':id/customization',
    component: PendingCustomizationOverviewComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "ASSET_CUSTOMIZE_OWN",
        "ASSET_CUSTOMIZE_OTHERS",
      ],
    }
  },
  { 
    path: '',
    pathMatch:'full',
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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
