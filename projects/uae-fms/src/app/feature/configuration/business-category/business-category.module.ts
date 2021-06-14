import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '@core/table';
import { BusinessCategoryComponent } from './business-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { FilterModule } from '@core/filter';
import { BusinessCategoryRoutingModule } from './business-category-routing.module';

@NgModule({
  declarations: [BusinessCategoryComponent, AddCategoryComponent],
  imports: [
    CommonModule,
    BusinessCategoryRoutingModule,
    SharedModule,
    TableModule,
    FilterModule
  ]
})
export class BusinessCategoryModule {}
