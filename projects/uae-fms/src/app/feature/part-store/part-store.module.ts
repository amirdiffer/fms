import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartStoreRoutingModule } from './part-store-routing.module';
import { PartStoreComponent } from './part-store.component';

@NgModule({
  declarations: [PartStoreComponent],
  imports: [CommonModule, PartStoreRoutingModule]
})
export class PartStoreModule {}
