import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableModule as PrimengTableModule } from 'primeng/table';
import { TableUserRendererComponent } from "./renderers/user";
import { TableVehicleRendererComponent } from "./renderers/vehicle";

@NgModule({
  imports: [PrimengTableModule, CommonModule],
  exports: [TableComponent],
  declarations: [TableComponent, TableUserRendererComponent, TableVehicleRendererComponent],
  providers: []
})
export class TableModule { }
