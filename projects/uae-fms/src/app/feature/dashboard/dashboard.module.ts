import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

// Component
import { DashboardComponent } from './dashboard.component';
import { AssetsStatusComponent } from './assets-status/assets-status.component';
import { ActiveAssetsComponent } from './active-assets/active-assets.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { FactoryCategoryComponent } from './factory-category/factory-category.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableModule } from '@core/table/table.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
    DashboardComponent,
    AssetsStatusComponent,
    ActiveAssetsComponent,
    SuppliersComponent,
    BusinessCategoryComponent,
    FactoryCategoryComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatProgressBarModule,
    MatTableModule,
    NgApexchartsModule,
    TableModule,
    AngularSvgIconModule
  ]
})
export class DashboardModule {}
