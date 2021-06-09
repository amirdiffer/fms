import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsComponent } from './assets.component';
import { AddAssetComponent } from './add-asset/add-asset.component';
import { PendingRegistrationOverviewComponent } from './pending-registration-overview/pending-registration-overview.component';
import { AssetRegistrationConfirmComponent } from './asset-registration-confirm/asset-registration-confirm.component';
import { PendingCustomizationOverviewComponent } from './pending-customization-overview/pending-customization-overview.component';
import { OverViewAssetComponent } from './overview-asset/overview-asset.component';
import { WarrantyComponent } from './overview-asset/infoComponents/warranty/warranty.component';
import { MovementHistoryComponent } from './overview-asset/infoComponents/movement-history/movement-history.component';
import { MaintenanceServiceComponent } from './overview-asset/infoComponents/maintenance-service/maintenance-service.component';
import { VehicleOverviewComponent } from './overview-asset/infoComponents/vehicle-overview/vehicle-overview.component';
import { BusinessCategoryComponent } from './overview-asset/infoComponents/business-category/business-category.component';
import { RequestComponent } from './overview-asset/infoComponents/request/request.component';
import { SharedModule } from '@shared/shared.module';
import { FilterModule } from '@core/filter';
import { TableModule } from '@core/table';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { TabViewModule } from '@core/tab-view';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { AssetCarDetailComponent } from './asset-detail/asset-car-detail.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BodyShopJobCardService, BodyShopRequestService } from '@feature/workshop/+state/body-shop';
import { ReminderComponent } from './overview-asset/infoComponents/reminder/reminder.component';


@NgModule({
  declarations: [
    AssetsComponent,
    AddAssetComponent,
    PendingRegistrationOverviewComponent,
    PendingCustomizationOverviewComponent,
    AssetRegistrationConfirmComponent,
    OverViewAssetComponent,
    WarrantyComponent,
    MovementHistoryComponent,
    MaintenanceServiceComponent,
    VehicleOverviewComponent,
    BusinessCategoryComponent,
    RequestComponent,
    AssetCarDetailComponent,
    ReminderComponent
    
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    FilterModule,
    TableModule,
    SharedModule,
    MatStepperModule,
    CdkStepperModule,
    TabViewModule,
    NgApexchartsModule,
    ChartsModule,
    AngularSvgIconModule,

  ],
  exports: [AssetCarDetailComponent],
  providers: [BodyShopJobCardService, BodyShopRequestService]

})
export class AssetsModule { }
