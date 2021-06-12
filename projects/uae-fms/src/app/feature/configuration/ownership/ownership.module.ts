import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { OwnershipFormComponent } from './ownership-form/ownership-form.component';
import { OwnershipComponent } from './ownership.component';
import { OwnershipRoutingModule } from './ownership-routing.module';
import { OwnershipStateModule } from '../+state/ownership/ownership-state.module';



@NgModule({
  declarations: [
    OwnershipComponent,
    OwnershipFormComponent,
  ],
  imports: [
    CommonModule,
    OwnershipRoutingModule,
    SharedModule,
    TableModule,
    OwnershipStateModule
  ]
})
export class OwnershipModule { }
