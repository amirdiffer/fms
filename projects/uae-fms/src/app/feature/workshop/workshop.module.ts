import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopComponent } from './workshop.component';
import { BodyShopComponent } from './body-shop/body-shop.component';

import { TableModule } from "@core/table";
import { FilterModule } from "@core/filter";
import { TabViewModule } from "@core/tab-view";

@NgModule({
  declarations: [
    WorkshopComponent,
    BodyShopComponent
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
