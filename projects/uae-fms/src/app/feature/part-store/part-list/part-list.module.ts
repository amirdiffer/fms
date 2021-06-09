import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartListComponent } from './part-list.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';
import { TableModule } from '@core/table';
import { SharedModule } from '@shared/shared.module';
import { PartListRoutingModule } from './part-list-routing.module';

@NgModule({
  declarations: [PartListComponent, UpdateFormComponent],
  imports: [
    CommonModule,
    PartListRoutingModule,
    FilterModule,
    TabViewModule,
    TableModule,
    SharedModule
  ]
})
export class PartListModule {}
