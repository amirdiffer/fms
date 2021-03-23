import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IBusinessCategory } from '@models/business-category.model';

export const CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY = 'businessCategory';

// export interface BusinessCategoryStateModel {
//   categoryName: string;
//   statusItem: {
//     status: string;
//     statusColor: string;
//   };
//   description: string;
//   assetType: string;
//   subAsset: string;
//   accessory: string;
// }

export interface BusinessCategoryState extends EntityState<IBusinessCategory> {
  error?: any;
  loaded?: boolean;
  submitted: boolean;
  message?: string;
}

export interface BusinessCategoryPartialState {
  [CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY]: BusinessCategoryState;
}

export const businessCategoryAdapter: EntityAdapter<IBusinessCategory> = createEntityAdapter<
  IBusinessCategory
>();

export const initialState: BusinessCategoryState = businessCategoryAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null,
    submitted: false
  } as BusinessCategoryState
);
