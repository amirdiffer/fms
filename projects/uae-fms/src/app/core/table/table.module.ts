import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableUserRendererComponent } from './renderers/user';
import { TableModule as PrimengTableModule } from 'primeng/table';
import { TableVehicleRendererComponent } from './renderers/vehicle';
import { TableAssetRendererComponent } from '@core/table/renderers/asset';
import { TableDoubleLineRendererComponent } from '@core/table/renderers/double-line';
import { SubtextRendererComponent } from './renderers/subText';
import { TableInformationRendererComponent } from './renderers/information';
import { TableBooleanRendererComponent } from './renderers/boolean';
import { TableExternalLinkRendererComponent } from '@core/table/renderers/external_link';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [PrimengTableModule, CommonModule, FontAwesomeModule],
  exports: [TableComponent],
  declarations: [
    TableComponent,
    TableUserRendererComponent,
    TableVehicleRendererComponent,
    TableAssetRendererComponent,
    TableDoubleLineRendererComponent,
    SubtextRendererComponent,
    TableInformationRendererComponent,
    TableBooleanRendererComponent,
    TableExternalLinkRendererComponent
  ],
  providers: []
})
export class TableModule {}
