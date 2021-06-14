import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardModule } from '@feature/dashboard/dashboard.module';
import { SharedModule } from '@shared/shared.module';
import { PartOverviewComponent } from './part-overview/part-overview.component';
import { PartStoreRoutingModule } from './part-store-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { TableModule } from '@core/table';
import { AssetMasterStateModule } from '@feature/fleet/+state/assets/asset-master/asset-master-state.module';
import { ConfigurationStateModule } from '@feature/configuration/+state';

@NgModule({
  imports: [
    CommonModule,
    PartStoreRoutingModule,
    SharedModule,
    DashboardModule,
    CarouselModule,
    TableModule,
    AssetMasterStateModule,
    ConfigurationStateModule
  ],
  declarations: [PartOverviewComponent]
})
export class PartStoreModule {}
