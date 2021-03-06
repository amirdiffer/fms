import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableUserRendererComponent } from './column-renderer-component/column-renderers/user';
import { TableModule as PrimengTableModule } from 'primeng/table';
import { TableVehicleRendererComponent } from './column-renderer-component/column-renderers/vehicle';
import { AssetsRendererComponent } from './column-renderer-component/column-renderers/assets';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SubtextRendererComponent } from './column-renderer-component/column-renderers/subText';
import { HTMLRendererComponent } from './column-renderer-component/column-renderers/opration';
import { TableCompanyRendererComponent } from '@core/table/column-renderer-component/column-renderers/company';
import { TableAssetRendererComponent } from '@core/table/column-renderer-component/column-renderers/asset';
import { TableDoubleLineRendererComponent } from '@core/table/column-renderer-component/column-renderers/double-line';
import { TableInformationRendererComponent } from './column-renderer-component/column-renderers/information';
import { TableStatusRendererComponent } from '@core/table/column-renderer-component/column-renderers/status';
import { TableThumbTextRendererComponent } from '@core/table/column-renderer-component/column-renderers/thumb-text';
import { TableBooleanRendererComponent } from './column-renderer-component/column-renderers/boolean';
import { TableExternalLinkRendererComponent } from '@core/table/column-renderer-component/column-renderers/external_link';
import { SharedModule } from '../../shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableRouteLinkRendererComponent } from './column-renderer-component/column-renderers/routeLink';
import { RouterModule } from '@angular/router';
import { FuelCardRendererComponent } from './column-renderer-component/column-renderers/fuel-card';
import { AssignNow } from '@core/table/column-renderer-component/column-renderers/assign-now';
import { TableGeneralButtonRendererComponent } from './column-renderer-component/column-renderers/general-button';
import { StoreModule } from '@ngrx/store';
import { TABLE_FEATURE_KEY } from '@core/table/+state/table.entity';
import { reducer } from '@core/table/+state/table.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TableEffect } from '@core/table/+state/table.effect';
import { TableFacade } from '@core/table/+state/table.facade';
import { TableService } from '@core/table/+state/table.service';
import { FloatButton } from './column-renderer-component/column-renderers/float-button';
import { ColorizeRendererComponent } from './column-renderer-component/column-renderers/colorize';
import { AssetConfigurationTrimColorRendererComponent } from '@core/table/column-renderer-component/column-renderers/asset-configuration-trim-color-renderer.component';
import { CheckboxRendererComponent } from '@core/table/column-renderer-component/column-renderers/checkbox-renderer';
import { DownloadButtonRendererComponent } from '@core/table/column-renderer-component/column-renderers/download-button-renderer';
import { TooltipModule } from 'primeng/tooltip';
import { PriorityRendererComponent } from './column-renderer-component/column-renderers/priority';
import { TableServiceS } from '@core/table/table.service';
import { RadialBarRendererComponent } from './column-renderer-component/column-renderers/radialBar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ToggleRenderer } from '@core/table/column-renderer-component/column-renderers/toggle';
import { DropdownRenderer } from '@core/table/column-renderer-component/column-renderers/dropdown';
import { LowOpacityColumnRendererComponent } from '@core/table/column-renderer-component/column-renderers/lowOpacityColumnRenderer';
import { ReceivedButtonRendererComponent } from '@core/table/column-renderer-component/column-renderers/ReceivedButtonRenderer';
import { ApproveButtonRendererComponent } from '@core/table/column-renderer-component/column-renderers/ApproveButtonRenderer';
import { DateRenderer } from '@core/table/column-renderer-component/column-renderers/date';
import { ProgressRendererComponent } from './column-renderer-component/column-renderers/ProgressRenderer';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { ColumnRendererComponent } from './column-renderer-component/column-renderer.component';
import {
  CollapseRowRendererComponent,
  RowRendererComponentComponent
} from './row-renderer-component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PlusMinusRenderer } from './column-renderer-component/column-renderers/plus-minus-renderer';
import { FoldableRowRenderer } from './row-renderer-component/row-renderers/foldable-row-renderer.component';
import {
  AssetTypeFacade,
  AssetTypeService
} from '@feature/configuration/+state/fleet-configuration/asset-type';
import { SubAssetTypeService } from '@feature/configuration/+state/fleet-configuration/sub-asset-type';
import { OperatorService } from '@feature/fleet/+state/operator';
import { OrganizationService } from '@feature/fleet/+state/organization';
import { BusinessCategoryService } from '@feature/configuration/+state/business-category';
import { RolePermissionService } from '@feature/configuration/+state/role-permission';
import { SubAssetService } from '@feature/fleet/+state/sub-asset';
import { AssetSearchThroughService } from '@feature/fleet/+state/assets/search-through';
import { UsersService } from '@feature/configuration/+state/users';
import {
  BodyShopLocationService,
  ServiceShopLocationService
} from '@feature/workshop/+state';

@NgModule({
  imports: [
    PrimengTableModule,
    CommonModule,
    SharedModule,
    MatProgressBarModule,
    AngularSvgIconModule,
    RouterModule,
    StoreModule.forFeature(TABLE_FEATURE_KEY, reducer),
    EffectsModule.forFeature([TableEffect]),
    TooltipModule,
    NgApexchartsModule,
    AngularSvgIconModule,
    NgCircleProgressModule
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
    ColorizeRendererComponent,
    AssetConfigurationTrimColorRendererComponent,
    CheckboxRendererComponent,
    DownloadButtonRendererComponent,
    PriorityRendererComponent,
    RadialBarRendererComponent,
    ToggleRenderer,
    DropdownRenderer,
    RadialBarRendererComponent,
    LowOpacityColumnRendererComponent,
    ReceivedButtonRendererComponent,
    ApproveButtonRendererComponent,
    DateRenderer,
    ProgressRendererComponent,
    TableFilterComponent,
    ColumnRendererComponent,
    CollapseRowRendererComponent,
    RowRendererComponentComponent,
    PlusMinusRenderer,
    FoldableRowRenderer
  ],
  providers: [
    TableFacade,
    TableService,
    TableServiceS,
    SubAssetTypeService,
    AssetTypeService,
    OrganizationService,
    OperatorService,
    BusinessCategoryService,
    RolePermissionService,
    SubAssetService,
    AssetSearchThroughService,
    UsersService,
    BodyShopLocationService,
    ServiceShopLocationService
  ]
})
export class TableModule {}
