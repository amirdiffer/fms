import { Action, createReducer, on } from '@ngrx/store';
import { BodyShopJobCardActions } from './body-shop-job-card.actions';
import {
  bodyShopJobCardAdapter,
  initialState,
  IBodyshopJobCardState
} from './body-shop-job-card.entity';

const bodyShopJobCardReducer = createReducer(
  initialState,
  on(BodyShopJobCardActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(BodyShopJobCardActions.allDataLoaded, (state, { data }) =>
    bodyShopJobCardAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(BodyShopJobCardActions.addJobCard, (state, { data: IJobCard }) => ({
    ...state,
    submitted: false
  })),
  on(BodyShopJobCardActions.jobCardAddedSuccessfully, (state, { data }) => ({
    ...state,
    error: null,
    message: null,
    submitted: true
  })),
  on(BodyShopJobCardActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(BodyShopJobCardActions.resetParams, (state) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(BodyShopJobCardActions.editJobCard, (state, { jobCard }) => ({
    ...state,
    error: null,
    message: null,
    submitted: false
  })),
  on(BodyShopJobCardActions.jobCardEditedSuccessfully, (state, { jobCard }) =>
    bodyShopJobCardAdapter.updateOne(
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

export function reducer(state: IBodyshopJobCardState, action: Action) {
  return bodyShopJobCardReducer(state, action);
}
