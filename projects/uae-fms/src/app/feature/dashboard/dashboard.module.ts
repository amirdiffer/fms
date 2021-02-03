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
    TableModule,
    CommonModule,
    MatTableModule,
    NgApexchartsModule,
    AngularSvgIconModule,
    MatProgressBarModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
