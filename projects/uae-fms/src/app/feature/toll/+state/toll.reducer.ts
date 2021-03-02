import { Action, createReducer, on } from '@ngrx/store';
import { TollActions } from './toll.actions';
import { initialState, tollAdapter, TollState, TOLL_FEATURE_KEY } from './toll.entity';

const tollReducer = createReducer(
  initialState,
  on(TollActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    error: null,
    message: null
  })),
  on(TollActions.allDataLoaded, (state, { data }) =>
    tollAdapter.setAll(data, { ...state, loaded: true, error: null })
  ),
  on(TollActions.error, (state, { reason }) => ({
    ...state,
    error: reason,
    loaded: true
  })),
  on(TollActions.loadStatistic, (state) => ({
    ...state,
    loaded:false,
    statistic:null
  })),
  on(TollActions.statisticLoaded, (state, { data }) =>({
      ...state,
      statistic:data
    })
  ),
  on(TollActions.loadAssignNow, (state, { data }) => ({
    ...state,
    assignNow: null
  })),
  on(TollActions.assignNowLoaded, (state, { data }) => ({
    ...state,
    assignNow: data
  }))
);

export function reducer(state: TollState, action: Action) {
  return tollReducer(state, action);
}


export const reducers = {
  [TOLL_FEATURE_KEY]: reducer
}