import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartStoreRoutingModule } from './part-store-routing.module';
import { PartStoreComponent } from './part-store.component';
import { PartListComponent } from './part-list/part-list.component';
import { FilterModule } from '@core/filter';
import { TableModule } from '@core/table';

@NgModule({
  declarations: [PartStoreComponent, PartListComponent],
  imports: [CommonModule, PartStoreRoutingModule, FilterModule, TableModule]
})
export class PartStoreModule {}
