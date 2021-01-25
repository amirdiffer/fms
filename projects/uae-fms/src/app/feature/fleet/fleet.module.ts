import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet.component';
import { AssetsComponent } from './assets/assets.component';
import { FilterModule } from '@core/filter/filter.module';
import { TableModule } from '@core/table/table.module';
import { TabViewModule } from '@core/tab-view';

@NgModule({
  declarations: [FleetComponent, AssetsComponent],
  imports: [
    CommonModule,
    FleetRoutingModule , 
    FilterModule, 
    TableModule , 
    TabViewModule]
})
export class FleetModule {}
