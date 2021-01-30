import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuelManagementComponent } from '@feature/fuel-management/fuel-management.component';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';
import { FuelRoutingModule } from '@feature/fuel-management/fuel-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FuelCardTableComponent } from '@feature/fuel-management/fuel-card-table/fuel-card-table.component';
import { AssetUsageTableComponent } from '@feature/fuel-management/asset-usage-table/asset-usage-table.component';

@NgModule({
  declarations: [
    FuelManagementComponent,
    FuelCardTableComponent,
    AssetUsageTableComponent
  ],
  imports: [
    CommonModule,
    FuelRoutingModule,
    FilterModule,
    TabViewModule,
    FontAwesomeModule
  ],
  exports: [FuelManagementComponent]
})
export class FuelManagementModule {}
