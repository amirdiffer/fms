import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrafficFineComponent } from '@feature/traffic-fine/traffic-fine.component';
import { TrafficFileOverviewComponent } from './traffic-file-overview/traffic-file-overview.component';
import { AssetOverviewComponent } from './asset-overview/asset-overview.component';
import { TrafficFileNumberComponent } from '@feature/traffic-fine/traffic-file-number/traffic-file-number.component';
import { AddTrafficFileComponent } from '@feature/traffic-fine/add-traffic-file/add-traffic-file.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview' },
  { path: 'overview', component: TrafficFineComponent },
  { path: 'traffic-file-number', component: TrafficFileNumberComponent },
  { path: 'add-traffic-file', component: AddTrafficFileComponent },
  { path: 'edit-traffic-file/:id', component: AddTrafficFileComponent },
  {
    path: 'traffic-fine-overview/:id',
    component: TrafficFileOverviewComponent
  },
  { path: 'asset-overview/:id', component: AssetOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrafficFineRoutingModule {}
