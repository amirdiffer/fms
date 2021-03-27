import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IToll } from '@models/toll';
import { ITollStatistics } from '@models/statistics';
export const TOLL_FEATURE_KEY = 'toll';
export interface TollState extends EntityState<IToll> {
  error?: any;
  loaded?: boolean;
  message?: string;
  statistic? : ITollStatistics;
  assignNow?: object;
}

export interface TollPartialState {
  [TOLL_FEATURE_KEY]: TollState;
}

export const tollAdapter: EntityAdapter<IToll> = createEntityAdapter<IToll>();

export const initialState: TollState = tollAdapter.getInitialState({
  error: null,
  loaded: null,
  message: null,
  statistic:null,
  assignNow: null,
} as TollState);


