import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from '@core/table/table.module';
import { FilterModule } from '@core/filter/filter.module';

import { TollComponent } from './toll.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TollRoutingModule } from './toll-routing.module';
import { AddTollComponent } from './add-toll/add-toll.component';
import { DashboardModule } from '@feature/dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { TOLL_FEATURE_KEY } from './+state/toll.entity';
import { reducer } from './+state/toll.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TollEffect } from './+state/toll.effect';
import { TollFacade, TollService } from './+state/index';
import { SharedModule } from '@shared/shared.module';

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
