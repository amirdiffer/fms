import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet.component';
import { AccessoryComponent } from './accessory/accessory.component';
import { OperatorComponent } from './operator/operator.component';
import { AssetsComponent } from './assets/assets.component';
import { FilterModule } from '@core/filter/filter.module';
import { TableModule } from '@core/table/table.module';
import { TabViewModule } from '@core/tab-view';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SubAssetComponent } from './sub-asset/sub-asset.component';
import { OrganizationComponent } from './organization/organization.component';
import { MovementComponent } from './movement/movement.component';
import { AddAccessoryComponent } from './accessory/add-accessory/add-accessory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    FleetComponent,
    OperatorComponent,
    OrganizationComponent,
    SubAssetComponent,
    AssetsComponent,
    AccessoryComponent,
    MovementComponent,
    AddAccessoryComponent
  ],
  imports: [
    CommonModule,
    FleetRoutingModule,
    FilterModule,
    TableModule,
    AngularSvgIconModule,
    TabViewModule,
    TabViewModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,

  ]
})
export class FleetModule {}
