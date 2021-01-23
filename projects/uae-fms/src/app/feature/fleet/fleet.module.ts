import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet.component';

@NgModule({
  declarations: [FleetComponent],
  imports: [CommonModule, FleetRoutingModule]
})
export class FleetModule {}
