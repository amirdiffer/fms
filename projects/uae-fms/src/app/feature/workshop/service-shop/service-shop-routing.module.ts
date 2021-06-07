import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobCardServiceShopComponent } from './add-job-card/add-job-card.component';
// import { AddLocationServiceShopComponent } from './add-location/add-location.component';
import { AddRequestServiceShopComponent } from './add-request/add-request.component';
import { AddTechnicianServiceShopComponent } from './add-technician/add-technician.component';
import { RequestTabOverviewServiceShopComponent } from './request-tab-overview/request-tab-overview.component';
import { ServiceShopComponent } from './service-shop.component';
import { TechnicianOverviewServiceShopComponent } from './technician-overview/technician-overview.component';
import { JobCardOverviewComponent } from './job-card-overview/job-card-overview.component';
import { PermissionGuard } from '@core/Permission/permission.guard';

// const routes: Routes = [
//   { path: '', component: ServiceShopComponent, pathMatch: 'full' },
//   { path: 'add-request', component: ServiceShopAddRequestComponent },
//   { path: 'add-technician', component: ServiceShopAddTechnicianComponent },
//   { path: 'add-location', component: ServiceShopAddLocationComponent }
// ];
const routes: Routes = [
  {
      path: '', component: ServiceShopComponent, pathMatch: 'full',
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "WORKSHOP_SERVICE_SHOP_REQUEST_OF_ASSET_VIEW_LIST_OWN",
          "WORKSHOP_SERVICE_SHOP_REQUEST_OF_ASSET_VIEW_LIST_OTHERS",
          "WORKSHOP_SERVICE_SHOP_JOB_CARD_VIEW_LIST",
          "WORKSHOP_SERVICE_SHOP_TECHNICIAN_VIEW_LIST",
          "WORKSHOP_SERVICE_SHOP_LOCATION_VIEW_LIST",
          "WORKSHOP_SERVICE_SHOP_REQUEST_ADD",
          "WORKSHOP_SERVICE_SHOP_TECHNICIAN_ADD",
          "WORKSHOP_SERVICE_SHOP_LOCATION_ADD",
          "WORKSHOP_SERVICE_SHOP_JOB_CARD_OPEN_CLOSE",
        ],
      }
  },
  {
      path: 'add-request', component: AddRequestServiceShopComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "WORKSHOP_SERVICE_SHOP_REQUEST_ADD",
        ],
      }
  },
  {
      path: 'add-technician', component: AddTechnicianServiceShopComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "WORKSHOP_SERVICE_SHOP_TECHNICIAN_ADD",
        ],
      }
  },
  {
      path: 'technician/:id', component: TechnicianOverviewServiceShopComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "WORKSHOP_SERVICE_SHOP_TECHNICIAN_VIEW_DETAILS",
        ],
      }
  },
  {
      path: 'edit-technician/:id', component: AddTechnicianServiceShopComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "WORKSHOP_SERVICE_SHOP_TECHNICIAN_UPDATE",
        ],
      }
  },
  // { path: 'add-location', component: AddLocationServiceShopComponent },
  // { path: 'edit-location/:id', component: AddLocationServiceShopComponent },
  {
      path: 'add-job-card', component: AddJobCardServiceShopComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "WORKSHOP_SERVICE_SHOP_JOB_CARD_OPEN_CLOSE",
        ],
      }
  },
  {
      path: ':id/add-job-card', component: AddJobCardServiceShopComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "WORKSHOP_SERVICE_SHOP_JOB_CARD_OPEN_CLOSE",
        ],
      }
  },
  {
      path: 'edit-job-card/:id', component: AddJobCardServiceShopComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "WORKSHOP_SERVICE_SHOP_JOB_CARD_UPDATE",
        ],
      }
  },
  {
    path: 'request-overview/:id',
    component: RequestTabOverviewServiceShopComponent,
    canActivate:[PermissionGuard],
    data:{
      permission:[
        "WORKSHOP_SERVICE_SHOP_REQUEST_VIEW_DETAILS_OWN",
        "WORKSHOP_SERVICE_SHOP_REQUEST_VIEW_DETAILS_OTHERS",
      ],
    },
    children: [
      {
          path: 'add-request', component: AddRequestServiceShopComponent,
          canActivate:[PermissionGuard],
          data:{
            permission:[
              "WORKSHOP_SERVICE_SHOP_REQUEST_ADD",
            ],
          },
      },
      {
          path: 'edit-request/:id', component: AddRequestServiceShopComponent,
          canActivate:[PermissionGuard],
          data:{
            permission:[
              "WORKSHOP_SERVICE_SHOP_REQUEST_UPDATE_OWN",
              "WORKSHOP_SERVICE_SHOP_REQUEST_UPDATE_OTHERS",
            ],
          },
      },
      {
          path: 'add-job-card', component: AddJobCardServiceShopComponent,
          canActivate:[PermissionGuard],
          data:{
            permission:[
              "WORKSHOP_SERVICE_SHOP_JOB_CARD_OPEN_CLOSE",
            ],
          },
      }
    ]
  },
  {
      path: 'job-card-overview/:id', component: JobCardOverviewComponent,
      canActivate:[PermissionGuard],
      data:{
        permission:[
          "WORKSHOP_SERVICE_SHOP_JOB_CARD_VIEW_DETAILS",
        ],
      },
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceShopRoutingModule {}
