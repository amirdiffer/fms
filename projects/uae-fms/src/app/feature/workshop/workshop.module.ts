import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopComponent } from './workshop.component';

@NgModule({
  declarations: [WorkshopComponent],
  imports: [CommonModule, WorkshopRoutingModule]
})
export class WorkshopModule {}
