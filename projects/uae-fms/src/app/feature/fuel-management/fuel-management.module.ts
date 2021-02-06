import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuelManagementComponent } from '@feature/fuel-management/fuel-management.component';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';
import { FuelRoutingModule } from '@feature/fuel-management/fuel-routing.module';
import { FuelCardTableComponent } from '@feature/fuel-management/fuel-card-table/fuel-card-table.component';
import { AssetUsageTableComponent } from '@feature/fuel-management/asset-usage-table/asset-usage-table.component';
import { AddFuelCardComponent } from './add-fuel-card/add-fuel-card.component';
import { TableModule } from '@core/table/table.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    FuelManagementComponent,
    FuelCardTableComponent,
    AssetUsageTableComponent,
    AddFuelCardComponent
  ],
  imports: [
    CommonModule,
    FuelRoutingModule,
    FilterModule,
    TabViewModule,
    TableModule,
    AutoCompleteModule,
    DropdownModule,
    InputTextModule,
    CalendarModule
  ],
  exports: [FuelManagementComponent]
})
export class FuelManagementModule {}
