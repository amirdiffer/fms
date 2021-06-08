import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from '@core/table';
import { AlertModule } from '@core/alert/alert.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from '@shared/error/error.module';
import { LocationRoutingModule } from './location-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LocationComponent, AddLocationComponent],
  imports: [
    TranslateModule,
    CommonModule,
    TableModule,
    AlertModule,
    FormsModule,
    ErrorModule,
    LocationRoutingModule,
    AutoCompleteModule,
    SharedModule
  ]
})
export class LocationModule {}
