import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterModule } from '@core/filter';
import { TableModule } from '@core/table';
import { SharedModule } from '@shared/shared.module';
import { OperatorRoutingModule } from './operator-routing.module';
import { OperatorOverviewTabComponent } from './over-view-operator/overview-tab/overview-tab.component';
import { OperatorComponent } from './operator.component';
import { AddOperatorComponent } from './add-operator/add-operator.component';
import { OverViewOperatorComponent } from './over-view-operator/over-view-operator.component';
import { TabViewModule } from '@core/tab-view';
import { OperatorStateModule } from '../+state/operator/operator-state.module';
import { OrganizationStateModule } from '../+state/organization/organization-state.module';
import { OperatorMovementStateModule } from '../+state/operator/movement-history-tab/operator-movement-state.module';
import { OperatorTrafficFineStateModule } from '../+state/operator/traffic-fine-tab/operator-traffic-fine-state.module';

@NgModule({
  declarations: [
    OperatorOverviewTabComponent,
    OperatorComponent,
    AddOperatorComponent,
    OverViewOperatorComponent
  ],
  imports: [
    CommonModule,
    OperatorRoutingModule,
    TabViewModule,
    FilterModule,
    TableModule,
    SharedModule,
    OperatorStateModule,
    OperatorMovementStateModule,
    OperatorTrafficFineStateModule,
    OrganizationStateModule
  ]
})
export class OperatorModule {}
