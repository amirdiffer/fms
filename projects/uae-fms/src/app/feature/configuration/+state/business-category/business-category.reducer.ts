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
    ({ ...state, submitted: true })
  ),
  on(BusinessCategoryActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(BusinessCategoryActions.editCategory, (state, { category }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(
    BusinessCategoryActions.categoryEditedSuccessfully,
    (state, { category }) =>
      businessCategoryAdapter.updateOne(
        { changes: category, id: category.id },
        {
          ...state,
          error: null,
          message: null,
          submitted: true
        }
      )
  )
);

export function reducer(state: BusinessCategoryState, action: Action) {
  return businessCategoryReducer(state, action);
}
