import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterModule } from '@core/filter';
import { TabViewModule } from '@core/tab-view';
import { TableModule } from '@core/table';
import { SharedModule } from '@shared/shared.module';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { InspectionsRoutingModule } from './inspections-routing.module';
import { TechnicalInspectionComponent } from './technical-inspection/technical-inspection.component';
import { TechnicalOverviewComponent } from './technical-inspection/technical-overview/technical-overview.component';

@NgModule({
  declarations: [
    AuctionListComponent,
    TechnicalInspectionComponent,
    TechnicalOverviewComponent
  ],
  imports: [
    CommonModule,
    InspectionsRoutingModule,
    SharedModule,
    TableModule,
    MatCheckboxModule,
    TabViewModule,
    FilterModule
  ]
})
export class InspectionsModule {}
