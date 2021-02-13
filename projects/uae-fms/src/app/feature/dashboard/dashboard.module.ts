import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TableModule } from '@core/table/table.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AssetsStatusComponent } from './assets-status/assets-status.component';
import { ActiveAssetsComponent } from './active-assets/active-assets.component';
import { FactoryCategoryComponent } from './factory-category/factory-category.component';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { DashboardService } from './+state/dashboard.service';
import { DashboardFacade } from './+state/dashboard.facade';
import { Store, StoreModule } from '@ngrx/store';
import { Dashboard_FEATURE_KEY } from './+state/dashboard.entity';
import { reducer } from './+state/dashboard.reducer';
import { DashboardEffect } from './+state/dashboard.effects';

@NgModule({
  declarations: [
    SuppliersComponent,
    DashboardComponent,
    ProgressBarComponent,
    AssetsStatusComponent,
    ActiveAssetsComponent,
    FactoryCategoryComponent,
    BusinessCategoryComponent
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
    DashboardRoutingModule
  ],
  providers: [DashboardFacade, DashboardService]
})
export class DashboardModule {}
