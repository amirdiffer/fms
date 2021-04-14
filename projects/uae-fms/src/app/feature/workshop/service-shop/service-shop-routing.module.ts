import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobCardServiceShopComponent } from './add-job-card/add-job-card.component';
import { AddLocationServiceShopComponent } from './add-location/add-location.component';
import { AddRequestServiceShopComponent } from './add-request/add-request.component';
import { AddTechnicianServiceShopComponent } from './add-technician/add-technician.component';
import { RequestTabOverviewServiceShopComponent } from './request-tab-overview/request-tab-overview.component';
import { ServiceShopComponent } from './service-shop.component';
import { TechnicianOverviewServiceShopComponent } from './technician-overview/technician-overview.component';

// const routes: Routes = [
//   { path: '', component: ServiceShopComponent, pathMatch: 'full' },
//   { path: 'add-request', component: ServiceShopAddRequestComponent },
//   { path: 'add-technician', component: ServiceShopAddTechnicianComponent },
//   { path: 'add-location', component: ServiceShopAddLocationComponent }
// ];
const routes: Routes = [
  { path: '', component: ServiceShopComponent, pathMatch: 'full' },
  { path: 'add-request', component: AddRequestServiceShopComponent },
  { path: 'edit-request/:id', component: AddRequestServiceShopComponent },
  { path: 'add-technician', component: AddTechnicianServiceShopComponent },
  {path: 'technician/:id' , component: TechnicianOverviewServiceShopComponent},
  { path: 'edit-technician/:id', component: AddTechnicianServiceShopComponent },
  { path: 'add-location', component: AddLocationServiceShopComponent },
  { path: 'add-job-card', component: AddJobCardServiceShopComponent },
  { path: 'edit-job-card/:id', component: AddJobCardServiceShopComponent },
  { path: 'request-overview/:id', component: RequestTabOverviewServiceShopComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceShopRoutingModule {}
