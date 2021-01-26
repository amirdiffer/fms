import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableUserRendererComponent } from './renderers/user';
import { TableModule as PrimengTableModule } from 'primeng/table';
import { TableVehicleRendererComponent } from './renderers/vehicle';
import { AssetsRendererComponent } from './renderers/assets';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SubtextRendererComponent } from './renderers/subText';
import { HTMLRendererComponent } from './renderers/opration';

@NgModule({
  imports: [PrimengTableModule, CommonModule , MatProgressBarModule,],
  exports: [TableComponent],
  declarations: [
    TableComponent,
    TableUserRendererComponent,
    TableVehicleRendererComponent,
    AssetsRendererComponent,
    SubtextRendererComponent,
    HTMLRendererComponent
  ],
  providers: []
})
export class TableModule {}
