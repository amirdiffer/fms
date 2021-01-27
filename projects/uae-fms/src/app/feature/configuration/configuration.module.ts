import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { BusinessCategoryComponent } from './business-category/business-category.component';
import { TableModule } from '@core/table';

@NgModule({
  declarations: [ConfigurationComponent, BusinessCategoryComponent],
  imports: [CommonModule, ConfigurationRoutingModule, TableModule]
})
export class ConfigurationModule {}
