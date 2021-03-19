import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxFileDropModule } from 'ngx-file-drop';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TableModule } from '@core/table';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';

import { WorkshopRoutingModule } from './workshop-routing.module';

import { TaskMasterComponent } from './task-master/task-master.component';
import { BodyShopComponent } from './body-shop/body-shop.component';
import { ServiceShopComponent } from './service-shop/service-shop.component';
import { AuctionListComponent } from './inspections/auction-list/auction-list.component';
import { TechnicalInspectionComponent } from './inspections/technical-inspection/technical-inspection.component';
import { MakeDecisionComponent } from './inspections/technical-inspection/make-decision/make-decision.component';
import { AssetDetailComponent } from './inspections/technical-inspection/make-decision/asset-detail/asset-detail.component';
import { MaintenanceComponent } from './inspections/technical-inspection/make-decision/maintenance/maintenance.component';
import { CustomizationComponent } from './inspections/technical-inspection/make-decision/customization/customization.component';
import { DashboardModule } from '@feature/dashboard/dashboard.module';

import { MainComponent } from './inspections/technical-inspection/make-decision/main/main.component';
import { TechnicalInspectionStepComponent } from './inspections/technical-inspection/make-decision/technical-inspection/technical-inspection.component';

import { DetailDecisionComponent } from './inspections/technical-inspection/make-decision/detail-decision/detail-decision.component';
import { AddRequestComponent } from './body-shop/add-request/add-request.component';
import { AddTechnicianComponent } from './body-shop/add-technician/add-technician.component';
import { AddLocationComponent } from './body-shop/add-location/add-location.component';
import { ServiceShopAddRequestComponent } from './service-shop/add-request/add-request.component';
import { ServiceShopAddTechnicianComponent } from './service-shop/add-technician/add-technician.component';
import { ServiceShopAddLocationComponent } from './service-shop/add-location/add-location.component';
import { TaskMasterFormComponent } from './task-master-form/task-master-form.component';
import { WorkshopStateModule } from './+state';

@NgModule({
  declarations: [
    MainComponent,
    BodyShopComponent,
    TaskMasterComponent,
    AuctionListComponent,
    MakeDecisionComponent,
    AssetDetailComponent,
    MaintenanceComponent,
    CustomizationComponent,
    TechnicalInspectionComponent,
    TechnicalInspectionStepComponent,
    DetailDecisionComponent,
    AddTechnicianComponent,
    AddRequestComponent,
    AddLocationComponent,
    TaskMasterFormComponent,
    ServiceShopComponent,
    ServiceShopAddRequestComponent,
    ServiceShopAddTechnicianComponent,
    ServiceShopAddLocationComponent
  ],
  imports: [
    FormsModule,
    TableModule,
    CommonModule,
    FilterModule,
    TabViewModule,
    CdkStepperModule,
    AngularSvgIconModule,
    WorkshopRoutingModule,
    ReactiveFormsModule,
    WorkshopStateModule,
    NgxFileDropModule,
    DashboardModule,
    SharedModule,
    RouterModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatStepperModule,
    MatRadioModule
  ]
})
export class WorkshopModule {}
