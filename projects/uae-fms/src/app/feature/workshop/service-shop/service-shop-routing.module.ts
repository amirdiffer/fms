import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceShopAddLocationComponent } from './add-location/add-location.component';
import { ServiceShopAddRequestComponent } from './add-request/add-request.component';
import { ServiceShopAddTechnicianComponent } from './add-technician/add-technician.component';
import { ServiceShopComponent } from './service-shop.component';

const routes: Routes = [
  { path: '', component: ServiceShopComponent, pathMatch: 'full' },
  { path: 'add-request', component: ServiceShopAddRequestComponent },
  { path: 'add-technician', component: ServiceShopAddTechnicianComponent },
  { path: 'add-location', component: ServiceShopAddLocationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceShopRoutingModule {}
