import { Action, createReducer, on } from '@ngrx/store';
import { ServiceShopJobCardActions } from './service-shop-job-card.actions';
import { IServiceShopJobCardState, serviceshopJobCardAdapter,initialState } from './service-shop-job-card.entity';

const serviceShopJobCardReducer = createReducer(
  initialState,
  on(ServiceShopJobCardActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(ServiceShopJobCardActions.allDataLoaded, (state, { data }) =>
  serviceshopJobCardAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(ServiceShopJobCardActions.addJobCard, (state, { data: IJobCard }) => ({
    ...state,
    submitted: false
  })),
  on(ServiceShopJobCardActions.jobCardAddedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })),
  on(ServiceShopJobCardActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(ServiceShopJobCardActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(ServiceShopJobCardActions.editJobCard, (state, { jobCard }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(ServiceShopJobCardActions.jobCardEditedSuccessfully, (state, { jobCard }) =>
    serviceshopJobCardAdapter.updateOne(
      { changes: jobCard, id: jobCard.id },
      {
        ...state,
        error: null,
        message: null,
        submitted: true
      }
    )
  )
);

export function reducer(state: IServiceShopJobCardState, action: Action) {
  return serviceShopJobCardReducer(state, action);
}
