import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const PARTSTORE_REQUEST_LIST_FEATURE_KEY = 'RequestList';

export interface RequestListState extends EntityState<any> {
  error?: any;
  loaded?: boolean;
  message?: string;
  statistics?:any;
  specificRequest?:any;
  submitted?:boolean;
  approved?:boolean;
  rejected?:boolean;
}

export interface IRequestListPartialState {
  [PARTSTORE_REQUEST_LIST_FEATURE_KEY]: RequestListState;
}

export const requestListAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: RequestListState = requestListAdapter.getInitialState(
  {
    loaded: false,
    message: null,
    error: null,
    specificRequest:null,
    statistics:null,
    submitted:false,
    approved:false,
    rejected:false,
  } as RequestListState
);
