import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from '@core/table/table.module';
import { reducer } from './+state/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardEffect } from './+state/dashboard.effects';
import { Dashboard_FEATURE_KEY } from './+state/dashboard.entity';
import { DashboardService, DashboardFacade } from './+state/index';
import { ActiveAssetsComponent } from './active-assets/active-assets.component';
import { AssetsStatusComponent } from './assets-status/assets-status.component';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FactoryCategoryComponent } from './factory-category/factory-category.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { RadialProgressBarComponent } from './radial-progress-bar/radial-progress-bar.component';
import { WorkshopJobTypeComponent } from './workshop-job-type/workshop-job-type.component';
import { OperatorStatisticsComponent } from './operator-statistics/operator-statistics.component';
import { OperatorCongratulationsComponent } from './operator-congratulations/operator-congratulations.component';
import { OperatorWarningComponent } from './operator-warning/operator-warning.component';

@NgModule({
  declarations: [
    SuppliersComponent,
    DashboardComponent,
    ProgressBarComponent,
    AssetsStatusComponent,
    ActiveAssetsComponent,
    FactoryCategoryComponent,
    BusinessCategoryComponent,
    RadialProgressBarComponent,
    WorkshopJobTypeComponent,
    OperatorStatisticsComponent,
    OperatorCongratulationsComponent,
    OperatorWarningComponent
  ],
  exports: [ProgressBarComponent],
  imports: [
    StoreModule.forFeature(Dashboard_FEATURE_KEY, reducer),
    EffectsModule.forFeature([DashboardEffect]),
    TableModule,
    CommonModule,
    MatTableModule,
    NgApexchartsModule,
    AngularSvgIconModule,
    MatProgressBarModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [DashboardFacade, DashboardService]
})
export class DashboardModule {}
