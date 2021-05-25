import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from "./location.component";
import { AddLocationComponent } from "./add-location/add-location.component";
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from "@core/table";
import { AlertModule } from "@core/alert/alert.module";
import { AlertDialogModule } from "@core/alert-dialog/alert-dialog.module";
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { ErrorModule } from "@shared/error/error.module";
import { LocationRoutingModule } from "./location-routing.module";
import { WorkshopStateModule } from "../+state/workshop.state.module";
import {AutoCompleteModule} from 'primeng/autocomplete';



@NgModule({
  declarations: [
    LocationComponent,
    AddLocationComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    TableModule,
    AlertModule,
    AngularSvgIconModule,
    AlertDialogModule,
    FormsModule,
    ErrorModule,
    WorkshopStateModule,
    LocationRoutingModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ]
})
export class LocationModule { }
