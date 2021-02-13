import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY = 'business-category';

export interface BusinessCategoryStateModel {
  categoryName: string;
  statusItem: {
    status: string;
    statusColor: string;
  };
  description: string;
  assetType: string;
  subAsset: string;
  accessory: string;
}

export interface BusinessCategoryState
  extends EntityState<BusinessCategoryStateModel> {
  error?: any;
  loaded?: boolean;
  message?: string;
}

export interface BusinessCategoryPartialState {
  [CONFIGURATION_BUSINESS_CATEGORY_FEATURE_KEY]: BusinessCategoryState;
}

export const businessCategoryAdapter: EntityAdapter<BusinessCategoryStateModel> = createEntityAdapter<
  BusinessCategoryStateModel
>();

export const initialState: BusinessCategoryState = businessCategoryAdapter.getInitialState(
  {
    error: null,
    loaded: null,
    message: null
  } as BusinessCategoryState
);
