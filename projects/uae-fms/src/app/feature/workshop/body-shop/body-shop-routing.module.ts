import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLocationComponent } from './add-location/add-location.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { AddTechnicianComponent } from './add-technician/add-technician.component';
import { BodyShopComponent } from './body-shop.component';
import { RequestTabOverviewComponent } from '../body-shop/request-tab-overview/request-tab-overview.component';
import { AddJobCardComponent } from './add-job-card/add-job-card.component';
import { TechnicianOverviewComponent } from './technician-overview/technician-overview.component';
import { JobCardOverviewComponent } from "./job-card-overview/job-card-overview.component";
const routes: Routes = [
  { path: '', component: BodyShopComponent, pathMatch: 'full' },
  { path: 'add-request', component: AddRequestComponent },
  { path: 'add-technician', component: AddTechnicianComponent },
  { path: 'technician/:id', component: TechnicianOverviewComponent },
  { path: 'edit-technician/:id', component: AddTechnicianComponent },
  { path: 'add-location', component: AddLocationComponent },
  { path: 'edit-location/:id', component: AddLocationComponent },
  { path: 'add-job-card', component: AddJobCardComponent },
  { path: ':id/add-job-card', component: AddJobCardComponent },
  { path: 'edit-job-card/:id', component: AddJobCardComponent },
  { path: 'request-overview/:id', component: RequestTabOverviewComponent , children:[
    { path: 'add-request', component: AddRequestComponent },
    { path: 'edit-request/:id', component: AddRequestComponent },
    { path: 'add-job-card', component: AddJobCardComponent },
  ]},
  { path: 'job-card-overview/:id', component: JobCardOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyShopRoutingModule { }
