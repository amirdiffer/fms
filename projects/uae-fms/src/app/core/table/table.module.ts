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
import { TableCompanyRendererComponent } from '@core/table/renderers/company';
import { TableAssetRendererComponent } from '@core/table/renderers/asset';
import { TableDoubleLineRendererComponent } from '@core/table/renderers/double-line';
import { TableInformationRendererComponent } from './renderers/information';
import { TableStatusRendererComponent } from '@core/table/renderers/status';
import { TableButtonRendererComponent } from '@core/table/renderers/button';
import { TableThumbTextRendererComponent } from '@core/table/renderers/thumb-text';
import { TableBooleanRendererComponent } from './renderers/boolean';
import { TableExternalLinkRendererComponent } from '@core/table/renderers/external_link';
import { SharedModule } from '../../shared/shared.module';
import { TableActionButtonRendererComponent } from '@core/table/renderers/actionButton';
import { TableAddButtonRendererComponent } from '@core/table/renderers/addButton';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MakeDecisionRendererComponent } from './renderers/makeDecision';
import { JobCardRendererComponent } from './renderers/jobCard';
import { TableRouteLinkRendererComponent } from './renderers/routeLink';
import { RouterModule } from '@angular/router';
import { FuelCardRendererComponent } from './renderers/fuel-card';

@NgModule({
  imports: [
    PrimengTableModule,
    CommonModule,
    SharedModule,
    MatProgressBarModule,
    AngularSvgIconModule,
    RouterModule
  ],
  exports: [TableComponent],
  declarations: [
    TableComponent,
    TableUserRendererComponent,
    TableVehicleRendererComponent,
    AssetsRendererComponent,
    SubtextRendererComponent,
    HTMLRendererComponent,
    TableCompanyRendererComponent,
    TableAssetRendererComponent,
    AssetsRendererComponent,
    TableDoubleLineRendererComponent,
    SubtextRendererComponent,
    TableAddButtonRendererComponent,
    TableActionButtonRendererComponent,
    TableInformationRendererComponent,
    TableStatusRendererComponent,
    TableButtonRendererComponent,
    TableThumbTextRendererComponent,
    TableBooleanRendererComponent,
    TableExternalLinkRendererComponent,
    TableRouteLinkRendererComponent,
    MakeDecisionRendererComponent,
    JobCardRendererComponent,
    FuelCardRendererComponent
  ],
  providers: []
})
export class TableModule {}
