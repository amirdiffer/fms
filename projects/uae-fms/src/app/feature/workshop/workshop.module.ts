import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from '@core/table';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';

import { WorkshopRoutingModule } from './workshop-routing.module';

import { WorkshopComponent } from './workshop.component';
import { TaskMasterComponent } from './task-master/task-master.component';
import { BodyShopComponent } from './body-shop/body-shop.component';
import { AuctionListComponent } from './inspections/auction-list/auction-list.component';
import { TechnicalInspectionComponent } from './inspections/technical-inspection/technical-inspection.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MakeDecisionComponent } from './inspections/technical-inspection/make-decision/make-decision.component';
import { MatRadioModule } from '@angular/material/radio';
import { AssetDetailComponent } from './inspections/technical-inspection/make-decision/asset-detail/asset-detail.component';
import { MaintenanceComponent } from './inspections/technical-inspection/make-decision/maintenance/maintenance.component';
import { CustomizationComponent } from './inspections/technical-inspection/make-decision/customization/customization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper'; 
import { MainComponent } from './inspections/technical-inspection/make-decision/main/main.component';
import { TechnicalInspectionStepComponent } from './inspections/technical-inspection/make-decision/technical-inspection/technical-inspection.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DetailDecisionComponent } from './inspections/technical-inspection/make-decision/detail-decision/detail-decision.component';

@NgModule({
  declarations: [
    WorkshopComponent,
    BodyShopComponent,
    AuctionListComponent,
    TechnicalInspectionComponent,
    TaskMasterComponent,
    MakeDecisionComponent,
    AssetDetailComponent,
    MaintenanceComponent,
    CustomizationComponent,
    MainComponent,
    TechnicalInspectionStepComponent,
    DetailDecisionComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    FilterModule,
    TabViewModule,
    WorkshopRoutingModule,
    AngularSvgIconModule,
    MatRadioModule,
    MatStepperModule,
    CdkStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatCheckboxModule,
    NgxFileDropModule
    
    
    
  ]
})
export class WorkshopModule {}
