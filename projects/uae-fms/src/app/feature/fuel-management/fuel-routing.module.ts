import { AddFuelCardComponent } from './add-fuel-card/add-fuel-card.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuelManagementComponent } from '@feature/fuel-management/fuel-management.component';

const routes: Routes = [
  { path: '', component: FuelManagementComponent },
  { path: 'add-fuel-card', component: AddFuelCardComponent },
  { path: 'add-asset-usage' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuelRoutingModule {}
