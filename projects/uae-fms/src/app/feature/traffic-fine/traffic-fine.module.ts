import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { TableModule } from '@core/table';
import { TabViewModule } from '@core/tab-view';
import { FilterModule } from '@core/filter/filter.module';
import { TrafficFineComponent } from '@feature/traffic-fine/traffic-fine.component';

import { TrafficFineRoutingModule } from './traffic-fine-routing.module';
import { TrafficFinesStateModule } from '../traffic-fine/+state';
import { SharedModule } from '@shared/shared.module';
import { TrafficFileOverviewComponent } from './traffic-file-overview/traffic-file-overview.component';
import { AssetOverviewComponent } from './asset-overview/asset-overview.component';
import { AssetMasterStateModule } from '@feature/fleet/+state/assets/asset-master/asset-master-state.module';
import { AssetsModule } from '@feature/fleet/assets/assets.module';
import { TrafficFileNumberComponent } from './traffic-file-number/traffic-file-number.component';
import { AddTrafficFileComponent } from './add-traffic-file/add-traffic-file.component';
import { AssetCarDetailComponent } from '@feature/traffic-fine/asset-detail/asset-car-detail.component';

@NgModule({
  declarations: [
    TrafficFineComponent,
    TrafficFileOverviewComponent,
    AssetOverviewComponent,
    TrafficFileNumberComponent,
    AddTrafficFileComponent,
    AssetCarDetailComponent
  ],
  imports: [
    TableModule,
    FilterModule,
    SharedModule,
    CommonModule,
    TabViewModule,
    AngularSvgIconModule,
    TrafficFineRoutingModule,
    TrafficFinesStateModule,
    AssetMasterStateModule,
    AssetsModule
  ]
})
export class TrafficFineModule {}
