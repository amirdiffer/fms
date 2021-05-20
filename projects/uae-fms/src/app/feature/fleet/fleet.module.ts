import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';

import { GMapModule } from 'primeng/gmap';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProgressBarModule } from 'primeng/progressbar';

import { FleetRoutingModule } from './fleet-routing.module';

import { DashboardModule } from '../dashboard/dashboard.module';
import { OperatorComponent } from './operator/operator.component';
import { MovementComponent } from './movement/movement.component';
import { SubAssetComponent } from './sub-asset/sub-asset.component';
import { AccessoryComponent } from './accessory/accessory.component';
import { OrganizationComponent } from './organization/organization.component';
import { AddRequestComponent } from './movement/add-request/add-request.component';
import { AddSubAssetComponent } from './sub-asset/add-sub-asset/add-sub-asset.component';
import { AddAccessoryComponent } from './accessory/add-accessory/add-accessory.component';
import { MovementConfirmComponent } from './movement/movement-confirm/movement-confirm.component';
import { AddOrganizationComponent } from './organization/add-organization/add-organization.component';
import { AssetsComponent, AddAssetComponent, OverViewAssetComponent, VehicleOverviewComponent, BusinessCategoryComponent, RequestComponent } from './assets';

import { SharedModule } from '@shared/shared.module';
import { FilterModule } from '@core/filter/filter.module';
import { TableModule } from '@core/table/table.module';
import { TabViewModule } from '@core/tab-view';
import { AddOperatorComponent } from '@feature/fleet/operator/add-operator/add-operator.component';
import { ChartsModule } from '@core/charts';

import { FleetStateModule } from './+state';
import { PendingRegistrationOverviewComponent } from './assets/pending-registration-overview/pending-registration-overview.component';
import { AssetCarDetailComponent } from './assets/asset-detail/asset-car-detail.component';
import { PendingCustomizationOverviewComponent } from './assets/pending-customization-overview/pending-customization-overview.component';
import { AssetRegistrationConfirmComponent } from './assets/asset-registration-confirm/asset-registration-confirm.component';
import { MapModule } from '@core/map-view';
import { OverViewOperatorComponent } from './operator/over-view-operator/over-view-operator.component';
import { IserveComponent } from './movement/iserv/iserv.component';
import { TemporaryComponent } from '../fleet/movement/temporary/temporary.component';
import { AddTemporaryRequestComponent } from '@feature/fleet/movement/add-temporary-request/add-temporary-request.component';
import { AlertDialogModule } from '@core/alert-dialog/alert-dialog.module';
import { MovementTemporaryConfirmComponent } from '@feature/fleet/movement/movement-temporary-confirm/movement-confirm.component';
import { AccessoryOverviewComponent } from './accessory/accessory-overview/accessory-overview.component';

import { TranslateModule } from "@ngx-translate/core";
import { ReminderComponent } from '@feature/fleet/assets/overview-asset/infoComponents/reminder/reminder.component';
import { WarrantyComponent } from './assets/overview-asset/infoComponents/warranty/warranty.component';
import { MovementHistoryComponent } from './assets/overview-asset/infoComponents/movement-history/movement-history.component';
import { MaintenanceServiceComponent } from './assets/overview-asset/infoComponents/maintenance-service/maintenance-service.component';
import { DepartmentOverviewComponent } from './organization/department-overview/department-overview.component';
import { OverviewTabComponent } from './organization/department-overview/overview-tab/overview-tab.component';
import { SubAssetOverviewComponent } from './sub-asset/sub-asset-overview/sub-asset-overview.component';
import { SubAssetDetailComponent } from './sub-asset/sub-asset-overview/sub-asset-detail/sub-asset-detail.component';
import { ReminderModule } from './sub-asset/sub-asset-overview/reminder/reminder.module';
import { HistoryModule } from './sub-asset/sub-asset-overview/history/history.module';
import { OperatorOverviewTabComponent } from './operator/over-view-operator/overview-tab/overview-tab.component';

@NgModule({
  declarations: [
    AssetsComponent,
    OperatorComponent,
    SubAssetComponent,
    MovementComponent,
    AccessoryComponent,
    AddAccessoryComponent,
    AddSubAssetComponent,
    AccessoryOverviewComponent,
    AddOrganizationComponent,
    MovementConfirmComponent,
    MovementTemporaryConfirmComponent,
    OrganizationComponent,
    AddAssetComponent,
    AddOperatorComponent,
    AddRequestComponent,
    PendingRegistrationOverviewComponent,
    AssetCarDetailComponent,
    PendingCustomizationOverviewComponent,
    AssetRegistrationConfirmComponent,
    IserveComponent,
    OverViewAssetComponent,
    VehicleOverviewComponent,
    BusinessCategoryComponent,
    RequestComponent,
    OverViewOperatorComponent,
    TemporaryComponent,
    AddTemporaryRequestComponent,
    ReminderComponent,
    WarrantyComponent,
    MovementHistoryComponent,
    MaintenanceServiceComponent,
    DepartmentOverviewComponent,
    OverviewTabComponent,
    SubAssetOverviewComponent,
    SubAssetDetailComponent,
    OperatorOverviewTabComponent
  ],
  imports: [
    TranslateModule,
    AngularSvgIconModule,
    FleetRoutingModule,
    TabViewModule,
    CommonModule,
    FilterModule,
    TableModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    DashboardModule,
    MatStepperModule,
    CdkStepperModule,
    SharedModule,
    FleetStateModule,
    GMapModule,
    CardModule,
    ButtonModule,
    ProgressBarModule,
    NgApexchartsModule,
    ChartsModule,
    MapModule,
    AlertDialogModule,
    ReminderModule,
    HistoryModule
  ],
  exports: [
    AssetCarDetailComponent
  ]
})
export class FleetModule { }
