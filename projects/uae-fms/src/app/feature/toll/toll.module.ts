import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterModule } from '@core/filter/filter.module';
import { TableModule } from '@core/table/table.module';
import { DashboardModule } from '@feature/dashboard/dashboard.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { TollFacade, TollService } from './+state/index';
import { TollEffect } from './+state/toll.effect';
import { TOLL_FEATURE_KEY } from './+state/toll.entity';
import { reducer } from './+state/toll.reducer';
import { AddTollComponent } from './add-toll/add-toll.component';
import { TollRoutingModule } from './toll-routing.module';
import { TollComponent } from './toll.component';

@NgModule({
  declarations: [TollComponent, AddTollComponent],
  imports: [
    TableModule,
    FilterModule,
    SharedModule,
    CommonModule,
    TollRoutingModule,
    DashboardModule,
    StoreModule.forFeature(TOLL_FEATURE_KEY, reducer),
    EffectsModule.forFeature([TollEffect])
  ],
  providers: [TollService, TollFacade]
})
export class TollModule {}
