import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuelManagementComponent } from '@feature/fuel-management/fuel-management.component';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';
import { FuelRoutingModule } from '@feature/fuel-management/fuel-routing.module';
import { FuelCardTableComponent } from '@feature/fuel-management/fuel-card-table/fuel-card-table.component';
import { AssetUsageTableComponent } from '@feature/fuel-management/asset-usage-table/asset-usage-table.component';

@NgModule({
  declarations: [
    FuelManagementComponent,
    FuelCardTableComponent,
    AssetUsageTableComponent
  ],
  imports: [CommonModule, FuelRoutingModule, FilterModule, TabViewModule],
  exports: [FuelManagementComponent]
})
export class FuelManagementModule {}
