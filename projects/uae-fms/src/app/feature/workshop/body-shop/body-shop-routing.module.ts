import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AddLocationComponent } from './add-location/add-location.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { AddTechnicianComponent } from './add-technician/add-technician.component';
import { BodyShopComponent } from './body-shop.component';
import { RequestTabOverviewComponent } from '../body-shop/request-tab-overview/request-tab-overview.component';
import { AddJobCardComponent } from './add-job-card/add-job-card.component';
import { TechnicianOverviewComponent } from './technician-overview/technician-overview.component';
import { JobCardOverviewComponent } from './job-card-overview/job-card-overview.component';
import { PermissionGuard } from '@core/Permission/permission.guard';

const routes: Routes = [
  {
    path: '', component: BodyShopComponent, pathMatch: 'full',
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "WORKSHOP_BODY_SHOP_REQUEST_OF_ASSET_VIEW_LIST_OWN",
        "WORKSHOP_BODY_SHOP_REQUEST_OF_ASSET_VIEW_LIST_OTHERS",
        "WORKSHOP_BODY_SHOP_JOB_CARD_VIEW_LIST",
        "WORKSHOP_BODY_SHOP_TECHNICIAN_VIEW_LIST",
        "WORKSHOP_BODY_SHOP_LOCATION_VIEW_LIST",
        "WORKSHOP_BODY_SHOP_REQUEST_ADD",
        "WORKSHOP_BODY_SHOP_TECHNICIAN_ADD",
        "WORKSHOP_BODY_SHOP_LOCATION_ADD",
        "WORKSHOP_BODY_SHOP_JOB_CARD_OPEN_CLOSE"
      ],
    }
  },
  {
    path: 'add-request', component: AddRequestComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "WORKSHOP_BODY_SHOP_REQUEST_ADD"
      ],
    }
  },
  {
    path: 'add-technician', component: AddTechnicianComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "WORKSHOP_BODY_SHOP_TECHNICIAN_ADD"
      ],
    }
  },
  {
    path: 'technician/:id', component: TechnicianOverviewComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "WORKSHOP_BODY_SHOP_TECHNICIAN_VIEW_DETAILS"
      ],
    }
  },
  {
    path: 'edit-technician/:id', component: AddTechnicianComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "WORKSHOP_BODY_SHOP_TECHNICIAN_UPDATE"
      ],
    }
  },
  // { path: 'add-location', component: AddLocationComponent },
  // { path: 'edit-location/:id', component: AddLocationComponent },
  {
    path: 'add-job-card', component: AddJobCardComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "WORKSHOP_BODY_SHOP_JOB_CARD_OPEN_CLOSE"
      ],
    }
  },
  {
    path: ':id/add-job-card', component: AddJobCardComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "WORKSHOP_BODY_SHOP_JOB_CARD_OPEN_CLOSE"
      ],
    }
  },
  {
    path: 'edit-job-card/:id', component: AddJobCardComponent ,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "WORKSHOP_BODY_SHOP_JOB_CARD_UPDATE"
      ],
    }
  },
  {
    path: 'request-overview/:id',
    component: RequestTabOverviewComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "WORKSHOP_BODY_SHOP_REQUEST_VIEW_DETAILS_OWN",
        "WORKSHOP_BODY_SHOP_REQUEST_VIEW_DETAILS_OTHERS",
      ],
    },
    children: [
      {
          path: 'add-request', component: AddRequestComponent,
          canActivate:[PermissionGuard],
          data:{
            permission:[
              "WORKSHOP_BODY_SHOP_REQUEST_ADD"
            ],
          }
      },
      {
          path: 'edit-request/:id', component: AddRequestComponent,
          canActivate:[PermissionGuard],
          data:{
            permission:[
              "WORKSHOP_BODY_SHOP_REQUEST_UPDATE_OWN",
              "WORKSHOP_BODY_SHOP_REQUEST_UPDATE_OTHERS",
            ],
          }
      },
      {
          path: 'add-job-card', component: AddJobCardComponent,
          canActivate:[PermissionGuard],
          data:{
            permission:[
              "WORKSHOP_BODY_SHOP_JOB_CARD_OPEN_CLOSE",
            ],
          }
      }
    ]
  },
  {
    path: 'job-card-overview/:id', component: JobCardOverviewComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "WORKSHOP_BODY_SHOP_JOB_CARD_VIEW_DETAILS",
      ],
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyShopRoutingModule {}
