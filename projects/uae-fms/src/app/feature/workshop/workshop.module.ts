import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from "@core/table";
import { FilterModule } from "@core/filter";
import { TabViewModule } from "@core/tab-view";

import { WorkshopRoutingModule } from './workshop-routing.module';

import { WorkshopComponent } from './workshop.component';
import { BodyShopComponent } from './body-shop/body-shop.component';
import { AuctionListComponent } from "./inspections/auction-list/auction-list.component";
import { TechnicalInspectionComponent } from "./inspections/technical-inspection/technical-inspection.component";


@NgModule({
  declarations: [
    WorkshopComponent,
    BodyShopComponent,
    AuctionListComponent,
    TechnicalInspectionComponent
  ],
  imports: [
    TableModule,
    CommonModule,
    FilterModule,
    TabViewModule,
    WorkshopRoutingModule
  ]
})
export class WorkshopModule { }
