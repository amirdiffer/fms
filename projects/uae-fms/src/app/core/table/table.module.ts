import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableUserRendererComponent } from './renderers/user';
import { TableModule as PrimengTableModule } from 'primeng/table';
import { TableVehicleRendererComponent } from './renderers/vehicle';
import { TableAssetRendererComponent } from '@core/table/renderers/asset';
import { TableDoubleLineRendererComponent } from '@core/table/renderers/double-line';
import { SubtextRendererComponent } from './renderers/subText';

@NgModule({
  imports: [PrimengTableModule, CommonModule],
  exports: [TableComponent],
  declarations: [
    TableComponent,
    TableUserRendererComponent,
    TableVehicleRendererComponent,
    TableAssetRendererComponent,
    TableDoubleLineRendererComponent,
    SubtextRendererComponent
  ],
  providers: []
})
export class TableModule {}
