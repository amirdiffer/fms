import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuelManagementComponent } from '@feature/fuel-management/fuel-management.component';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';
import { FuelRoutingModule } from '@feature/fuel-management/fuel-routing.module';
import { AddFuelCardComponent } from './add-fuel-card/add-fuel-card.component';
import { TableModule } from '@core/table/table.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FuelManagementStateModule } from '@feature/fuel-management/+state';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    FuelManagementComponent,
    AddFuelCardComponent
  ],
  imports: [
    CommonModule,
    FuelRoutingModule,
    SharedModule,
    FilterModule,
    TabViewModule,
    TableModule,
    AutoCompleteModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    FuelManagementStateModule
  ],
  exports: [FuelManagementComponent]
})
export class FuelManagementModule {}
