import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TollComponent } from './toll.component';
import {TollRoutingModule} from'./toll-routing.module';
import { TableModule } from '@core/table/table.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [TollComponent],
  imports: [
    CommonModule,
    TollRoutingModule,
    TableModule,
    FontAwesomeModule
  ]
})
export class TollModule { }
