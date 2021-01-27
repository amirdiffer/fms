import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { TableModule } from '@core/table';
import { AssetPolicyComponent } from './asset-policy/asset-policy.component';
import { TabViewModule } from '@core/tab-view';
import { PeriodicServiceComponent } from '@feature/configuration/periodic-service/periodic-service.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    PeriodicServiceComponent,
    AssetPolicyComponent,
    BusinessCategoryComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    TableModule,
    TabViewModule
  ]
})
export class ConfigurationModule { }
