import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLocationComponent } from './add-location/add-location.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { AddTechnicianComponent } from './add-technician/add-technician.component';
import { BodyShopComponent } from './body-shop.component';
import { RequestTabOverviewComponent } from '../body-shop/request-tab-overview/request-tab-overview.component';

const routes: Routes = [
  { path: '', component: BodyShopComponent, pathMatch: 'full' },
  { path: 'add-request', component: AddRequestComponent },
  { path: 'add-technician', component: AddTechnicianComponent },
  { path: 'add-location', component: AddLocationComponent },
  { path: 'request-overview/:id', component: RequestTabOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyShopRoutingModule {}
