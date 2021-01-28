import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableUserRendererComponent } from './renderers/user';
import { TableModule as PrimengTableModule } from 'primeng/table';
import { TableVehicleRendererComponent } from './renderers/vehicle';
import { AssetsRendererComponent } from './renderers/assets';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TableCompanyRendererComponent } from '@core/table/renderers/company';
import { TableAssetRendererComponent } from '@core/table/renderers/asset';
import { TableDoubleLineRendererComponent } from '@core/table/renderers/double-line';
import { SubtextRendererComponent } from './renderers/subText';
import { TableInformationRendererComponent } from './renderers/information';
import { TableThumbTextRendererComponent } from '@core/table/renderers/thumb-text';
import { TableBooleanRendererComponent } from './renderers/boolean';
import { TableExternalLinkRendererComponent } from '@core/table/renderers/external_link';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    PrimengTableModule,
    CommonModule,
    MatProgressBarModule,
    FontAwesomeModule
  ],
  exports: [TableComponent],
  declarations: [
    TableComponent,
    TableUserRendererComponent,
    TableVehicleRendererComponent,
    TableCompanyRendererComponent,
    TableAssetRendererComponent,
    AssetsRendererComponent,
    TableDoubleLineRendererComponent,
    SubtextRendererComponent,
    TableInformationRendererComponent,
    TableThumbTextRendererComponent,
    TableBooleanRendererComponent,
    TableExternalLinkRendererComponent
  ],
  providers: []
})
export class TableModule {}
