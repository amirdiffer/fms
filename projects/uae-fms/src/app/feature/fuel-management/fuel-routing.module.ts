import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuelManagementComponent } from '@feature/fuel-management/fuel-management.component';

const routes: Routes = [{ path: '', component: FuelManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuelRoutingModule {}
