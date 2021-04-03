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
import { TableThumbTextRendererComponent } from '@core/table/renderers/thumb-text';
import { TableBooleanRendererComponent } from './renderers/boolean';
import { TableExternalLinkRendererComponent } from '@core/table/renderers/external_link';
import { SharedModule } from '../../shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableRouteLinkRendererComponent } from './renderers/routeLink';
import { RouterModule } from '@angular/router';
import { FuelCardRendererComponent } from './renderers/fuel-card';
import { AssignNow } from '@core/table/renderers/assign-now';
import { TableGeneralButtonRendererComponent } from './renderers/general-button';
import { FloatButton } from './renderers/float-button'
import { ColorizeRendererComponent } from "./renderers/colorize";
import { StoreModule } from '@ngrx/store';
import { TABLE_FEATURE_KEY } from '@core/table/+state/table.entity';
import { reducer } from '@core/table/+state/table.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TableEffect } from '@core/table/+state/table.effect';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableService } from '@core/table/+state/table.service';

@NgModule({
  imports: [
    PrimengTableModule,
    CommonModule,
    SharedModule,
    MatProgressBarModule,
    AngularSvgIconModule,
    RouterModule,
    StoreModule.forFeature(TABLE_FEATURE_KEY, reducer),
    EffectsModule.forFeature([TableEffect])
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
    TableGeneralButtonRendererComponent,
    TableInformationRendererComponent,
    TableStatusRendererComponent,
    TableThumbTextRendererComponent,
    TableBooleanRendererComponent,
    TableExternalLinkRendererComponent,
    TableRouteLinkRendererComponent,
    FuelCardRendererComponent,
    AssignNow,
    FloatButton,
    ColorizeRendererComponent
  ],
  providers: [
    TableFacade,
    TableService
  ]
})
export class TableModule {}
