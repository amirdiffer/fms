import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrafficFineComponent } from '@feature/traffic-fine/traffic-fine.component';

const routes: Routes = [{ path: '', component: TrafficFineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrafficFineRoutingModule {}
