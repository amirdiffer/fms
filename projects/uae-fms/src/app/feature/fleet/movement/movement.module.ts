import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementComponent } from './movement.component';
import { AddRequestComponent } from './add-request/add-request.component';
import { MovementTemporaryConfirmComponent } from './movement-temporary-confirm/movement-confirm.component';
import { MovementConfirmComponent } from './movement-confirm/movement-confirm.component';
import { IserveComponent } from './iserv/iserv.component';
import { TemporaryComponent } from './temporary/temporary.component';
import { AddTemporaryRequestComponent } from './add-temporary-request/add-temporary-request.component';
import { TabViewModule } from '@core/tab-view';
import { FilterModule } from '@core/filter';
import { TableModule } from '@core/table/table.module';
import { MovementRoutingModule } from './movement-routing.module';
import { SharedModule } from '@shared/shared.module';
import { PermanentOverviewStateModule } from '../+state/movement/permanent/overview/permanent-overview-state.module';
import { PermanentRequestStateModule } from '../+state/movement/permanent/requests/permanent-request-state.module';
import { TemporaryOverviewStateModule } from '../+state/movement/temporary/overview/temporary-overview-state.module';
import { TemporaryRequestStateModule } from '../+state/movement/temporary/requests/permanent-request-state.module';
import { OperatorStateModule } from '../+state/operator/operator-state.module';
import { OrganizationStateModule } from '../+state/organization/organization-state.module';

@NgModule({
  declarations: [
    MovementComponent,
    AddRequestComponent,
    MovementConfirmComponent,
    MovementTemporaryConfirmComponent,
    IserveComponent,
    TemporaryComponent,
    AddTemporaryRequestComponent
  ],
  imports: [
    CommonModule,
    MovementRoutingModule,
    TabViewModule,
    FilterModule,
    TableModule,
    SharedModule,
    PermanentOverviewStateModule,
    PermanentRequestStateModule,
    TemporaryOverviewStateModule,
    TemporaryRequestStateModule,
    OperatorStateModule,
    OrganizationStateModule
  ]
})
export class MovementModule {}
