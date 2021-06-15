import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrafficFineComponent } from '@feature/traffic-fine/traffic-fine.component';
import { TrafficFileOverviewComponent } from './traffic-file-overview/traffic-file-overview.component';
import { AssetOverviewComponent } from './asset-overview/asset-overview.component';

const routes: Routes = [
  { path: '', component: TrafficFineComponent },
  { path: 'traffic-fine-overview/:id', component: TrafficFileOverviewComponent },
  { path: 'asset-overview/:id', component: AssetOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrafficFineRoutingModule {}
