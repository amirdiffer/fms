import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetRoutingModule } from "./fleet.routing.module";
import { TestComponent } from "./test.component";

@NgModule({
  imports: [
    CommonModule,
    FleetRoutingModule
  ],
  exports: [],
  declarations: [
    TestComponent
  ],
  providers: []
})
export class FleetModule { }
