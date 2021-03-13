import { Action, createReducer, on } from '@ngrx/store';
import {
  businessCategoryAdapter,
  BusinessCategoryState,
  initialState
} from './business-category.entity';
import { BusinessCategoryActions } from './business-category.actions';

const businessCategoryReducer = createReducer(
  initialState,
  on(BusinessCategoryActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(BusinessCategoryActions.allDataLoaded, (state, { data }) =>
    businessCategoryAdapter.setAll(data, {
      ...state,
      loaded: true,
      error: null
    })
  ),
  on(BusinessCategoryActions.addCategory, (state, { data }) => ({
    ...state,
    loaded: false
  })),
  on(BusinessCategoryActions.categoryAddedSuccessfully, (state, { data }) =>
    businessCategoryAdapter.addOne(data, state)
  ),
  on(BusinessCategoryActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  }))
);

export function reducer(state: BusinessCategoryState, action: Action) {
  return businessCategoryReducer(state, action);
}
