import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessoryRoutingModule } from './accessory-routing.module';
import { TabViewModule } from '@core/tab-view';
import { FilterModule } from '@core/filter';
import { TableModule } from '@core/table';
import { SharedModule } from '@shared/shared.module';
import { AccessoryComponent } from './accessory.component';
import { AddAccessoryComponent } from './add-accessory/add-accessory.component';
import { AccessoryOverviewComponent } from './accessory-overview/accessory-overview.component';



@NgModule({
  declarations: [
    AccessoryComponent,
    AddAccessoryComponent,
    AccessoryOverviewComponent,
  ],
  imports: [
    CommonModule,
    AccessoryRoutingModule,
    TabViewModule,
    FilterModule,
    TableModule,
    SharedModule,
    
  ]
})
export class AccessoryModule { }
