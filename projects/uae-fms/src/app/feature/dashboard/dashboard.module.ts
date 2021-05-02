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
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RegularRadialProgressBarComponent } from './radial-progress-bar/regular-radial-progress-bar.component';
import { OperatorStatisticsComponent } from './operator-statistics/operator-statistics.component';
import { DetailCardDashboardComponent } from './asset-overview/detail-card-dashboard/detail-card-dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { DetailMiniCardDashboardComponent } from './asset-overview/detail-mini-card-dashboard/detail-mini-card-dashboard.component';
import { CardAlertDashboardComponent } from './card-alert-dashboard/card-alert-dashboard.component';
import { PieChartMiniComponent } from './radial-progress-bar/pie-char-mini.component';
import { OverviewCardDashboardComponent } from './asset-overview/overview-card-dashboard/overview-card-dashboard.component';
import { MovementOverviewComponent } from './movement-overview/movement-overview.component';
import { WorkShopOverviewComponent } from './work-shop-overview/work-shop-overview.component';
import { DepartmentComponent } from './department/department.component';
import { UsedAssetComponent } from './used-asset/used-asset.component';
import { JobCardComponent } from './work-shop-overview/job-card/job-card.component';
import { PerformanceComponent } from './work-shop-overview/performance/performance.component';
import { JobTypeComponent } from './work-shop-overview/job-type/job-type.component';
import { AssetOverviewComponent } from './asset-overview/asset-overview.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressBarComponent,
    RegularRadialProgressBarComponent,
    OperatorStatisticsComponent,
    DetailCardDashboardComponent,
    FilterComponent,
    DetailMiniCardDashboardComponent,
    CardAlertDashboardComponent,
    PieChartMiniComponent,
    OverviewCardDashboardComponent,
    MovementOverviewComponent,
    WorkShopOverviewComponent,
    DepartmentComponent,
    UsedAssetComponent,
    JobCardComponent,
    PerformanceComponent,
    JobTypeComponent,
    AssetOverviewComponent
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
    SharedModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule
  ],
  providers: [DashboardFacade, DashboardService]
})
export class DashboardModule {}
