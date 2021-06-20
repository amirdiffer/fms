import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BusinessCategoryEffect } from './business-category.effect';
import { CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY } from './business-category.entity';
import * as businessCategoryReducer from './business-category.reducer';
import { BusinessCategoryFacade, BusinessCategoryService } from './index';

@NgModule({
  imports: [
    StoreModule.forFeature(CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY, businessCategoryReducer.reducer),
    EffectsModule.forFeature([BusinessCategoryEffect])
  ],
  providers: [
    BusinessCategoryService,
    BusinessCategoryFacade
  ]
})

export class BusinessCategoryStateModule {
}
